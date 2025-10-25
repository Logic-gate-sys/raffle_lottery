import { Wallet, Gift, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";

const UserDashboard = () => {
  return (
    <div className="flex flex-col flex-1 p-6 bg-[#0F172A] text-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome Back 👋</h1>
        <p className="text-gray-400 mt-2 sm:mt-0">User Dashboard</p>
      </div>

      {/* Profile & Wallet Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Card */}
        <div className="bg-[#1E293B] rounded-xl p-6 shadow-lg flex flex-col items-center">
          <img
            src="https://api.dicebear.com/8.x/identicon/svg?seed=raffleuser"
            alt="User Avatar"
            className="w-20 h-20 rounded-full mb-4"
          />
          <h2 className="text-lg font-semibold">0x12A...9fE3</h2>
          <p className="text-gray-400 text-sm">Joined March 2025</p>
          <button className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>

        {/* Wallet Card */}
        <div className="bg-[#1E293B] rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Wallet size={18} /> Wallet Balance
            </h2>
            <span className="text-green-400 text-sm">Connected</span>
          </div>
          <p className="text-3xl font-bold">$1,245.73</p>
          <button className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
            Withdraw Funds
          </button>
        </div>

        {/* Active Raffles */}
        <div className="bg-[#1E293B] rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Gift size={18} /> Active Raffles
          </h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex justify-between">
              <span>Raffle #54</span>
              <span className="text-yellow-400 flex items-center gap-1">
                <Clock size={14} /> Ends in 3h
              </span>
            </li>
            <li className="flex justify-between">
              <span>Raffle #52</span>
              <span className="text-yellow-400 flex items-center gap-1">
                <Clock size={14} /> Ends in 8h
              </span>
            </li>
            <li className="flex justify-between">
              <span>Raffle #49</span>
              <span className="text-gray-400">Completed</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#1E293B] rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <ul className="space-y-3 text-sm text-gray-300">
          <li className="flex justify-between border-b border-gray-700 pb-2">
            <div className="flex items-center gap-2">
              <ArrowUpRight size={14} className="text-green-400" />
              <span>Joined Raffle #53</span>
            </div>
            <span className="text-gray-500">1h ago</span>
          </li>
          <li className="flex justify-between border-b border-gray-700 pb-2">
            <div className="flex items-center gap-2">
              <ArrowDownRight size={14} className="text-red-400" />
              <span>Claimed Reward</span>
            </div>
            <span className="text-gray-500">3h ago</span>
          </li>
          <li className="flex justify-between">
            <div className="flex items-center gap-2">
              <ArrowUpRight size={14} className="text-green-400" />
              <span>Joined Raffle #52</span>
            </div>
            <span className="text-gray-500">1d ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
