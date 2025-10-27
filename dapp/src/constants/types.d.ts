/**
 * Custom types used throughout the project are declared in this file
 */

import { Provider } from "ethers";


declare global {

    interface Window{
        //ethereum object may exist on the window interface 
        ethereum?: any;
    }

    interface EthereumEssentials{
    signer: Signer;
    provider: BrowserProvider;
    address: string;
    }
    
    interface Raffle_Detail{
        total_players: number;
        entrance_fee: number;
        interval: number;
    }

    interface Web3ProviderPack{
        wallet: string;
        provider: Provider;
        signer: Signer
   }
}