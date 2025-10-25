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
    HelperConfig helperconfig = new HelperConfig() ;
    HelperConfig.NetworkConfig  config = helperconfig.getNetworkConfigByChainId(block.chainid);
    
    // run 
    function run( ) public returns(HelperConfig.NetworkConfig memory ) {
            // create subscription 
            address vrfcoordinatorV2_5 = config.vrfCoordinator ;
            (config.s_subscriptionId, config.vrfCoordinator) = createSubscription(vrfcoordinatorV2_5);
            // funding subscription 
            uint256 sub_id = config.s_subscriptionId;
           address vrfCoordinator = config.vrfCoordinator;
           address link = config.link;
           fundSubscription(sub_id, vrfCoordinator, link); 
    
           // return helper config 
           return config;
        }
       

    // -------------- create subscripiton -----------------------------------------------------------
    function createSubscription(address vrfCoordinatorV2_5) public returns (uint256, address) {
        console.log("Creating subscription on chainId: ",  block.chainid);
        uint256 subId = VRFCoordinatorV2_5Mock(vrfCoordinatorV2_5).createSubscription(); // from subscriptions in the VRFCoordinatorV2_5Mock contract

        console.log("Your subscription Id is: ", subId);
        console.log("Please update the subscriptionId in HelperConfig");
        return (subId,  vrfCoordinatorV2_5);
    }

    //---------------- fund subscription ---------------------------------------------

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
    
    // add consumer
    function addConsumer(address contractToAddTovrf, address vrfCoordinator, uint256 sub_id) public {
        console.log("Adding consumer to contract with vrfCoordinator: ------>>> ", vrfCoordinator);
        VRFCoordinatorV2_5Mock(vrfCoordinator).addConsumer(sub_id,  contractToAddTovrf);
    }
   
}

    
