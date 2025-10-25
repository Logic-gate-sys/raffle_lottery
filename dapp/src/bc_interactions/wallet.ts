//Ethers library provide a way to interact with th blockchain 

import { ethers } from 'ethers';

/**
 * Connect wallet connects and and EOA and returns:
 *  - Provider, Signer, and WalletAddress
 */
export async function ConnectWallet() : Promise<EthereumEssentials>  {
    // If metamusk is not installed on the browser
    if (!window.ethereum) {
        throw new Error("Meta musk is not install ");
    } 
    // create a Meta Musk object - Ethereum provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    //request access to accounts
    const accounts = await provider.send("eth_requestAccounts", []);  // request for wallet addresses
    // wallet 
    const wallet = accounts[0];
    // get signer 
    const signer = await provider.getSigner();


    // return signer, provider and wallet 
    return {
        signer: signer,
        provider: provider,
        address: wallet
    };
} 

