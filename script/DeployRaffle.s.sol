//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {Script,console} from "forge-std/Script.sol";
import {Raffle} from "src/Raffle.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {CreateSubscription, FundSubscription, AddConsumer} from "./Interractions.s.sol";

contract DeployRaffle is Script {
    Raffle raffle;
    HelperConfig helperconfig;

    function deployRaffle() external returns (Raffle, HelperConfig) {
        helperconfig = new HelperConfig();
        // get network config based on the chain we're on
        HelperConfig.NetworkConfig memory config = helperconfig.getNetworkConfig();

        //creating subscription
        if (config.s_subscriptionId == 0) {
            /**
             * Create subscription programatically and assigned :
             * subscription id to replace the 0 we put for subId in the network configurations
             * replace the vrfcoordinator address with the created address
             */
            CreateSubscription createSub = new CreateSubscription();

            (config.s_subscriptionId, config.vrfCoordinator) = createSub.createSubscription(config.vrfCoordinator);
        }



        // funding subscription
        FundSubscription fundsubscription = new FundSubscription();
        fundsubscription.fundSubscription(config.s_subscriptionId, config.vrfCoordinator, config.link);
        /**
         * Deploy and broadcast the raffle contract to the blochchain
         * Retrieve the raffle contract's address to be used as a consumer to add to the subscription created
         */
        vm.startBroadcast();
        raffle = new Raffle(
            config.entranceFee,
            config.interval,
            config.vrfCoordinator,
            config.keyHash,
            config.s_subscriptionId,
            config.callbackGasLimit
        );
        vm.stopBroadcast();

        // add consumer
        AddConsumer addconsumer = new AddConsumer();
        addconsumer.addConsumer(address(raffle), config.vrfCoordinator, config.s_subscriptionId);
        return (raffle, helperconfig);
    }
}
