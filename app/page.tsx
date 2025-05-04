"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const messages = [
  { label: "Talking Jargon!", src: "/audio/talkJargon.mp3" },
  { label: "bOoOoB", src: "/audio/booooob.mp3" },
  { label: "Horoo...", src: "/audio/horoo.mp3" },
  { label: "Hogwash", src: "/audio/hogwashPeople.mp3" },
  { label: "Oooh!", src: "/audio/oooh.mp3" },
  { label: "Hi Alex!", src: "/audio/hiAlex.mp3" },
];

export default function HomePage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.addEventListener("ended", () => setPlaying(null));
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const playAudio = (src: string) => {
    if (!audioRef.current) return;
    if (playing === src) {
      audioRef.current.pause();
      setPlaying(null);
    } else {
      audioRef.current.src = src;
      audioRef.current.play();
      setPlaying(src);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-neutral-900 overflow-hidden"
    >
      {/* Glow background animation */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, #4f46e5 0%, transparent 40%)",
            "radial-gradient(circle at 70% 40%, #06b6d4 0%, transparent 40%)",
            "radial-gradient(circle at 50% 60%, #4f46e5 0%, transparent 40%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Bob’s Hotline</h1>
        <p className="text-gray-300 max-w-xl mx-auto text-lg md:text-xl mb-12">
          Tap a button to hear one of Bob’s iconic phrases.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl w-full">
        {messages.map((msg, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => playAudio(msg.src)}
            className={`rounded-2xl h-20 flex items-center justify-center font-medium text-sm md:text-base
                        px-4 py-2 text-white bg-white/10 backdrop-blur-lg shadow-lg transition-all
                        ${playing === msg.src ? "ring-2 ring-cyan-400" : "hover:bg-white/20"}`}
          >
            {msg.label}
          </motion.button>
        ))}
      </div>

      <footer className="relative z-10 mt-16 text-xs text-gray-500">
        v1.0 — Bob Hotline — Designed by lestudio
      </footer>
    </motion.div>
  );
}
