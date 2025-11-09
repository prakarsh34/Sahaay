import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-red-600 text-white flex justify-between items-center px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold tracking-wide">Sahaay ❤️</h1>
      <div className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-yellow-300">Home</Link>
        <Link to="/impact" className="hover:text-yellow-300">Impact</Link>
        <Link to="/awareness" className="hover:text-yellow-300">Awareness</Link>
        <Link to="/about" className="hover:text-yellow-300">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;