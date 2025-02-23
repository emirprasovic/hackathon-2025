// eslint-disable-next-line react/prop-types
const RedemptionCard = ({ tokens }) => {
  return (
    <>
      {/* Moji Tokeni Section */}
      <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-md overflow-hidden p-6 mt-6">
        <h2 className="text-xl font-semibold mx-auto text-gray-800 mb-4">
          Moji Tokeni
        </h2>

        <div className="flex flex-col items-center">
          <div className="relative p-4 bg-gray-50 rounded-lg flex items-center">
            <span className="text-2xl font-bold text-green-600">
              🪙 {tokens}
            </span>
          </div>
        </div>
      </div>

      {/* Zaradi Tokene Section */}
      <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-md overflow-hidden p-6 mt-6">
        <h2 className="text-xl font-semibold mx-auto text-gray-800 mb-4">
          Zaradi Tokene
        </h2>

        <div className="space-y-4">
          {[
            { type: "Doniraj", link: "/donate", amount: "1BAM = 1🪙" },
            {
              type: "Koristi e-go vehicles",
              link: "/e-go",
              amount: "5min = 1🪙",
            },
            {
              type: "Podijeli na Twitter",
              link: "/share/twitter",
              amount: "10🪙",
            },
            {
              type: "Podijeli na Instagram",
              link: "/share/instagram",
              amount: "15🪙",
            },
            {
              type: "Podijeli na TikTok",
              link: "/share/instagram",
              amount: "10🪙",
            },
            {
              type: "Podijeli na Facebook",
              link: "/share/instagram",
              amount: "15🪙",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <span className="text-gray-800">
                {item.type} ({item.amount})
              </span>
              <a
                href={item.link}
                className="text-green-600 font-semibold hover:underline"
              >
                +
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-xl font-semibold mx-auto text-gray-800 mb-4">
          Redimaj Eko Tokene!
        </h2>

        <div className="flex flex-col items-center">
          <div className="relative p-4 bg-gray-50 rounded-lg">
            <img
              src="/images/qrcode.png"
              alt="Eco Points Redemption"
              className="w-64 h-64 rounded-lg border-2 border-gray-200 object-cover"
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">
              Skeniraj ovaj QR kod kod naših partnerskih kompanija!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RedemptionCard;
