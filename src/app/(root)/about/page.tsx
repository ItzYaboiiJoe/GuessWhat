"use client";

import { motion } from "motion/react";

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-20">
      {/* Remove stray text: Add commentMore actions */}
      <motion.div
        className="max-w-2xl text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold mb-4">About Guess What</h1>
        <p className="text-lg">
          Guess What is a space-themed quiz game that challenges players to
          identify what the picture is. Some information may be stored locally
          on your device to enhance your experience.
        </p>
        <p className="mt-4 text-md text-gray-300">
          Made by LoonyDevs, this game combines science, fun, and exploration.
        </p>
        <div className="mt-80 border-t border-white/10 pt-8 text-left text-gray-400 text-sm">
          <h2 className="font-semibold mb-2">Privacy Policy</h2>
          <p className="mb-2">
            Guess What does not collect, store, or share any personally
            identifiable information. The app may store minimal data locally on
            your device to improve functionality.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
