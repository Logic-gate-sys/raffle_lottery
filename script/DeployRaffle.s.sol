//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {Raffle} from "src/Raffle.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {CreateSubscription, FundSubscription, AddConsumer} from "./Interractions.s.sol";

contract DeployRaffle is Script {
    Raffle raffle;
    HelperConfig helperconfig;

    function deployRaffle() external returns (Raffle, HelperConfig) {
        helperconfig = new HelperConfig();
        HelperConfig.NetworkConfig memory config = helperconfig.getNetworkConfig();

        //creating subscription
        if (config.s_subscriptionId == 0) {
            //create subscrption
            CreateSubscription createSubscription = new CreateSubscription();
            (config.s_subscriptionId, config.vrfCoordinator) =
                createSubscription.createSubscription(config.vrfCoordinator);
        }
        // funding subscription
        FundSubscription fundsubscription = new FundSubscription();
        fundsubscription.fundSubscription(config.s_subscriptionId, config.vrfCoordinator, config.link);
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
