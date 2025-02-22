import React, { useState } from "react";

const donations = [
  { id: 1, name: "Posadi Drvo", description: "1 BAM posadi jedno drvo" },
  { id: 2, name: "Očisti Rijeku", description: "1 BAM očisti 1 metar toka" },
];

const amounts = [5, 20, 50, 100];

const DonatePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;

    if (value === "" || /^[0-9]+$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(value);
    }
  };

  const handlePredefinedAmountClick = (amount) => {
    setSelectedAmount(amount); 
    setCustomAmount(""); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 p-6"
    style={{
      backgroundImage: "url('/images/green2.jpg')",
      backgroundAttachment: "fixed", 
      backgroundSize: "cover",
      backgroundPosition: "center",  
  }}>
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold text-gradient mb-6">🌳 ConTreeBute!</h2>
        <p className="text-gray-700 mb-6 text-lg font-semibold">Odaberi vrstu donacije</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {donations.map((donation) => (
            <div
              key={donation.id}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === donation.name
                  ? donation.id === 2
                    ? "bg-blue-500 text-white border-blue-600 shadow-lg"
                    : "bg-green-500 text-white border-green-600 shadow-lg"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(donation.name)}
            >
              <h3 className="text-xl font-semibold">{donation.name}</h3>
              <p className="text-sm">{donation.description}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-700 mb-6 text-lg font-semibold">Odaberi količinu donacije:</p>
        <div className="grid grid-cols-2 gap-6 mb-8">
          {amounts.map((amount) => (
            <button
              key={amount}
              className={`p-4 border-2 rounded-xl transition-all duration-300 transform ${
                selectedAmount === amount
                  ? "bg-blue-800 text-white border-blue-700 scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handlePredefinedAmountClick(amount)}
            >
              {amount} BAM
            </button>
          ))}
        </div>

        {/* Custom amount input */}
        <div className="mb-8">
          <label htmlFor="custom-amount" className="block text-lg font-semibold text-gray-700">
            Ili unesite vlastiti iznos
          </label>
          <input
            id="custom-amount"
            type="text"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Unesite iznos"
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button className="w-full p-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transform transition-all duration-300">
          Doniraj
        </button>
      </div>
    </div>
  );
};

export default DonatePage;
