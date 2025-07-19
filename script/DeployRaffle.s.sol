//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {Raffle} from "src/Raffle.sol";
import {HelperConfig} from "./HelperConfig.sol";

contract DeployRaffle is Script {
    Raffle raffle;

    function deployRaffle() external returns (Raffle) {
        HelperConfig.NetworkConfig memory config = new HelperConfig().getNetworkConfig();
        vm.startBroadcast();
        Raffle raffle = new Raffle(config.entranceFee,config.interval,config.vrfCoordinator,
        config.keyHash,config.s_subscriptionId,config.callbackGasLimit);
        vm.stopBroadcast();
        return  raffle;
    }
}
