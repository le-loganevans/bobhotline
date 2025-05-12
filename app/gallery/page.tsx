"use client";

import React from "react";

export default function BobTributePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-4 py-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center leading-tight">
        🎬 A Memory of Bob
      </h1>

      <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg mb-6">
        <iframe
          src="https://1drv.ms/v/c/192124ecb60da5ed/IQTDfzmH6D5zSa469DwPlPxCAVT7q93WYGKyTDAdgdu0pEw"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      <p className="text-sm sm:text-base text-gray-400 text-center max-w-xl px-2">
        Bob left us with stories, laughter, and his unforgettable voice.
        Here's something to remember him by.
      </p>

      <a
        href="/"
        className="mt-8 text-cyan-400 hover:underline text-sm sm:text-base"
      >
        ← Back to Hotline
      </a>
    </div>
  );
}
