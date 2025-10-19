//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {VRFCoordinatorV2_5Mock} from "@chainlink/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock.sol";
import {LinkToken} from "../test/mocks/LinkToken.sol";
import {CodeConstants} from "../script/HelperConfig.s.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";





contract CreateSubscription is Script {
    function run() public {
        createSubscriptionUsingConfig();
    }

    function createSubscriptionUsingConfig() public returns (uint256, address ) {
        HelperConfig helperConfig = new HelperConfig();
        address vrfCoordinatorV2_5 = helperConfig.getNetworkConfigByChainId(block.chainid).vrfCoordinator;
        return createSubscription(vrfCoordinatorV2_5);
    }
    
    function createSubscription(address vrfCoordinatorV2_5) public returns (uint256, address) {
        console.log("Creating subscription on chainId: ", block.chainid); 
        vm.startBroadcast();
        uint256 subId = VRFCoordinatorV2_5Mock(vrfCoordinatorV2_5).createSubscription(); // from subscriptions in the VRFCoordinatorV2_5Mock contract
        vm.stopBroadcast();

        console.log("Your subscription Id is: ", subId);
        console.log("Please update the subscriptionId in HelperConfig");
        return (subId, vrfCoordinatorV2_5);
    }
}





// ---------------------------------- FUND SUBSCRIPTION ------------------------------------------
/**
 * @title FundSubscription  script
 * @author logic_gate
 * @notice This script funds a chainlink VRF_2.5 subscription with a native LINK token for oracle calls to the Verifiable Random Function to work
 */
contract FundSubscription is Script, CodeConstants {
    uint256 public constant FUND_AMOUNT = 10000e18; // 100 LINK == 100 ethers

    function run() public {
        fundSubscriptionByConfig();
    }

    function fundSubscriptionByConfig() public {
        HelperConfig config = new HelperConfig();
        uint256 sub_id = config.getNetworkConfigByChainId(block.chainid).s_subscriptionId;
        address vrfCoordinator = config.getNetworkConfigByChainId(block.chainid).vrfCoordinator;

        vm.startBroadcast();
        LinkToken link = new LinkToken();
        vm.stopBroadcast();
        return fundSubscription(sub_id, vrfCoordinator, address(link));
    }

    function fundSubscription(uint256 sub_id, address vrfCoordinator, address link) public {
        if (block.chainid == LOCAL_CHAINID) {
            //ANVIL CHAIN
            vm.startBroadcast();
            VRFCoordinatorV2_5Mock(vrfCoordinator).fundSubscription(sub_id, FUND_AMOUNT);
            vm.stopBroadcast();
        } else {
            vm.startBroadcast();
            (bool success ) = LinkToken(link).transferAndCall(vrfCoordinator, FUND_AMOUNT, abi.encode(sub_id));
            if(!success){
                revert ("Could not fund subscription with linktoken");
            }
            vm.stopBroadcast();
        }
    }
}





// -------------------- ADD CONSUMER ------------------------------
/**
 * @title AddConsumer script
 * @author logic_gate
 * @notice This script sought to add a consumer contract to the chainlink subscription created for the VRF oracles calls 
 */
contract AddConsumer is Script {
    function run() public {
        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment("Raffle", block.chainid); //
        addConsumerByConfig(mostRecentlyDeployed);
    }
    // add consumer by hwlper config

    function addConsumerByConfig(address mostRecentlyDeployed) public {
        HelperConfig config = new HelperConfig();
        uint256 sub_id = config.getNetworkConfigByChainId(block.chainid).s_subscriptionId;
        address vrfCoordinator = config.getNetworkConfigByChainId(block.chainid).vrfCoordinator;
        addConsumer(mostRecentlyDeployed, vrfCoordinator, sub_id);
    }

    // add consumer
    function addConsumer(address contractToAddTovrf, address vrfCoordinator, uint256 sub_id) public {
        console.log("Adding consumer to contract with vrfCoordinator ", vrfCoordinator);
        vm.startBroadcast();
        VRFCoordinatorV2_5Mock(vrfCoordinator).addConsumer(sub_id, contractToAddTovrf);
        vm.stopBroadcast();
    }
}
