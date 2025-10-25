/**
 * Contract interaction :
 *  - Create  a contract instance
 *  - Call contract specific functions
 *  - Retrieve and format transaction results
 *
 */
import { ethers, Signer, Contract } from "ethers";

export async function createContractInstance(
  contractAddress: string,
  ABI: string,
  signer: Signer
): Promise<Contract> {
  const raffle_contract = new ethers.Contract(contractAddress, ABI, signer);
  return raffle_contract;
}
