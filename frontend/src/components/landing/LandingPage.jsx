import React from 'react';

function LandingPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/forrest-aerial.jpg')", // A beautiful aerial view of a forest
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative max-w-4xl mx-auto text-center px-4">
                <h1 className="text-6xl md:text-7xl font-bold text-white mb-8">
                    Spasimo Našu Okolinu,<br />
                    Jednom po jednom donacijom.
                </h1>
                <p className="text-xl text-gray-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                    Pridružite se našoj misiji u borbi protiv klimatskih promjena kroz ciljanje inicijativa za smanjenje ugljeničnog otiska.
                    Vaše donacije direktno podržavaju projekte pošumljavanja, razvoj obnovljivih izvora energije i inovativne tehnologije za
                    hvatanje ugljen-dioksida. Zajedno možemo stvoriti održivu budućnost za generacije koje dolaze.
                </p>
                <button
                    className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg 
             hover:bg-green-700 transition-colors duration-300 shadow-lg 
             transform hover:scale-105 transition-transform"
                >
                    Napravite Razliku Sada
                </button>
            </div>
        </div>
    );
}

export default LandingPage;