import React from "react";

const Awareness: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-semibold text-red-700 mb-6">Why Donate Blood?</h2>
      <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
        Every 2 seconds, someone in the world needs blood. By donating just one unit,
        you can save up to three lives. Sahaay ensures your donation reaches the right
        person at the right time.
      </p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
        alt="Blood Donation Awareness"
        className="w-40 mx-auto mt-8"
      />
    </div>
  );
};

export default Awareness;