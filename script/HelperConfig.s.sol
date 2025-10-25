//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {
    VRFCoordinatorV2_5Mock
} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock.sol";
import {LinkToken} from "../test/mocks/LinkToken.sol";

// ------------ CODE CONSTANTS: CONTRACT --------------------------
abstract contract CodeConstants {
    /* Mock vrfcoordinator constants */
    uint96 public constant MOCK_BASE_FEE = 0.025 ether;
    uint96 public constant MOCK_GAS_PRICE_LINK = 1e9;
    int256 public constant WEI_PER_UNIT_LINK = 1e15;

    //chainids
    uint256 public constant SEPOLIA_CHAINID = 11155111;
    uint256 public constant LOCAL_CHAINID = 31337;
    uint256 public constant MAIN_CHAINID = 1;
}

contract HelperConfig is Script, CodeConstants {
    /* ////////////////////////////////////////////////////////////////////////////////////////////
                       ERRORS
     ////////////////////////////////////////////////////////////////////////////////////////////*/
    error HelperConfigInvalidChainId();
    /*
    Helper config musk contain:
    1. network configs for each sepoliaEth
    2. network configs for each Anvil local chain
    3 must contain a mapping of chain id to network config
    */
    /*////////////////////////////////////////////////////////////////////////////////////////////
                       STATE VARIABLES
     ////////////////////////////////////////////////////////////////////////////////////////////*/

    mapping(uint256 chainId => NetworkConfig networkConfig) private networkConfig;
    NetworkConfig private localNetworkConfig;

    /*////////////////////////////////////////////////////////////////////////////////////////////
                       TYPES
    ////////////////////////////////////////////////////////////////////////////////////////////*/
    struct NetworkConfig {
        uint256 entranceFee;
        uint256 interval;
        address vrfCoordinator;
        bytes32 keyHash;
        uint256 s_subscriptionId;
        uint32 callbackGasLimit;
        address link;
    }

    //construct
    constructor() {
        networkConfig[SEPOLIA_CHAINID] = getSepoliEthConfig();
        networkConfig[LOCAL_CHAINID] = getOrCreateLocalConfig();
    }

    function getNetworkConfig() external returns (NetworkConfig memory) {
        return getNetworkConfigByChainId(block.chainid);
    }

    //---------------------- get Network configuration --------------------------------
    function getNetworkConfigByChainId(uint256 chainId) public returns (NetworkConfig memory) {
        if (localNetworkConfig.vrfCoordinator != address(0)) {
            return networkConfig[chainId];
        } else if (chainId == LOCAL_CHAINID) {
            return getOrCreateLocalConfig();
        } else {
            revert HelperConfigInvalidChainId();
        }
    }

    /**
     * Network config for the sepolia chain
     */
    function getSepoliEthConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({
            entranceFee: 0.002 ether,
            interval: 3 days, // 3 days
            vrfCoordinator: 0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B,
            keyHash: 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae,
            s_subscriptionId: 0, // would be created automatically
            callbackGasLimit: 500_000,
            link: 0x779877A7B0D9E8603169DdbD7836e478b4624789
        });
    }

    function getOrCreateLocalConfig() public returns (NetworkConfig memory) {
        // if we're not on the local chain ---> get the appropriate network configurations
        if (localNetworkConfig.vrfCoordinator != address(0)) {
            return localNetworkConfig;
        } else {
            /*
            Deploy a mock VRC_CoordinatorV2_5 mock contract to request and fullfil random words using the local anvil chain
             */

            VRFCoordinatorV2_5Mock vrfCoordinatorMock = new VRFCoordinatorV2_5Mock(MOCK_BASE_FEE, MOCK_GAS_PRICE_LINK, WEI_PER_UNIT_LINK);

            // deploy a mock link token to fund the mock VRFCoordinator 2_5 contract
            LinkToken linktoken = new LinkToken(); // deploy link token and use it address

            // local network config
            localNetworkConfig = NetworkConfig({
                entranceFee: 0.001 ether,
                interval: 30, // 30 seconds
                vrfCoordinator: address(vrfCoordinatorMock),
                keyHash: 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae,
                s_subscriptionId:0 , // would be created automatically
                callbackGasLimit: 500000,
                link: address(linktoken)
            });

            //return network config
            return localNetworkConfig;
        }
    }
}
