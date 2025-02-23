import { useEffect, useState } from "react";
import axios from "axios";

// Mock data
// const leaderboardData = [
//   { name: "Emir", amount: 50, purpose: "tree" },
//   { name: "Alice", amount: 100, purpose: "sea" },
//   { name: "Bob", amount: 75, purpose: "tree" },
//   { name: "Charlie", amount: 200, purpose: "sea" },
//   { name: "Diana", amount: 150, purpose: "tree" },
//   { name: "Emir", amount: 50, purpose: "tree" },
//   { name: "Alice", amount: 100, purpose: "sea" },
//   { name: "Bob", amount: 75, purpose: "tree" },
//   { name: "Charlie", amount: 200, purpose: "sea" },
//   { name: "Diana", amount: 150, purpose: "tree" },
// ];

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState("recent");
  const [filters, setFilters] = useState({ tree: true, sea: true });

  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const url =
      sortBy === "recent"
        ? "http://localhost:3000/api/v1/donation?sort=-_id"
        : "http://localhost:3000/api/v1/donation?sort=-amount";

    axios.get(url).then((res) => {
      console.log("Fetched Data:", res.data.data.data);
      setOriginalData(res.data.data.data);
      setData(res.data.data.data);
    });
  }, [sortBy]);

  useEffect(() => {
    setData(
      originalData.filter(
        (item) =>
          (filters.tree && item.purpose === "tree") ||
          (filters.sea && item.purpose === "river") ||
          (!filters.tree && !filters.sea)
      )
    );
  }, [filters, originalData]);

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-green-200 p-6"
      style={{
        backgroundImage: "url('/images/green2.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-7xl w-full text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">🌍 Rang Lista</h3>

        {/* Sorting and Filtering Options */}
        <div className="flex justify-between space-x-4 mb-8">
          {/* Sorting Buttons */}
          <div className="flex space-x-4">
            <button
              className={`px-6 py-2 rounded-lg transition-colors ${
                sortBy === "recent"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              onClick={() => setSortBy("recent")}
            >
              Najskorije donacije
            </button>
            <button
              className={`px-6 py-2 rounded-lg transition-colors ${
                sortBy === "biggest"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              onClick={() => setSortBy("biggest")}
            >
              Najveće donacije
            </button>
          </div>

          {/* Toggle Buttons for Filters */}
          <div className="flex space-x-4 justify-between">
            <button
              className={`px-6 py-2 rounded-lg transition-colors ${
                filters.tree
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              onClick={() => setFilters({ ...filters, tree: !filters.tree })}
            >
              Drveća
            </button>
            <button
              className={`px-6 py-2 rounded-lg transition-colors ${
                filters.sea
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              onClick={() => setFilters({ ...filters, sea: !filters.sea })}
            >
              Rijeke
            </button>
          </div>
        </div>

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
