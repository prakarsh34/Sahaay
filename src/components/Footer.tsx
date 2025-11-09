import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-600 text-white py-4 text-center mt-16">
      <p>© {new Date().getFullYear()} Sahaay. Built with ❤️ for humanity.</p>
    </footer>
  );
};

export default Footer;