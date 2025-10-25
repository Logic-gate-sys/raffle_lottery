# Project Motivation
The Raffle Lottery project aims to decentralize the traditional lottery system using Ethereum smart contracts. By leveraging Solidity and Chainlink integrations, the system ensures transparency, fairness, and automation in lottery operations. The core motivations include:

## Eliminating centralized control and human error.
Providing trustless and automated raffle draws.
Offering a seamless experience for participants through a decentralized application (dApp).
This smart contract enables:

Entering a raffle by paying the required entrance fee in ETH.
Automated upkeep and interval management for generating random numbers using Chainlink VRF (Verifiable Random Function) and Data Feeds.
Automated raffle draws using Chainlink Keepers to ensure timely and fair selection.
Random winner selection at the end of each raffle.
Automated prize distribution to the winner’s account via smart contracts.
Continuous operation, allowing new raffles to be created once the previous one ends.

## Project architecture :
              +-----------------+
              |  User Wallet    |
              +--------+--------+
                       |
                       v
              +-----------------+
              |      dApp       |
              | React + Tailwind|
              +--------+--------+
                       |
                       v
             +-------------------+
             |  Raffle Contract  |
             | Solidity (EVM)   |
             +--------+----------+
                       |
   +-------------------+------------------+
   |                                      |


## User Experience : 
Users interacting with this smart contract can expect:

1. A secure, transparent raffle experience without central authority interference.
2. Automatic random winner selection, removing any bias or manipulation.
3. Immediate and trustless distribution of prizes upon raffle completion.
4. Continuous availability of new raffles without manual intervention.

## How to Interact with the Contract (via the dApp)
- Connect Wallet: Link your Ethereum wallet (e.g., MetaMask) to the dApp.
- Enter Raffle: Pay the entrance fee in ETH to participate.
- Monitor Raffle Status: Track ongoing raffles, entry counts, and countdowns for draw time.
- Claim Winnings: If selected, the prize will be automatically transferred to your wallet.
- Participate in New Raffles: Once a raffle ends, new ones are automatically available.
The dApp abstracts the underlying smart contract operations, making it easy for users to participate without manual interaction with the blockchain.