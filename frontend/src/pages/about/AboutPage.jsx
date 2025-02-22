const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4 md:px-8 py-24 md:py-32">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8">
            <span className="bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
              O NAMA
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-gray-800 mb-6">
            Gradimo zeleniju budućnost zajedno
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Mission Statement */}
          <div className="md:col-span-7 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-green-800">
                Naša misija
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Pretvaramo svakodnevne postupke u mjerljive ekološke rezultate. 
                Kroz inovativne tehnologije i zajednički trud, stvaramo platformu 
                koja nagrađuje održive odluke.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="text-green-600 text-2xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold text-gray-900">15K+</h3>
                <p className="text-gray-600">Uspješnih Ekoloških Akcija</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="text-green-600 text-2xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-gray-900">50K+</h3>
                <p className="text-gray-600">Aktivnih članova</p>
              </div>
            </div>
          </div>

          {/* Image/Visual Section */}
          <div className="md:col-span-5">
            <div className="relative shadow-lg bg-green-100 rounded-2xl p-8 shadow-inner">
              <div className="aspect-w-1 aspect-h-1">
                <div className="bg-green-200 rounded-xl h-full w-full flex items-center justify-center">
                  <h2 className="text-9xl text-green-600 my-[54px]">♻️</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-green-800 mb-4">🌱 Vizija</h3>
            <p className="text-gray-700 leading-relaxed">
              Stvaranje globalne zajednice koja dijeli ekološke ideje i podstiče
              održive promijene.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-green-800 mb-4">💚 Vrijednosti</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Transparentnost</li>
              <li>Inovativnost</li>
              <li>Zajednička odgovornost</li>
            </ul>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-green-800 mb-4">👨💻 Tim</h3>
            <p className="text-gray-700 leading-relaxed">
              Multidisciplinarni tim stručnjaka posvjećenih održivom razvoju i
              tehnološkim riješenjima.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;