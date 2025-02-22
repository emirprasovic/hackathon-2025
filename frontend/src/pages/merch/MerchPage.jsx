const merchItems = [
    {
      id: 1,
      name: "Eco Majica",
      description: "Napravljeno od 100% recikliranog materijala.",
      price: "25 BAM",
      image: "/images/tshirtfinal.png",
    },
    {
      id: 2,
      name: "Višekratna termosica",
      description: "Ostani hidriran i smanji plastični otpad.",
      price: "15 BAM",
      image: "/images/bottle.png",
    },
    {
      id: 3,
      name: "Eco-Friendly Ceker",
      description: "Perfektan za namirnice i potrebštine.",
      price: "20 BAM",
      image: "/images/totebagfinal.png",
    },
  ];
  
  export default function MerchPage() {
    return (
      <div
        className="flex flex-col items-center min-h-screen bg-green-100 p-6"
        style={{
          backgroundImage: "url('/images/green2.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold text-green-700 mb-2">🌿 Podrži nas sa Stilom!</h1>
        <p className="text-lg text-gray-800 mb-8 text-center max-w-xl">
        🌱 Svakom kupovinom se od prihoda posadi 5 stabala! <br />
          Kupovinom podržavaš naš okoliš! 🌍💚 <br />  
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {merchItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="mx-auto h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 my-2">{item.description}</p>
              <p className="text-green-700 font-bold text-lg">{item.price}</p>
              <button
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Kupi!
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  