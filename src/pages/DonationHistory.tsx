import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTint } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Donation {
  date: string;
  location: string;
  bloodType: string;
}

const DonationHistory: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([
    { date: "2025-01-10", location: "City General Hospital", bloodType: "O+" },
    { date: "2025-03-15", location: "Unity Medical Center", bloodType: "O+" },
    { date: "2025-06-20", location: "Hope County Clinic", bloodType: "O+" },
    { date: "2025-09-05", location: "Metro Health Services", bloodType: "O+" },
  ]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <div className="font-sans bg-white text-slate-800 min-h-screen">
      {/* Header */}
      <header className="bg-white/90 shadow-sm py-4 px-8 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-red-600">Donation History</h1>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-slate-600 hover:text-red-600">Home</Link>
          <Link to="/dashboard" className="text-slate-600 hover:text-red-600">Dashboard</Link>
          <Link to="/emergency" className="bg-rose-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-rose-800 animate-pulse">Emergency</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-red-50 py-16 text-center" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-4">Your Donation History</h2>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto">
          Review your past donations and see the lives you’ve helped save.
        </p>
      </section>

      {/* Donation Table */}
      <section className="container mx-auto px-4 py-12" data-aos="fade-up">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-slate-200 rounded-xl shadow">
            <thead className="bg-red-100">
              <tr>
                <th className="text-left py-3 px-6 border-b">#</th>
                <th className="text-left py-3 px-6 border-b">Date</th>
                <th className="text-left py-3 px-6 border-b">Location</th>
                <th className="text-left py-3 px-6 border-b">Blood Type</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index} className="hover:bg-red-50 transition">
                  <td className="py-3 px-6 border-b">{index + 1}</td>
                  <td className="py-3 px-6 border-b">{donation.date}</td>
                  <td className="py-3 px-6 border-b">{donation.location}</td>
                  <td className="py-3 px-6 border-b flex items-center gap-2">
                    <FaTint className="text-red-600" /> {donation.bloodType}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Sahaay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DonationHistory;
