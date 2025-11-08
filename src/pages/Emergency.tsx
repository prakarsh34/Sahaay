import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  db,
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Extend window type
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

const Emergency: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    bloodType: "",
    units: "",
    city: "",
    contact: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);

  // 🧩 Ensure recaptcha container exists
  useEffect(() => {
    if (!document.getElementById("recaptcha-container")) {
      const div = document.createElement("div");
      div.id = "recaptcha-container";
      document.body.appendChild(div);
    }
  }, []);

  // 🧹 Cleanup old verifier on unmount
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch {
          /* ignore */
        }
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // ⏱ Resend timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // 📋 Form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔐 Step 1 — Send OTP
  const sendOTP = async () => {
    if (!formData.contact.match(/^[6-9]\d{9}$/)) {
      alert("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    setLoading(true);
    const phoneNumber = `+91${formData.contact}`;

    try {
      console.log("📨 Sending OTP to:", phoneNumber);

      // ✅ Clear old reCAPTCHA instance if exists
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (err) {
          console.warn("⚠️ Could not clear old reCAPTCHA:", err);
        }
        window.recaptchaVerifier = null;
      }

      // ✅ Create a fresh invisible reCAPTCHA
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response: any) => {
          console.log("✅ reCAPTCHA verified:", response);
        },
        "expired-callback": () => {
          console.warn("⚠️ reCAPTCHA expired, resetting...");
        },
      });

      await window.recaptchaVerifier.render();

      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      setConfirmationResult(result);
      setOtpSent(true);
      setTimer(60);
      alert(`✅ OTP sent successfully to ${phoneNumber}`);
    } catch (error: any) {
      console.error("❌ OTP Error:", error);
      alert(`Failed to send OTP: ${error.message}`);
      window.recaptchaVerifier = null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2 — Verify OTP
  const verifyOTP = async () => {
    if (!otp || !confirmationResult) {
      alert("Please enter the OTP sent to your phone.");
      return;
    }

    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      setVerified(true);
      alert("✅ Phone number verified successfully!");
    } catch (error: any) {
      console.error("❌ OTP Verification Error:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🩸 Step 3 — Submit Emergency Request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verified) {
      alert("Please verify your phone number with OTP before submitting.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "emergencyRequests"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error("❌ Firestore Error:", err);
      alert(`Failed to submit. Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Success screen
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-rose-50 to-red-100 text-center px-6">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">
          Request Submitted 🚑
        </h1>
        <p className="text-slate-700 max-w-md">
          Thank you, <span className="font-semibold">{formData.name}</span>.  
          We’ve received your emergency request for{" "}
          <span className="font-semibold text-red-700">
            {formData.units} unit(s) of {formData.bloodType}
          </span>{" "}
          in <span className="font-semibold text-red-700">{formData.city}</span>.
        </p>
        <p className="mt-6 text-red-500 font-medium">
          Our team will contact you shortly at {formData.contact}.
        </p>

        <Link
          to="/"
          className="mt-10 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  // 🧾 Main form UI
  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center px-4 py-16">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-4 text-center">
        EMERGENCY BLOOD REQUEST
      </h1>
      <p className="text-slate-700 mb-12 text-center max-w-xl text-lg md:text-xl">
        Fill out the form below and verify your phone number to submit an emergency request.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg transition-all hover:shadow-2xl"
      >
        {/* Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-2 text-slate-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600 outline-none"
          />
        </div>

        {/* Blood Type */}
        <div className="mb-4">
          <label className="block font-semibold mb-2 text-slate-700">
            Blood Type
          </label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600 outline-none"
          >
            <option value="">Select Blood Type</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Units */}
        <div className="mb-4">
          <label className="block font-semibold mb-2 text-slate-700">
            Units Required
          </label>
          <input
            type="number"
            name="units"
            value={formData.units}
            onChange={handleChange}
            required
            min={1}
            placeholder="Enter number of units"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600 outline-none"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block font-semibold mb-2 text-slate-700">
            City / Location
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="Enter your city"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600 outline-none"
          />
        </div>

        {/* Contact + OTP */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-slate-700">
            Contact Number
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            placeholder="10-digit number"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600 outline-none"
          />

          {!verified && (
            <>
              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOTP}
                  disabled={loading || timer > 0}
                  className="mt-3 w-full bg-rose-600 text-white py-2 rounded-lg font-bold hover:bg-rose-700 transition-all"
                >
                  {timer > 0
                    ? `Resend OTP in ${timer}s`
                    : loading
                    ? "Sending OTP..."
                    : "Send OTP"}
                </button>
              ) : (
                <div className="mt-3">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600 outline-none mb-2"
                  />
                  <button
                    type="button"
                    onClick={verifyOTP}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-all"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !verified}
          className={`w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-all ${
            loading || !verified ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      <Link
        to="/"
        className="mt-6 text-red-600 font-semibold hover:underline text-lg"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default Emergency;
