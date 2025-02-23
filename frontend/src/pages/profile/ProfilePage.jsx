import { useEffect, useState } from "react";
import Redeem from "../../components/redeem-qr/Redeem";
import Settings from "../../components/settings/Settings";
import Donations from "../../components/mydonations/MyDonations";
import Achievements from "../../components/achievements/Achievements";
import axios from "axios";

export default function ProfilePage() {
  const [selectedSection, setSelectedSection] = useState("settings");

  const [donationData, setDonationData] = useState([]);
  const [tokens, setTokens] = useState(0);

  const user = localStorage.getItem("user");

  const handleRedeem = () => {
    setSelectedSection("redeem");
  };

  useEffect(function () {
    if (!user) return;
    axios.get("http://localhost:3000/api/v1/donation/" + user).then((res) => {
      setTokens(res.data.data[0].totalDonations);
    });
  }, []);

  useEffect(function () {
    // if (!localStorage.getItem("email")) return;

    axios
      .get(
        "http://localhost:3000/api/v1/donation?email=" +
          localStorage.getItem("user")
      )
      .then((res) => {
        console.log(res);
        setDonationData(res.data.data.data);
      });
  }, []);

  const renderSection = () => {
    switch (selectedSection) {
      case "redeem":
        return <Redeem tokens={tokens} />;
      case "settings":
        return <Settings />;
      case "donations":
        return <Donations data={donationData} />;
        case "achievements":
          return <Achievements onRedeem={handleRedeem} />;
      default:
        return <Settings />;
    }
  };
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url('/images/green2.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <nav className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => setSelectedSection("settings")}
                  className={`w-full text-left flex items-center ${
                    selectedSection === "settings"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  <span className="mr-2">⚙️</span>
                  <span>Postavke</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedSection("donations")}
                  className={`w-full text-left flex items-center ${
                    selectedSection === "donations"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  <span className="mr-2">💼</span>
                  <span>Moje donacije</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => setSelectedSection("redeem")}
                  className={`w-full text-left flex items-center ${
                    selectedSection === "redeem"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  <span className="mr-2">🪙</span>
                  <span>Eko Tokeni</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => setSelectedSection("achievements")}
                  className={`w-full text-left flex items-center ${
                    selectedSection === "achievements"
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  <span className="mr-2">⭐</span>
                  <span>Dostignuća</span>
                </button>
              </li>
            </ul>

            <div className="mt-8">
              <h5 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                Admin
              </h5>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-green-600"
                  >
                    <span className="mr-2">🗺️</span>
                    <span>Upravaljaj donacijama</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-green-600"
                  >
                    <span className="mr-2">👥</span>
                    <span>Upravljaj korisnicima</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-green-600"
                  >
                    <span className="mr-2">⭐</span>
                    <span>Upravljaj popustima</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-green-600"
                  >
                    <span className="mr-2">💼</span>
                    <span>Upravljaj organizacijama</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            {selectedSection === "achievements" ? (
              <Achievements onRedeem={handleRedeem} />
            ) : (
              renderSection()
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
