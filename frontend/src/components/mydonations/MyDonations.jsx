/* eslint-disable react/prop-types */
// Mock data
// const leaderboardData = [
//   { name: "Emir", amount: 50, purpose: "tree" },
//   { name: "Emir", amount: 100, purpose: "sea" },
//   { name: "Emir", amount: 75, purpose: "tree" },
//   { name: "Emir", amount: 200, purpose: "sea" },
//   { name: "Emir", amount: 150, purpose: "tree" },
//   { name: "Emir", amount: 50, purpose: "tree" },
//   { name: "Emir", amount: 100, purpose: "sea" },
//   { name: "Emir", amount: 75, purpose: "tree" },
//   { name: "Emir", amount: 200, purpose: "sea" },
//   { name: "Emir", amount: 150, purpose: "tree" },
// ];

export default function LeaderboardPage({ data }) {
  return (
    <div className="flex flex-col items-center min-h-screen  ">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-7xl w-full text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Moje Donacije</h3>

        {/* Leaderboard List */}
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg flex justify-between items-center shadow-lg hover:shadow-2xl transition-all ${
                item.purpose === "tree" ? "bg-green-50" : "bg-blue-50"
              }`}
            >
              <div className="flex items-center space-x-4">
                {/* Icon */}
                {item.purpose === "tree" ? (
                  <span className="text-green-600 text-3xl">🌳</span>
                ) : (
                  <span className="text-blue-600 text-3xl">🌊</span>
                )}
                <span className="font-semibold text-xl">{item.name}</span>
              </div>

              {/* Custom message based on donation purpose */}
              <span className="font-bold text-xl text-gray-800">
                {item.purpose === "tree"
                  ? `Posadio/la ${item.amount} drveća 🌳`
                  : `Očistio/la ${item.amount} metara rijeke 🌊`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
