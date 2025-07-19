// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions

//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

/**
 * @title A sample Raffle Contract
 * @author Daniel Kpatamia
 * @notice This contract is for creating a sample raffle contract
 * @dev This implements the Chainlink VRF Version 2
 */
contract Raffle is VRFConsumerBaseV2Plus {
    /* Errors */
    error Raffle_NotEnoughtFund();
    error EnoughTimeHasNotPassed();
    error Raffle_WinnerPaymentFail();
    error RaffleUpkeepNotNeeded(uint256 balance, uint256 players, uint256 interval);

    /* Type declarations */
    enum RaffleState {
        OPEN, //0
        CALCULATING //1

    }
    /* Variables */

    address payable[] s_players; // array of all players
    uint256 private s_lastTimestamp;
    address private s_s_vrfcoordinator;
    address private mostRecentWinner;
    RaffleState private s_raffleState; // state of raffle

    //constant
    uint16 private constant REQUEST_CONFIRMATIONS = 3; //number of block confirmations
    uint16 private constant NUM_WORDS = 1;

    //immutable variables
    uint256 public immutable i_entranceFee;
    uint256 private immutable i_interval;
    bytes32 private immutable i_keyHash;
    uint256 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;

    /* Events */
    event RaffleEntered(address player_address);
    event RaffleWinnerPicked(address indexed winner);

    constructor(
        uint256 entranceFee,
        uint256 interval,
        address vrfCoordinator,
        bytes32 keyHash,
        uint256 s_subscriptionId,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2Plus(vrfCoordinator) {
        i_entranceFee = entranceFee;
        i_interval = interval; // time in seconds before a winner is picked
        s_lastTimestamp = block.timestamp;
        s_s_vrfcoordinator = vrfCoordinator;
        // raffle must start in open state
        s_raffleState = RaffleState.OPEN;

        i_keyHash = keyHash;
        i_subscriptionId = s_subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
    }

    function enterRaffle() external payable {
        if (msg.value < i_entranceFee) {
            revert Raffle_NotEnoughtFund();
        }
        s_players.push(payable(msg.sender)); // add player to player list
        emit RaffleEntered(msg.sender); // emit event
    }

    /* 
    What should be achieved with pick-winner :
    1. Get a random number 
    2. Use the random number to pick a winner
    3 Automate the process
    */
    //check upkeep
    function checkUpkeep(bytes memory /* checkData */ ) public view returns (bool) {
        /* Upkeep is needed iff:
    1. Time interval has passed 
    2. Raffle State is OPEN
    3. Raffle has balance
        */
        (bool timeIsUp) = block.timestamp - s_lastTimestamp < i_interval;
        (bool raffleIsOpen) = (s_raffleState == RaffleState.OPEN);
        (bool raffleHasEth) = (address(this).balance > 0);
        (bool upkeepNeeded) = timeIsUp && raffleIsOpen && raffleHasEth;
        return upkeepNeeded;
    }

    function performUpkeep() external {
        (bool upKeepNeeded) = checkUpkeep("");
        if (!upKeepNeeded) {
            revert RaffleUpkeepNotNeeded(address(this).balance, s_players.length, i_interval);
        }
        // has enough time passed
        if (block.timestamp - s_lastTimestamp < i_interval) {
            revert EnoughTimeHasNotPassed();
        }
        //change raffle state to callcuting
        s_raffleState = RaffleState.CALCULATING;
        VRFV2PlusClient.RandomWordsRequest memory request_struct = VRFV2PlusClient.RandomWordsRequest({
            keyHash: i_keyHash,
            subId: i_subscriptionId,
            requestConfirmations: REQUEST_CONFIRMATIONS,
            callbackGasLimit: i_callbackGasLimit,
            numWords: NUM_WORDS,
            extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: false}))
        });
        uint256 request_id = s_vrfCoordinator.requestRandomWords(request_struct);
        /*
        1. Request a random number 
        2. get the random number in a callback functions 
        3. use random number to get the winner
         */
    }
    // fulfil random words function

    function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) internal override {
        /*---------------------CHECKS------------------*/
        //get index of winner
        uint256 index_of_winner = randomWords[0] % s_players.length;
        address payable winner = s_players[index_of_winner];
        mostRecentWinner = winner;
        /* ------------------EFFECTS -------------------- */
        s_players = new address payable[](0);
        s_lastTimestamp = block.timestamp;
        emit RaffleWinnerPicked(winner);
        // open raffle state after winner is picked and paid
        s_raffleState = RaffleState.OPEN;
        // reset the player array and timestamp
        /* -----------------INTERRACTIONS---------------- */
        (bool success,) = winner.call{value: address(this).balance}(""); // no functions parameters required
        if (!success) {
            revert Raffle_WinnerPaymentFail();
        }
    }
}
