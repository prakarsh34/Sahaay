import React from "react";

const Impact: React.FC = () => {
  const stats = [
    { label: "Donations Made", value: 1200 },
    { label: "Lives Saved", value: 950 },
    { label: "Hospitals Connected", value: 34 },
  ];

  return (
    <div className="text-center mt-12">
      <h2 className="text-3xl font-semibold text-red-700 mb-6">Our Impact</h2>
      <div className="flex justify-center gap-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl px-6 py-4 border border-red-200">
            <h3 className="text-4xl font-bold text-red-600">{s.value}</h3>
            <p className="text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Impact;