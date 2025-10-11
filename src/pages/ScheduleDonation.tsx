import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const DonateBloodNow: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodType: "",
    contact: "",
    city: "",
    date: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add form data to Firestore 'donors' collection
      const docRef = await addDoc(collection(db, "donors"), {
        ...formData,
        timestamp: new Date(),
      });

      console.log("Donor added with ID:", docRef.id);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Firestore error:", err);
      alert(
        `Something went wrong. Check console for details.\nError: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="flex flex-col justify-center items-center h-screen text-center bg-gradient-to-br from-rose-50 to-red-50 px-4"
        data-aos="zoom-in"
      >
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">
          Thank You, {formData.name || "Hero"}!
        </h1>
        <p className="text-slate-700 max-w-md">
          Your commitment to donate blood is a true act of kindness.  
          We'll contact you soon with your drive details in{" "}
          <span className="font-semibold text-rose-700">{formData.city}</span>.
        </p>
        <p className="mt-8 text-rose-500 font-medium">
          “Every drop counts — and today, you made it count.”
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-800 min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h1 className="text-5xl font-bold mb-4 text-red-600">
          Donate Blood Now ❤️
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Fill in your details below and join our mission to save lives.  
          Together, we make the world healthier and stronger.
        </p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-rose-50 rounded-2xl shadow-md p-8 space-y-6"
        data-aos="fade-up"
      >
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block mb-2 font-medium">Age</label>
            <input
              type="number"
              name="age"
              required
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="65"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Blood Type */}
          <div>
            <label className="block mb-2 font-medium">Blood Type</label>
            <select
              name="bloodType"
              required
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            >
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bt) => (
                <option key={bt} value={bt}>{bt}</option>
              ))}
            </select>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block mb-2 font-medium">Contact Number</label>
            <input
              type="tel"
              name="contact"
              required
              pattern="[0-9]{10}"
              placeholder="10-digit mobile"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* City */}
          <div>
            <label className="block mb-2 font-medium">City</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block mb-2 font-medium">Preferred Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-200 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Confirm My Donation"}
        </button>
      </form>

      {/* Guidelines */}
      <div className="mt-20 text-center px-6" data-aos="fade-up">
        <h3 className="text-3xl font-bold mb-6 text-rose-700">
          Before You Donate
        </h3>
        <ul className="max-w-2xl mx-auto text-slate-600 space-y-3 text-left">
          <li>✔️ Eat a nutritious meal and stay hydrated before donation.</li>
          <li>✔️ Carry a valid government-issued ID card.</li>
          <li>✔️ Avoid alcohol or smoking for 48 hours before donating.</li>
          <li>✔️ Rest for a few minutes post-donation and enjoy refreshments.</li>
        </ul>
      </div>
    </div>
  );
};

export default DonateBloodNow;
