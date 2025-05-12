"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SidebarMenu() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sharedClasses =
    "bg-neutral-900 text-white shadow-lg z-50 overflow-hidden fixed";

  return (
    <motion.div
      animate={{
        width: !isMobile && open ? 220 : isMobile ? "100%" : 60,
        height: isMobile ? (open ? 160 : 50) : "100%",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`${sharedClasses} ${isMobile ? "bottom-0 left-0" : "left-0 top-0"}`}
    >
      <div
        className={`flex ${isMobile ? "justify-between px-4 py-2" : "items-center justify-between px-4 py-4 border-b border-neutral-700"}`}
      >
        <button
        onClick={() => setOpen(!open)}
        className={`text-white hover:text-cyan-400 focus:outline-none ${
            isMobile ? "text-2xl p-2" : "text-xl"
        }`}
        >
        {open ? "✕" : "☰"}
        </button>

        {!isMobile && open && <span className="ml-2 font-semibold text-sm">Menu</span>}
      </div>

      <nav
        className={`flex ${isMobile ? "flex-row justify-around px-1 pb-2" : "flex-col mt-4 space-y-2 px-2"}`}
      >
        <Link href="/" className="block px-2 py-2 rounded hover:bg-neutral-800 text-sm">
          🔊 Hotline
        </Link>
        <Link href="/tribute" className="block px-2 py-2 rounded hover:bg-neutral-800 text-sm">
          🎬 Tribute
        </Link>
        <Link href="/gallery" className="block px-2 py-2 rounded hover:bg-neutral-800 text-sm">
          🖼️ Gallery
        </Link>
      </nav>
    </motion.div>
  );
}