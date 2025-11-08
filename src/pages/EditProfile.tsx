import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const EditProfile: React.FC = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add API call or Firebase update
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="font-sans bg-white text-slate-800 min-h-screen">
      {/* Header */}
      <header className="bg-white/90 shadow-sm py-4 px-8 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-red-600">Edit Profile</h1>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-slate-600 hover:text-red-600">Home</Link>
          <Link to="/dashboard" className="text-slate-600 hover:text-red-600">Dashboard</Link>
          <Link to="/emergency" className="bg-rose-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-rose-800 animate-pulse">Emergency</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-red-50 py-16 text-center" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-4">Update Your Profile</h2>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto">
          Keep your personal information up-to-date to ensure a smooth donation experience.
        </p>
      </section>

      {/* Edit Form */}
      <section className="container mx-auto px-4 py-12" data-aos="fade-up">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow">
          {success && (
            <div className="bg-green-100 text-green-700 py-2 px-4 rounded mb-4 text-center">
              Profile updated successfully!
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Save Changes
            </button>
          </form>
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

export default EditProfile;
