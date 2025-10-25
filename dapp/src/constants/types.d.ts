/**
 * Custom types used throughout the project are declared in this file
 */

import { Wind } from "lucide-react";

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
    
}