import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-6 md:px-8 py-32 md:py-40">
        <div className="max-w-4xl mx-auto py-8 text-center space-y-20">
          <h1 className="text-6xl md:text-8xl py-8 mt-8 font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
            O NAMA
          </h1>
          <div className="space-y-8 max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Transforming everyday actions into environmental impact
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Join our community of eco-conscious individuals making a difference 
              through small, daily habits. Together, we're building a sustainable 
              future by tracking, sharing, and celebrating our environmental contributions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;