// Mock data
const titles = [
    { title: "Zeleni početak" },
    { title: "Eko amigosi" },
    { title: "Electrolite" },
    { title: "The last goon" },
  ];
  
  const badges = [
    { badge: "/images/zeleni.png" },
    { badge: "/images/amigosi.png" },
    { badge: "/images/grom.png" },
    { badge: "/images/planet-love.png" },
  ];
  
  const rewards = [
    { 
      shop: "E-Vehicle", 
      discount: "10%", 
      logo: "/images/carlogo.jpg" 
    },
    { 
      shop: "BrmBrm", 
      discount: "5%", 
      logo: "/images/brmbrm.jpg" 
    },
    { 
      shop: "DM", 
      discount: "15%", 
      logo: "/images/dm-logo.png" 
    },
  ];
  
  export default function AchievementsPage({ onRedeem }) {
    const mergedData = titles.map((title, index) => ({
      ...title,
      ...badges[index]
    }));
  
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-7xl w-full text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Moja Dostignuća</h3>
  
          {/* Achievement List */}
          <div className="space-y-6 mb-16">
            {mergedData.map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg flex items-center justify-between shadow-md hover:shadow-lg transition-all ${
                  index % 2 === 0 ? "bg-green-50" : "bg-blue-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.badge}
                    alt="Badge"
                    className="w-16 h-16 object-contain"
                  />
                  <span className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </span>
                </div>
                <span className="text-green-600 text-2xl">🏆</span>
              </div>
            ))}
          </div>
  
          {/* Rewards Section */}
          <div className="bg-green-100 p-8 mt-6 rounded-2xl">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Aktivne Nagrade</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rewards.map((reward, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-center mb-4">
                    <img 
                      src={reward.logo}
                      alt={reward.shop}
                      className="h-16 object-contain"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{reward.shop}</h4>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {reward.discount}
                  </div>
                  <button
                  onClick={onRedeem} 
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Iskoristi
                  </button>
                </div>
              ))}
            </div>
  
            <p className="text-gray-600 mt-6 text-sm">
              * Nagrade su vezane uz vaše eko tokene
            </p>
          </div>
        </div>
      </div>
    );
  }