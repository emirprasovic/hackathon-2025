import React, { useState } from "react";

// Mock data
const leaderboardData = [
  { name: "Emir", amount: 50, purpose: "tree" },
  { name: "Alice", amount: 100, purpose: "sea" },
  { name: "Bob", amount: 75, purpose: "tree" },
  { name: "Charlie", amount: 200, purpose: "sea" },
  { name: "Diana", amount: 150, purpose: "tree" },
];

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState("recent"); // "recent" or "biggest"
  const [filters, setFilters] = useState({ tree: true, sea: true }); // Filters for "tree" and "sea"

  // Handle radio button change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Handle checkbox change
  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters({ ...filters, [name]: checked });
  };

  // Filter and sort the data
  const filteredData = leaderboardData
    .filter((item) => {
      if (filters.tree && filters.sea) return true; // Show all if both are checked
      if (filters.tree && item.purpose === "tree") return true;
      if (filters.sea && item.purpose === "sea") return true;
      return false;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        // Sort by most recent (assuming the data is already in order)
        return 0;
      } else if (sortBy === "biggest") {
        // Sort by biggest donations
        return b.amount - a.amount;
      }
      return 0;
    });

  return (
    <div className="flex flex-col items-start min-h-screen bg-green-200 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-full w-full text-left">
        {/* Radio Buttons for Sorting */}
        <h3>Donacije</h3>
        <div className="mb-6 flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === "recent"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSortBy("recent")}
          >
            Recent
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === "biggest"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSortBy("biggest")}
          >
            Biggest Donations
          </button>
        </div>

        {/* Checkboxes for Filtering */}
        <div className="mb-6 flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              filters.tree
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilters({ ...filters, tree: !filters.tree })}
          >
            Tree
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              filters.sea
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilters({ ...filters, sea: !filters.sea })}
          >
            Sea
          </button>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-4">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg flex justify-between items-center shadow-md ${
                item.purpose === "tree" ? "bg-green-50" : "bg-blue-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Icon */}
                {item.purpose === "tree" ? (
                  <span className="text-green-600 text-2xl">🌳</span>
                ) : (
                  <span className="text-blue-600 text-2xl">🌊</span>
                )}
                <span className="font-semibold text-lg">{item.name}</span>
              </div>
              <span className="font-bold text-lg">${item.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
