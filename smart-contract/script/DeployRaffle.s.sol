//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

// imports
import {Script, console} from "forge-std/Script.sol";
import {Raffle} from "src/Raffle.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {CustomSubscription} from "./Interractions.s.sol";

contract DeployRaffle is Script {
    Raffle raffle;
    HelperConfig helperconfig;

    function run() external returns (Raffle, HelperConfig.NetworkConfig memory) {
        CustomSubscription subs = new CustomSubscription();
        HelperConfig.NetworkConfig memory config = subs.run();
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

        // //creating subscription
        // if (config.s_subscriptionId == 0) {
        /**
         * Create subscription programatically and assigned :
         * subscription id to replace the 0 we put for subId in the network configurations
         * replace the vrfcoordinator address with the created address
         */

        // }
        // add raffle as a consumer
        subs.addConsumer(address(raffle), config.vrfCoordinator, config.s_subscriptionId);

        return (raffle, config);
    }
}
