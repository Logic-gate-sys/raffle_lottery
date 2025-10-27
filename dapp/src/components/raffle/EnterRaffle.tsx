import { RAFFLE_ABI,RAFFLE_ADDRESS } from "../../constants/abi";
import {
  getRaffle_Details,
  createReadContractInstance,
  createWriteableContractInstance,
  enterRaffle,
  getRaffleState
} from "../../bc_interactions/contract_interaction";
import { useState, useEffect } from "react";
import { Contract, Provider, Signer } from 'ethers';
import { MessageBox } from "../ui/MessageBox";
import { ProgressBar } from "../ui/ProgressBar";



const Raffle = ({walletDetail}: any) => {
  //state manager for the raffleDetails
  const [raffleDetails, setRaffleDetails] = useState<Raffle_Detail|null>(null);
  const [readContract, setReadContract] = useState<Contract |undefined>();
  const [writeContract, setWriteContract] = useState<Contract>();
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [progress, setProgress] = useState<number>(25);
  
  //listens and fetch details when page loads
  useEffect(() => {
    const raffleDetail = async () => {
      // try to fetch all the Raffle_details
      try {
        const readContractInstance = await createReadContractInstance(RAFFLE_ADDRESS, RAFFLE_ABI, walletDetail.provider);
        if (!readContractInstance) {
          console.log("Contract creation failed");
          return;
        }
        console.log("Read Raffle Contract Object: ", readContractInstance);
        console.log("Provider : ", walletDetail.provider);
        console.log("Wallet : ", walletDetail.address);

        //set read contract int he state
        setReadContract(readContractInstance);
        const { total_players, entrance_fee, interval } = await getRaffle_Details(readContractInstance);
        //update the raffle details
        setRaffleDetails({total_players, entrance_fee, interval})
      } catch (err: any) {
        console.log(err);
        return;
      }
    }
    //fetch raffle details
    raffleDetail();
  }, [walletDetail])


  // handle raffle entering 
  const handleRaffleEntry = async () => {
    const readContractInstance = await createReadContractInstance(walletDetail?.address, RAFFLE_ABI, walletDetail?.signer);
    //if no contract instance 
    if (!readContractInstance) {
      setError(true);
      setErrorMessage("Please connect your wallet , to interract witht the raffle contract");
      return;
    }
    //set contract 
    setReadContract(readContractInstance);
    const raffle_state = await getRaffleState(readContractInstance);
    console.log("RAFFLE STATE: ", raffle_state);
    
    if (!walletDetail.address) {
      setError(() => true);
        setErrorMessage({
          title: "Wallet Error",
          body: "Failed to enter Raffle . Please connect your wallet first "
        })
        return;
    }
    try {
      const writeContract = await createWriteableContractInstance(RAFFLE_ADDRESS, RAFFLE_ABI, walletDetail?.signer);
      if (!writeContract) {
        setError(() => true);
        setErrorMessage(prev => {
          title: "Contract Error";
          body: "Failed to enter Raffle . Please connect your wallet first ";
        })
        return;
      }
      setWriteContract(writeContract);
      // enter Raffle and return participant's address
      const userWallet = await enterRaffle(writeContract);
    } catch (err: any) {
      console.log(err);
      return;
     }
  }
  
  // count towards interval 
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.01
     })
    }, 1000);
    return () => clearInterval(interval);
  }, [])


  return (
    <div className="flex flex-col items-center justify-center h-full text-white bg-[#0F172A] w-full">
      <h1 className="text-4xl font-bold mb-2">Enter  Raffle</h1>
      <p className="text-gray-400 mb-8">Win big, powered by Ethereum</p>

      <ProgressBar progress={progress} width={300}  height={40}/>

      <div className="w-64 h-64 flex flex-col items-center justify-center rounded-full border-4 border-blue-600 shadow-lg shadow-blue-600/50 mb-8">
        <p className="text-gray-400">Entrance Fee</p>
        <h2 className="text-2xl font-bold">{raffleDetails?.entrance_fee} ETH</h2>
        <div className="flex justify-between w-full px-8 mt-4 text-sm">
          <span>Players: <b>{raffleDetails?.total_players}</b></span>
          <span>Interval: <b>{raffleDetails?.interval} s</b></span>
        </div>
      </div>

      <button onClick={()=> handleRaffleEntry()} className="bg-blue-600 hover:bg-blue-700 py-3 px-8 rounded-lg shadow-lg">
        Enter Raffle
      </button>
      {
        error && <MessageBox errorMessage={errorMessage} setError={setError} />
      }
    </div>
  );
};

export default Raffle;
