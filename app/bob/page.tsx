"use client";

import React from "react";
import { motion } from "framer-motion";

export default function InMemoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-neutral-950 text-white px-6 py-12 flex flex-col items-center justify-center"
    >
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">In Memory of Bob</h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8">
          Bob was more than just a voice on the line — he was a legend. Known for his wit, warmth, and unforgettable phrases, Bob brought joy to those around him with every call.
        </p>
        <p className="text-gray-400 mb-6">
          From spontaneous catchphrases like "Horoo..." and "Talking Jargon!" to heartfelt hellos, Bob's hotline became a sanctuary of comfort, laughter, and a little bit of mischief.
        </p>
        <p className="text-gray-400 mb-6">
          Bob lived a life full of stories — late-night chats, early morning rambles, and enough wisdom to fill volumes. His voice lives on through this digital tribute.
        </p>
        <p className="text-cyan-400 italic">
          "bOoOoB... you’re always just a tap away."
        </p>

        <div className="mt-12">
          <a
            href="/"
            className="text-cyan-300 hover:underline text-sm"
          >
            ← Back to Hotline
          </a>
        </div>
      </div>
    </motion.div>
  );
}
