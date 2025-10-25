
const Raffle = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white bg-[#0F172A] w-full">
      <h1 className="text-4xl font-bold mb-2">Enter the Raffle</h1>
      <p className="text-gray-400 mb-8">Win big, powered by Ethereum</p>

      <div className="w-64 h-64 flex flex-col items-center justify-center rounded-full border-4 border-blue-600 shadow-lg shadow-blue-600/50 mb-8">
        <p className="text-gray-400">Entrance Fee</p>
        <h2 className="text-2xl font-bold">0.5 ETH</h2>
        <div className="flex justify-between w-full px-8 mt-4 text-sm">
          <span>Players: <b>3</b></span>
          <span>Interval: <b>30s</b></span>
        </div>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 py-3 px-8 rounded-lg shadow-lg">
        Enter Raffle
      </button>
    </div>
  );
};

export default Raffle;
