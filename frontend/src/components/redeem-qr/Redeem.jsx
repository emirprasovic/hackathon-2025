const RedemptionCard = () => {
  return (
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
  );
};

export default RedemptionCard;