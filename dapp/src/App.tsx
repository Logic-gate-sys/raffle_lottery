import Navbar from "./components/layout/Navbar"; 
import { Routes , Route } from "react-router-dom";
import Raffle from "./components/raffle/EnterRaffle";
import Dashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { ConnectWallet } from "./bc_interactions/wallet";
import { useState } from "react";


function App() {
  const [walletDetails, setWalletDetails] = useState<Web3ProviderPack | {}>({});
  console.log("Wallet Details from App.tsx :: ", walletDetails);
  
  return (
    <div className=" font-gochi-hand md:flex flex-row h-screen bg-[#0F172A]">
      {/*-------------------- Sidebar -------------------- */}
      <Navbar setWalletDetail={setWalletDetails}/>

      {/*-------------------- Main Content -------------------*/}
      <main className="font-sharetech h-screen p-8  flex-1 flex items-center justify-center  overflow-y-scroll ">
        <Routes>
          <Route path='/raffle' element={<Raffle walletDetail={walletDetails} />} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/user-dashboard' element={<UserDashboard/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
