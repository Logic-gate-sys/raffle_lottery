//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {DeployRaffle} from "../script/DeployRaffle.s.sol";
import {Raffle} from "../src/Raffle.sol";
import {HelperConfig} from "../script/HelperConfig.s.sol";
import {CustomSubscription} from "../script/Interractions.s.sol";
import {Vm} from "forge-std/Vm.sol";
import {VRFCoordinatorV2_5Mock} from "@chainlink/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock.sol";

/* Test to perform:
1. Test raffle openstate is OPEN
2. Test raffle revert with not enough entrance fee
3. Test raffle emits the exact event
4. Test raffle decline attempts to enter while calculating ;
   i.create subscripiton
   ii. fund subscription
   iii. get subscription id dynamically
5.
*/

contract Raffle_Test is Test {
    //events
    event RaffleEntered(address player_address);
    event RaffleWinnerPicked(address indexed winner);
    event LogResult(uint256 indexed req_id);

    error Raffle_UpkeepNotNeeded(uint256 balance, uint256 players, uint256 interval);

    Raffle public raffle;
    HelperConfig.NetworkConfig public config;
    uint256 public constant STARTING_BALANCE = 10 ether;
    address USER = makeAddr("user");

    // network configs
    uint256 entranceFee;
    uint256 interval;
    address vrfCoordinator;
    bytes32 keyHash;
    uint256 s_subscriptionId;
    uint32 callbackGasLimit;
    address link;

    function setUp() public {
        //give user some funds before hand
        vm.deal(USER, STARTING_BALANCE);
        //Deploy contract & use returned raffle to test OPEN-STATE
        DeployRaffle deploy_raffle = new DeployRaffle();
        (raffle, config) = deploy_raffle.run();
        // update network configurations
        entranceFee = config.entranceFee;
        interval = config.interval;
        vrfCoordinator = config.vrfCoordinator;
        keyHash = config.keyHash;
        s_subscriptionId = config.s_subscriptionId;
        callbackGasLimit = config.callbackGasLimit;
        link = config.link;

        vm.deal(vrfCoordinator, 10 ether);
    }

    //Test Raffle Openstate
    function testRaffleOpenState() public view {
        assert(raffle.getRaffleState() == Raffle.RaffleState.OPEN);
    }

    modifier UpkeepConditionMet() {
        vm.prank(USER); // simulate use
        raffle.enterRaffle{value: 0.5 ether}();
        vm.warp(block.timestamp + interval); // fast forward time to simulate winner selection
        vm.roll(block.number + 1); // increase block number
        _;
    }

    //
    function testRaffleRevertsWithNotEnoughEntranceFee() public {
        uint256 entrance_fee = 0.0 ether;
        vm.prank(USER);
        vm.expectRevert(Raffle.Raffle_NotEnoughtFund.selector);
        raffle.enterRaffle{value: entrance_fee}();
    }

    //
    function testEmitRaffleEntered() public {
        vm.prank(USER);
        vm.expectEmit(true, false, false, false, address(raffle));
        emit RaffleEntered(USER);
        raffle.enterRaffle{value: 0.5 ether}();
    }

    //
    function testPerformUpkeepOnlyRunIfCheekUpkeep() public {
        vm.prank(USER); // simulate use
        raffle.enterRaffle{value: 0.5 ether}();

        vm.warp(block.timestamp + interval + 1); // fast forward time to simulate winner selection
        vm.roll(block.number + 1); // increase block number

        // check
        raffle.performUpkeep("");
    }

    modifier ExceptNoPlayer() {
        vm.prank(USER); // simulate use
        raffle.enterRaffle{value: 0.5 ether}();
        vm.warp(block.timestamp); // fast forward time to simulate winner selection
        vm.roll(block.number + 1); // increase block number
        _;
    }
    // test Upkeep not need revert with the right errors

    function testUpkeepNotNeedRevertCorrectly() public ExceptNoPlayer {
        vm.expectRevert(
            abi.encodeWithSelector(
                Raffle.Raffle_UpkeepNotNeeded.selector,
                address(raffle).balance,
                raffle.getTotalPlayers(),
                raffle.getInterval()
            )
        );
        raffle.performUpkeep("");
    }

    // Logging events request id
    function testEventEmittedAfterUpkeep() public UpkeepConditionMet {
        vm.recordLogs();
        raffle.performUpkeep("");
        Vm.Log[] memory logs = vm.getRecordedLogs();
        bytes32 req_id = logs[1].topics[1];

        // get raffle state
        Raffle.RaffleState raffleState = raffle.getRaffleState();
        assert(uint256(req_id) > 0);
        assert(uint256(raffleState) == 1); // ensure raffle opens
    }

    //---------------------------------------------------------------------------------------------------------------------------
    //----------------->>>>>>>>>>>>>           Problematic tests            <<<<<<<<<<<<<<------------------------------
    //---------------------------------------------------------------------------------------------------------------------------
    function testRaffleEmitsWinnerPicked() public UpkeepConditionMet {
        /* Upkeep must be needed before winner can be picked:
        1. enough time has passed
        2. raffle has balance
        3. users have entered raffle
        */
        vm.expectEmit();
        emit LogResult(1);
        raffle.performUpkeep("");
    }

    // test perform upkeep only runs after checkUpkeep
    function testUpkeepRunsOnlyAfterCheckUpkeep(uint256 random_id) public UpkeepConditionMet {
        //expect a specific error
        vm.expectRevert(VRFCoordinatorV2_5Mock.InvalidRequest.selector);
        VRFCoordinatorV2_5Mock(vrfCoordinator).fulfillRandomWords(random_id, address(raffle));
    }

    // Test raffle actually close and give the appropriate winner  the funds
    function testRaffleClosesAndAwardWinner() public {
        uint256 starting_index = 1;
        uint256 additional_entrance = 3;
        // participation in the raffle
        for (uint256 i = starting_index; i < starting_index + additional_entrance; i++) {
            address user = address(uint160(i));
            hoax(user, 1 ether); // give each user a fake 1 ether
            raffle.enterRaffle{value: 1 ether}();
        }
        uint256 starting_timestamp = raffle.getRecentTimestamp();
        // get subscription id
        vm.warp(starting_timestamp + 1 weeks); // warp times
        vm.recordLogs();
        raffle.performUpkeep("");
        Vm.Log[] memory entries = vm.getRecordedLogs();
        bytes32 request_id = entries[1].topics[1];

        //test
        //fufil random words - choose a winner
        VRFCoordinatorV2_5Mock(vrfCoordinator).fulfillRandomWords(uint256(request_id), address(raffle));
        entries = vm.getRecordedLogs();
        bool winnerPickEmitted = false;
        for (uint256 i = 0; i < entries.length; i++) {
            if (entries[i].topics[0] == keccak256("RaffleWinnerPicked(address)")) {
                winnerPickEmitted = true;
            }
        }
        assertTrue(winnerPickEmitted, "No such event Emitted ");
        //winner, state , endingtimestamp
        address winner = raffle.getRecentWinner(); // ending state
        uint256 winnerBalance = winner.balance;
        Raffle.RaffleState raffleState = raffle.getRaffleState();
        uint256 lastTimestamp = raffle.getRecentTimestamp();
        uint256 prize = entranceFee * (1 + additional_entrance);

        assertEq(uint256(raffleState), 0); // raffle opn
    }
}
