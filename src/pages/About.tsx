import React from "react";

const About: React.FC = () => {
  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold text-red-700 mb-4">About Sahaay</h2>
      <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
        Sahaay is a platform built to bridge the gap between donors, hospitals, and those in urgent need.
        Our mission is simple — empower individuals to save lives through a transparent and connected system.
      </p>
    </div>
  );
};

export default About;