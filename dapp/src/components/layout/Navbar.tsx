// src/components/Navbar.tsx
import { useRef, useState } from "react";
import { Menu, X, Home, Grid, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { ConnectWallet } from "../../bc_interactions/wallet";

const Navbar = ({ setWalletDetail }:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  

  const handleConnect = async () => {
    try {
      const { signer, provider, address }: EthereumEssentials = await ConnectWallet();
      alert("Wallet connected sucessfully");
      console.log("Signer -------->>> : ", signer);
      console.log("Provider ------>>> : ", provider);
      console.log("Wallet -------->>> : ", address); 
      //set the wallet details
      setWalletDetail({address, provider,signer});
    } catch (err) {
      console.log("Could not connect to wallet ");
      console.log(err);
    }
  }


  return (
    <nav className="font-doto  bg-[#202533] text-white fixed md:relative w-fit h-screen flex flex-col shadow-xl z-50">
      {/* ------------------ Mobile Header ----------------------------- */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <h1 className="text-xl font-bold">Raffle dApp</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ------------------ Desktop & Mobile Menu ---------------------------- */}
      <div
        className={`flex-col flex-1 md:flex transition-all duration-300 ease-in-out
          ${isOpen ? "flex" : "hidden"} md:block`}
      >
        {/* Brand title for Desktop */}
        <div className="p-4 hidden md:block ">
          <h1 className="font-extrabold">RaffleVerse</h1>
          <hr className="mt-8 text-2xl"/>
        </div>

        {/* Nav Links */}
        <ul className="space-y-2 p-4">
          <Link to="/raffle" onClick={() => setIsOpen(false)}>
            <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 active:bg-blue-600">
              <Home size={18} /> <span>Raffle</span>
            </li>
          </Link>
          {isAdmin ? (
            <Link to="/admin-dashboard" onClick={() => setIsOpen(false)}>
              <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 active:bg-blue-600">
                <Grid size={18} /> <span>Admin-Dashboard</span>
              </li>
            </Link>
          ) : (
            <Link to="/user-dashboard" onClick={() => setIsOpen(false)}>
              <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 active:bg-blue-600">
                <Grid size={18} /> <span>Dashboard</span>
              </li>
            </Link>
          )}

          <Link to="/profile" onClick={() => setIsOpen(false)}>
            <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 active:bg-blue-600">
              <User size={18} /> <span>Profile</span>
            </li>
          </Link>

          <Link to="/settings" onClick={() => setIsOpen(false)}>
            <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 active:bg-blue-600">
              <Settings size={18} /> <span>Settings</span>
            </li>
          </Link>
        </ul>

        {/* Connect Wallet Button */}
        <div className="mb-4 p-2 mt-auto">
          <button onClick={handleConnect} className="w-fit bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700 active:scale-95 transition">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
