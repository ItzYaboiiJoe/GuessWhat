"use client";

import { motion } from "motion/react";

const ErrorMessage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-20">
      <motion.div
        className="max-w-2xl text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-lg">
          We are sorry, there has been a technical issue with NASA API and once
          its available again the game will work as expected.
        </p>
      </motion.div>
    </div>
  );
};

export default ErrorMessage;
