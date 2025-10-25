//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {VRFCoordinatorV2_5Mock} from "@chainlink/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock.sol";
import {LinkToken} from "../test/mocks/LinkToken.sol";
import {CodeConstants} from "../script/HelperConfig.s.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";

contract CustomSubscription is Script, CodeConstants {
    uint256 public constant FUND_AMOUNT = 100e18; // 100 LINK == 100 ethers
    
    // run 
    function run(address vrfcoordinatorV2_5,  address contractAddress, HelperConfig.NetworkConfig memory config) public {
            // create subscription 
            (config.s_subscriptionId, config.vrfCoordinator) = createSubscription(vrfcoordinatorV2_5);
            // funding subscription 
            fundSubscriptionByConfig(config); 
            // add consumer 
            addConsumerContract(config);
        }
       
    // -------------- create subscripiton -----------------------------------------------------------
    function createSubscription(address vrfCoordinatorV2_5) public returns (uint256, address) {
        console.log("Creating subscription on chainId: ",  block.chainid);
        uint256 subId = VRFCoordinatorV2_5Mock(vrfCoordinatorV2_5).createSubscription(); // from subscriptions in the VRFCoordinatorV2_5Mock contract

        console.log("Your subscription Id is: ", subId);
        console.log("Please update the subscriptionId in HelperConfig");
        return (subId, vrfCoordinatorV2_5);
    }

    //---------------- fund subscription ---------------------------------------------

    function fundSubscriptionByConfig(HelperConfig.NetworkConfig memory  config) public {
        uint256 sub_id = config.s_subscriptionId;
        address vrfCoordinator = config.vrfCoordinator;
        return fundSubscription(sub_id, vrfCoordinator, address(config.link));
    }

    function fundSubscription(uint256 sub_id, address vrfCoordinator, address link) public {
        if (block.chainid == LOCAL_CHAINID) {
            //ANVIL CHAIN
            VRFCoordinatorV2_5Mock(vrfCoordinator).fundSubscription(sub_id, FUND_AMOUNT);
        } else {
            (bool success) = LinkToken(link).transferAndCall(vrfCoordinator, FUND_AMOUNT, abi.encode(sub_id));
            if (!success) {
                revert("Could not fund subscription with linktoken");
            }
        }
    }

   // ------------------ adding consumer ------------------------------------------
    function addConsumerContract(HelperConfig.NetworkConfig memory  config) public {
        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment("Raffle", block.chainid); //
        addConsumerByConfig(mostRecentlyDeployed, config);
    }
    // add consumer by hwlper config

    function addConsumerByConfig(address mostRecentlyDeployed, HelperConfig.NetworkConfig memory config) public {
        uint256 sub_id = config.s_subscriptionId;
        address vrfCoordinator = config.vrfCoordinator;
        addConsumer(mostRecentlyDeployed, vrfCoordinator, sub_id);
    }

    // add consumer
    function addConsumer(address contractToAddTovrf, address vrfCoordinator, uint256 sub_id) public {
        console.log("Adding consumer to contract with vrfCoordinator: ------>>> ", vrfCoordinator);
        VRFCoordinatorV2_5Mock(vrfCoordinator).addConsumer(sub_id, contractToAddTovrf);
    }
   
}

    
