'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BobTributePage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        relative z-10 min-h-dvh
        flex items-center justify-center
        px-6 py-16 md:py-24
        text-white
      "
    >
      <section
        className="
          w-full max-w-3xl
          rounded-3xl border border-white/10
          bg-white/5 backdrop-blur-xl
          shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
          px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12
        "
      >
        {/* Hero */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-wide text-zinc-300/90">
            <span className="inline-block size-2 rounded-full bg-cyan-300" />
            Gallery
          </div>

          <h1
            className="
              mt-4 text-4xl md:text-6xl font-black tracking-tight
              bg-gradient-to-b from-white to-zinc-300/80 bg-clip-text text-transparent
            "
          >
            A Memory of Bob
          </h1>

          <p className="mt-4 text-zinc-300/90 text-base md:text-lg max-w-2xl mx-auto">
            Bob left us with stories, laughter, and his unforgettable voice. Here’s something to remember him by.
          </p>
        </div>

        {/* Video */}
        <div className="aspect-video w-full mb-8 md:mb-10 overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-[0_6px_30px_-10px_rgba(0,0,0,0.6)]">
          <iframe
            src="https://1drv.ms/v/c/192124ecb60da5ed/IQTDfzmH6D5zSa469DwPlPxCAVT7q93WYGKyTDAdgdu0pEw"
            title="A Memory of Bob — Tribute"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          />
        </div>

        {/* Copy (optional extra line for warmth) */}
        <div className="prose prose-invert max-w-none prose-p:my-0">
          <p className="text-zinc-400">
            Thank you for keeping his spirit alive by sharing and revisiting these moments.
          </p>
        </div>

        {/* Footer actions */}
        <div className="mt-10 flex justify-center">
          <a
            href="/"
            className="
              inline-flex items-center gap-2 rounded-xl
              border border-cyan-400/40 bg-cyan-400/10
              px-4 py-2 text-sm font-medium text-cyan-200
              hover:bg-cyan-400/15 hover:border-cyan-300/50
              focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60
              transition
            "
          >
            ← Back to Hotline
          </a>
        </div>
      </section>
    </motion.main>
  );
}
