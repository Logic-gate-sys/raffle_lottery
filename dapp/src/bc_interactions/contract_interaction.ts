/**
 * Contract interaction :
 *  - Create  a contract instance
 *  - Call contract specific functions
 *  - Retrieve and format transaction results
 *
 */
import { Provider } from "ethers";
import { ethers, Signer, Contract } from "ethers";
/**
 *
 * @param contractAddress : address of the Raffle contract
 * @param ABI : Abi of the raffle contract
 * @param signer : The signer who can enter raffle, and claim prizes
 * @returns Promise <--- Contract: the instance the we need to perform transactions blockchain calls
 */
export async function createWriteableContractInstance(
  contractAddress: string,
  ABI: any,
  signer: Signer
): Promise<Contract> {
  const w_raffle_contract = new ethers.Contract(contractAddress, ABI, signer);
  return w_raffle_contract;
}

/**
 *
 * @param contractAddress : address of the Raffle contract
 * @param ABI : Abi of the raffle contract
 * @param signer : The signer who can enter raffle, and claim prizes
 * @returns Promise <--- Contract: the instance the we need to perform transactions blockchain calls
 */
export async function createReadContractInstance(
  contractAddress: string,
  ABI: any,
  provider: Provider
): Promise<Contract | undefined> {
  const r_raffle_contract = new ethers.Contract(contractAddress, ABI, provider);
  //if not able to get contract object
  if (!r_raffle_contract) {
    console.log("Failed to create contract object");
    return;
  }

  //return contract instance
  return r_raffle_contract;
}

//----------- Enter raffle ----------------------------------------------------------------
/**
 *
 * @param raffle_instance : and instance of the raffle contract that is used to interact with the blockchain
 * @returns  string address of the trx-sender
 */
export async function enterRaffle(
  raffle_instance: Contract
): Promise<string | null | undefined> {
  try {
    const trx_response = await raffle_instance.enterRaffle();
    //Wait for block confirmation & mining of transaction
    const trx_receipt = await trx_response.wait();
    // user_wallet
    let user_wallet: string | null = null;
    // transaction receipt contains logs that we can parse to the contract interface
    for (const log of trx_receipt.logs) {
      try {
        const parsed = raffle_instance.interface.parseLog(log);
        if (parsed?.name == "EnteredRaffle") {
          user_wallet = parsed.args[0];
          // break search
          break;
        }
      } catch (err) {
        console.log(err);
      }
    }
    // return result of iteration ; either user_wallet or null
    return user_wallet != null ? user_wallet : null;
  } catch (err: any) {
    console.log(err);
  }
}

//------------------------------------- Listen for when  a new Raffle opened ------------------------------
export function raffle_NewRaffleOpenedListener(
  raffle_instance: Contract
): number | boolean {
  let new_raffle_started = false;
  let raffle_count: number = 0;
  raffle_instance.on("Raffle_Reopened", (count: bigint) => {
    // example this the . Ith Raffle
    new_raffle_started = true;
    raffle_count = Number(count);
  });
  // Return the state of the raffle reopening
  return new_raffle_started ? raffle_count : false;
}

//---------------------Get Raffle details ------------------------------------------------------------
export async function getRaffle_Details(
  r_raffle_instance: Contract 
): Promise<Raffle_Detail> {
  try {
    // view raffle instance
    console.log("Raffle: ---->>> ", r_raffle_instance);
    const raffle_entranceFee = await r_raffle_instance.getEntranceFee();
    const raffle_participants = await r_raffle_instance.getTotalPlayers();
    const raffle_interval: bigint = await r_raffle_instance.getInterval();

    console.log("ENTRANCE FEE : ", raffle_entranceFee);
    // format & return the values from the blockchain
    return {
      total_players: Number(raffle_participants),
      entrance_fee: Number(ethers.formatEther(raffle_entranceFee)),
      interval: Number(raffle_interval),
    };
  } catch (err: any) {
    console.log("Could not get Raffle details ", err);
    throw new Error(err);
  }
}

//----------- Claim Prize

//------------ Chect Raffle status

//------------ Get available raffle so people can join

// Get all Rapple participants

//------------------------------------ Retrieve current winner ---------------------------------------------
/**
 *
 * @param r_raffle_instance : Read-only contract intstance for querying the contracts variables
 * @returns string : and address of the most recent winner of the raffle
 */
async function get_RecentWinner(r_raffle_instance: Contract): Promise<string> {
  const recentWinner = await r_raffle_instance.getRecentWinner();
  return recentWinner;
}

// Interval since raffle reopens 
async function getIntervalPassedSinceRaffleOpens(r_raffle_contract: Contract): Promise< number |undefined > {
  const interval_since_raffle_opened = await r_raffle_contract.getIntervalSince_RaffleReopens();
  if (!interval_since_raffle_opened) {
    console.log("Error, could not retrieve time since Raffle reopens");
    return;
  }
  return Number(interval_since_raffle_opened);
}

//get Raffle state
export async function getRaffleState(r_raffle_contract: Contract) {
  const raffle_state = await r_raffle_contract.getRaffleState();
  if (!raffle_state) {
    console.log("Could not get raffle state ");
    return;
  }
  //return val
  return raffle_state;
}
