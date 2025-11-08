import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTint, FaUser, FaCalendarAlt, FaHeart, FaMedal } from "react-icons/fa";
import { Link } from "react-router-dom";

// Types
interface Donation {
  date: string;
  location: string;
  bloodType: string;
}

interface Badge {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const Dashboard: React.FC = () => {
  const [recentDonations, setRecentDonations] = useState<Donation[]>([
    { date: "2025-01-10", location: "City General Hospital", bloodType: "O+" },
    { date: "2025-03-15", location: "Unity Medical Center", bloodType: "O+" },
    { date: "2025-06-20", location: "Hope County Clinic", bloodType: "O+" },
    { date: "2025-09-05", location: "Metro Health Services", bloodType: "O+" },
  ]);

  const badges: Badge[] = [
    { title: "First Donation", icon: <FaMedal className="text-yellow-500" />, description: "Completed your first donation!" },
    { title: "5 Donations", icon: <FaMedal className="text-red-500" />, description: "Congrats on 5 blood donations!" },
    { title: "Community Hero", icon: <FaMedal className="text-green-500" />, description: "Recognized for saving lives in your community." },
  ];

  const quotes = [
    "“The smallest act of kindness is worth more than the grandest intention.” – Oscar Wilde",
    "“Be the change you wish to see in the world.” – Mahatma Gandhi",
    "“Heroes are ordinary people who make themselves extraordinary.” – Gerard Way",
    "“Every drop counts. Every life matters.”",
  ];

  const [currentQuote, setCurrentQuote] = useState<string>(quotes[0]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });

    const interval = setInterval(() => {
      setCurrentQuote(prev => {
        const index = quotes.indexOf(prev);
        return quotes[(index + 1) % quotes.length];
      });
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans bg-white text-slate-800 min-h-screen">

      {/* Header */}
      <header className="bg-white/90 shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-red-600">Sahaay Dashboard</h1>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-slate-600 hover:text-red-600 transition">Home</Link>
          <Link to="/emergency" className="bg-rose-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-rose-800 animate-pulse transition">
            Emergency
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-red-50 py-20 text-center" data-aos="fade-down">
        <h2 className="text-5xl font-extrabold mb-4">Welcome Back, Hero!</h2>
        <p className="text-lg text-slate-700 mb-8 max-w-3xl mx-auto">
          Thank you for being a life-saver! Track your donations, check upcoming drives, and see the impact you’ve made in your community.
        </p>
        <Link to="/schedule-donation" className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 shadow-lg transform hover:scale-105 transition">
          Schedule a New Donation ❤️
        </Link>
      </section>

      {/* Stats Cards */}
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-6" data-aos="fade-up">
        {[
          { icon: <FaTint className="h-10 w-10 text-red-600" />, title: "Total Donations", value: "5 Times" },
          { icon: <FaHeart className="h-10 w-10 text-red-600" />, title: "Lives Saved", value: "15" },
          { icon: <FaCalendarAlt className="h-10 w-10 text-red-600" />, title: "Upcoming Drives", value: "1 Scheduled" },
          { icon: <FaUser className="h-10 w-10 text-red-600" />, title: "Profile Completeness", value: "80%" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition duration-500"
            data-aos="zoom-in"
            data-aos-delay={i * 150}
          >
            <div className="flex justify-center mb-4">{card.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-center">{card.title}</h3>
            <p className="text-slate-600 text-center font-bold text-xl">{card.value}</p>
          </div>
        ))}
      </section>

      {/* Badges */}
      <section className="container mx-auto px-4 py-12" data-aos="fade-up">
        <h3 className="text-3xl font-bold mb-6 text-center">Your Badges & Achievements</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition duration-500 w-64 text-center"
              data-aos="flip-left"
              data-aos-delay={index * 150}
            >
              <div className="flex justify-center mb-3 text-4xl">{badge.icon}</div>
              <h4 className="font-semibold mb-1">{badge.title}</h4>
              <p className="text-slate-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Donations */}
      <section className="container mx-auto px-4 py-12" data-aos="fade-up">
        <h3 className="text-3xl font-bold mb-6 text-center">Recent Donations</h3>
        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="min-w-full bg-white border border-slate-200 rounded-xl">
            <thead className="bg-red-100">
              <tr>
                <th className="text-left py-3 px-6 border-b">#</th>
                <th className="text-left py-3 px-6 border-b">Date</th>
                <th className="text-left py-3 px-6 border-b">Location</th>
                <th className="text-left py-3 px-6 border-b">Blood Type</th>
              </tr>
            </thead>
            <tbody>
              {recentDonations.map((donation, index) => (
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

      {/* Motivational Quote */}
      <section className="bg-red-50 py-12 text-center relative overflow-hidden">
        <p className="text-xl italic text-slate-700 max-w-3xl mx-auto animate-fade-in-out">{currentQuote}</p>
      </section>

      {/* Quick Actions */}
      <section className="bg-rose-50 py-12" data-aos="fade-up">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Quick Actions</h3>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/schedule-donation" className="bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 shadow-lg transform hover:scale-105 transition">
              Schedule a Donation
            </Link>
            <Link to="/donation-history" className="bg-white border border-red-600 text-red-600 px-6 py-4 rounded-lg font-semibold hover:bg-red-100 shadow-md transform hover:scale-105 transition">
              View Donation History
            </Link>
            <Link to="/edit-profile" className="bg-white border border-red-600 text-red-600 px-6 py-4 rounded-lg font-semibold hover:bg-red-100 shadow-md transform hover:scale-105 transition">
              Edit Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Sahaay. All rights reserved.</p>
        </div>
      </footer>

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes fade-in-out {
            0% { opacity: 0; transform: translateY(-10px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
          }
          .animate-fade-in-out {
            animation: fade-in-out 5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
