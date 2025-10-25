

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-1 p-6 bg-[#0F172A] text-white min-h-screen">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1E293B] p-4 rounded-xl shadow-lg">
          <h2 className="text-sm text-gray-400">Total Raffles</h2>
          <p className="text-2xl font-semibold mt-1">128</p>
        </div>

        <div className="bg-[#1E293B] p-4 rounded-xl shadow-lg">
          <h2 className="text-sm text-gray-400">Active Users</h2>
          <p className="text-2xl font-semibold mt-1">532</p>
        </div>

        <div className="bg-[#1E293B] p-4 rounded-xl shadow-lg">
          <h2 className="text-sm text-gray-400">Revenue</h2>
          <p className="text-2xl font-semibold mt-1">$3,204</p>
        </div>

        <div className="bg-[#1E293B] p-4 rounded-xl shadow-lg">
          <h2 className="text-sm text-gray-400">Pending Rewards</h2>
          <p className="text-2xl font-semibold mt-1">24</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#1E293B] rounded-xl p-6 mb-8 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
        <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed border-gray-600 rounded-lg">
          Chart Placeholder
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1E293B] rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3 text-sm text-gray-300">
          <li className="flex justify-between border-b border-gray-700 pb-2">
            <span>User <b>0x12a...8D3</b> joined raffle #54</span>
            <span className="text-gray-500">2h ago</span>
          </li>
          <li className="flex justify-between border-b border-gray-700 pb-2">
            <span>User <b>0xA7b...1C2</b> claimed reward</span>
            <span className="text-gray-500">5h ago</span>
          </li>
          <li className="flex justify-between">
            <span>Raffle #53 ended — winner selected</span>
            <span className="text-gray-500">1d ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
