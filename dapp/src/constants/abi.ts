//Address of the raffle contract
export const RAFFLE_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

//Raffle's ABI
export const RAFFLE_ABI = [
  {
    "type": "constructor",
    "inputs": [
      { "name": "entranceFee", "type": "uint256", "internalType": "uint256" },
      { "name": "interval", "type": "uint256", "internalType": "uint256" },
      {
        "name": "vrfCoordinator",
        "type": "address",
        "internalType": "address"
      },
      { "name": "keyHash", "type": "bytes32", "internalType": "bytes32" },
      {
        "name": "s_subscriptionId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "callbackGasLimit",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "acceptOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "checkUpkeep",
    "inputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "enterRaffle",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getEntranceFee",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getInterval",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRaffleState",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "enum Raffle.RaffleState"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRecentTimestamp",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRecentWinner",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalPlayers",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "i_entranceFee",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "performUpkeep",
    "inputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "rawFulfillRandomWords",
    "inputs": [
      { "name": "requestId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "randomWords",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "s_vrfCoordinator",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IVRFCoordinatorV2Plus"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setCoordinator",
    "inputs": [
      {
        "name": "_vrfCoordinator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      { "name": "to", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "CoordinatorSet",
    "inputs": [
      {
        "name": "vrfCoordinator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "LogResult",
    "inputs": [
      {
        "name": "req_id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferRequested",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PlatFormPaid",
    "inputs": [
      {
        "name": "platform_fee",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RaffleEntered",
    "inputs": [
      {
        "name": "player_address",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RaffleWinnerPicked",
    "inputs": [
      {
        "name": "winner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Raffle_Reopened",
    "inputs": [
      {
        "name": "count",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "OnlyCoordinatorCanFulfill",
    "inputs": [
      { "name": "have", "type": "address", "internalType": "address" },
      { "name": "want", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "OnlyOwnerOrCoordinator",
    "inputs": [
      { "name": "have", "type": "address", "internalType": "address" },
      { "name": "owner", "type": "address", "internalType": "address" },
      { "name": "coordinator", "type": "address", "internalType": "address" }
    ]
  },
  { "type": "error", "name": "Raffle_CouldNotPayWinner", "inputs": [] },
  { "type": "error", "name": "Raffle_EnoughTimeHasNotPassed", "inputs": [] },
  { "type": "error", "name": "Raffle_NotEnoughtFund", "inputs": [] },
  {
    "type": "error",
    "name": "Raffle_UpkeepNotNeeded",
    "inputs": [
      { "name": "balance", "type": "uint256", "internalType": "uint256" },
      { "name": "players", "type": "uint256", "internalType": "uint256" },
      { "name": "interval", "type": "uint256", "internalType": "uint256" }
    ]
  },
  { "type": "error", "name": "Raffle_WinnerPaymentFail", "inputs": [] },
  { "type": "error", "name": "ZeroAddress", "inputs": [] }
];