import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import FindDrive from "./pages/FindDrive";
import OurImpact from "./pages/OurImpact";
import WhyDonate from "./pages/WhyDonate";
import ForDonors from "./pages/ForDonors";
import Emergency from "./pages/Emergency";
import ScheduleDonation from "./pages/ScheduleDonation";
import Dashboard from "./pages/Dashboard";
import DonationHistory from "./pages/DonationHistory";
import EditProfile from "./pages/EditProfile";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/find-drive" element={<FindDrive />} />
        <Route path="/our-impact" element={<OurImpact />} />
        <Route path="/why-donate" element={<WhyDonate />} />
        <Route path="/for-donors" element={<ForDonors />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/schedule-donation" element={<ScheduleDonation />} />

        {/* Dashboard and sub-pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donation-history" element={<DonationHistory />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        {/* Fallback */}
        <Route path="*" element={<div className="text-center py-20 text-2xl">Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
