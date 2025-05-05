"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import React from "react";

const messages = [
  { label: "Talking Jargon!", src: "/audio/talkJargon.mp3" },
  { label: "bOoOoB", src: "/audio/booooob.mp3" },
  { label: "Horoo...", src: "/audio/horoo.mp3" },
  { label: "Hogwash", src: "/audio/hogwashPeople.mp3" },
  { label: "Oooh!", src: "/audio/oooh.mp3" },
  { label: "Hi Alex!", src: "/audio/hiAlex.mp3" },
];

const ICON_COUNT = 10;
const ICON_SIZE = 32;

interface Icon {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function HomePage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<Icon[]>([]);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.addEventListener("ended", () => setPlaying(null));
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const icons: Icon[] = Array.from({ length: ICON_COUNT }).map(() => {
      return {
        x: Math.random() * (window.innerWidth - ICON_SIZE),
        y: Math.random() * (window.innerHeight - ICON_SIZE),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        ref: React.createRef<HTMLDivElement>(),
      };
    });

    iconsRef.current = icons;

    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < ICON_COUNT; i++) {
        const icon = icons[i];

        icon.x += icon.vx;
        icon.y += icon.vy;

        // bounce off edges
        if (icon.x <= 0 || icon.x + ICON_SIZE >= width) icon.vx *= -1;
        if (icon.y <= 0 || icon.y + ICON_SIZE >= height) icon.vy *= -1;

        // bounce off other icons
        for (let j = i + 1; j < ICON_COUNT; j++) {
          const other = icons[j];
          const dx = icon.x - other.x;
          const dy = icon.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < ICON_SIZE) {
            // swap velocities
            [icon.vx, other.vx] = [other.vx, icon.vx];
            [icon.vy, other.vy] = [other.vy, icon.vy];
          }
        }

        const el = icon.ref.current;
        if (el) {
          el.style.transform = `translate(${icon.x}px, ${icon.y}px)`;
        }
      }

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
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
      ref={containerRef}
    >
      {/* Floating favicon elements behind everything */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {iconsRef.current.map((icon, i) => (
          <motion.div
            key={i}
            ref={icon.ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.05 }}
            className="absolute w-8 h-8"
            style={{ transform: `translate(${icon.x}px, ${icon.y}px)` }}
          >
            <img src="/bob.ico" alt="icon" className="w-full h-full" />
          </motion.div>
        ))}
      </div>

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
        v1.0.2505 — Bob Hotline — Designed by lestudio
      </footer>
    </motion.div>
  );
}