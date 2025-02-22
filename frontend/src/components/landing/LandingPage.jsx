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
                    Save Our Planet,<br />
                    One Donation at a Time
                </h1>
                <p className="text-xl text-gray-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                    Join our mission to combat climate change through targeted carbon reduction initiatives. 
                    Your donations directly support reforestation projects, renewable energy development, 
                    and innovative carbon capture technologies. Together, we can create a sustainable 
                    future for generations to come.
                </p>
                <button 
                    className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg 
                             hover:bg-green-700 transition-colors duration-300 shadow-lg 
                             transform hover:scale-105 transition-transform"
                >
                    Make a Difference Now
                </button>
            </div>
        </div>
    );
}

export default LandingPage;