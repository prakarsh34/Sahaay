import React from "react";
import { motion } from "framer-motion";

const SahaayLogo: React.FC<{ size?: string; showTagline?: boolean }> = ({
  size = "text-3xl",
  showTagline = false,
}) => {
  return (
    <div className="flex flex-col items-start select-none">
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Heart Drop Icon */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-9 h-9 drop-shadow-md"
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="50%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
          </defs>
          <path
            fill="url(#heartGradient)"
            d="M32 57s-1-.6-2-1.4C17.3 45.7 8 36.8 8 25.6 8 16.5 14.5 10 23.6 10c4.8 0 9 2.5 11.4 6.3C37.4 12.5 41.6 10 46.4 10 55.5 10 62 16.5 62 25.6c0 11.2-9.3 20.1-22 30C33 56.4 32 57 32 57z"
          />
          <path
            d="M32 26c3 3.5 6 7.8 6 11.5a6 6 0 11-12 0c0-3.7 3-8 6-11.5z"
            fill="#fff"
            opacity="0.8"
          />
        </motion.svg>

        {/* Gradient Text */}
        <motion.h1
          className={`${size} font-extrabold bg-gradient-to-r from-rose-600 via-rose-500 to-pink-400 text-transparent bg-clip-text tracking-wide`}
        >
          Sahaay
        </motion.h1>
      </motion.div>

      {showTagline && (
        <motion.p
          className="text-sm text-gray-500 mt-1 ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Every Drop Counts
        </motion.p>
      )}
    </div>
  );
};

export default SahaayLogo;