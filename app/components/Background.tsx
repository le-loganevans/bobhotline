// app/components/Background.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Star = {
  left: number; // %
  top: number;  // %
  size: number; // px
  delay: number;
  dur: number;
  opacity: number;
};

type Meteor = {
  id: number;
  x: number;        // px
  y: number;        // px
  angleDeg: number; // deg
  length: number;   // px
  dur: number;      // s
};

export default function Background() {
  const prefersReducedMotion = useReducedMotion();
  const [stars, setStars] = useState<Star[] | null>(null);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  // Star field (client only to avoid hydration mismatches)
  useEffect(() => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const make = (count: number, size: number, opMin = 0.6, opMax = 1): Star[] =>
      Array.from({ length: count }).map(() => ({
        left: rand(0, 100),
        top: rand(0, 100),
        size,
        delay: rand(0, 8),
        dur: rand(2.2, 5.8),
        opacity: rand(opMin, opMax),
      }));

    setStars([
      ...make(180, 1, 0.4, 0.9),
      ...make(90, 2, 0.5, 1),
      ...make(28, 3, 0.7, 1),
    ]);
  }, []);

  // Shooting stars spawner (uses CSS animationend to remove meteors)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let id = 0;
    let spawnTimeout: number | undefined;
    let isMounted = true;

    const spawn = () => {
      if (!isMounted) return;

      const vw = Math.max(window.innerWidth, 1);
      const vh = Math.max(window.innerHeight, 1);

      // 70% TL->BR, 30% TR->BL
      const dir = Math.random() < 0.7 ? "TL_BR" : "TR_BL";
      const base = 18 + Math.random() * 22; // 18–40°
      const angleDeg = dir === "TL_BR" ? base : 180 - base;

      const startX =
        dir === "TL_BR"
          ? Math.random() * (vw * 0.35) - vw * 0.15 // -15%..20% vw
          : vw - Math.random() * (vw * 0.35) + vw * 0.05; // 70%..105% vw
      const startY = Math.random() * (vh * 0.45); // 0..45% vh

      const length = vw * (1.1 + Math.random() * 0.3); // 1.1–1.4 * vw
      const dur = 1.8 + Math.random() * 0.8; // 1.8–2.6s

      const meteor: Meteor = { id: ++id, x: startX, y: startY, angleDeg, length, dur };
      setMeteors((prev) => [...prev, meteor]);

      // schedule the next meteor
      const nextIn = 8000 + Math.random() * 10000; // 8–18s
      spawnTimeout = window.setTimeout(spawn, nextIn);
    };

    // initial delay
    spawnTimeout = window.setTimeout(spawn, 3000 + Math.random() * 4000);

    return () => {
      isMounted = false;
      if (spawnTimeout) window.clearTimeout(spawnTimeout);
      // clear any in-flight meteors to silence late events on unmount
      setMeteors([]);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundColor: "#06070a",
        backgroundImage: `
          radial-gradient(1200px 800px at 50% -10%, rgba(60,60,80,0.32), transparent 60%),
          radial-gradient(1000px 600px at 80% 120%, rgba(24,24,30,0.35), transparent 70%),
          linear-gradient(180deg, #07080c 0%, #05060a 60%, #04050a 100%)
        `,
        backgroundBlendMode: "screen, screen, normal",
      }}
    >
      {/* Star field */}
      {stars && (
        <div className="absolute inset-0">
          {stars.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full will-change-transform will-change-opacity"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                background: "white",
                opacity: s.opacity,
                boxShadow:
                  s.size >= 3
                    ? "0 0 10px rgba(255,255,255,0.35), 0 0 2px rgba(255,255,255,0.9)"
                    : "0 0 4px rgba(255,255,255,0.25)",
                animation: prefersReducedMotion
                  ? undefined
                  : `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
              }}
            />
          ))}
        </div>
      )}

      {/* Nebula / soft color clouds */}
      <div className="absolute inset-0" style={{ filter: "blur(30px)", opacity: 0.22 }}>
        <div
          className="absolute -inset-1"
          style={{
            backgroundImage: `
              radial-gradient(400px 300px at 15% 20%, rgba(84,160,255,0.20), transparent 65%),
              radial-gradient(600px 380px at 75% 35%, rgba(160,120,255,0.18), transparent 70%),
              radial-gradient(520px 360px at 60% 85%, rgba(120,220,200,0.16), transparent 70%)
            `,
            backgroundRepeat: "no-repeat",
            transform: "translateX(-10%)",
            animation: prefersReducedMotion ? undefined : "drift 120s linear infinite",
          }}
        />
        <div
          className="absolute -inset-1"
          style={{
            opacity: 0.45,
            filter: "blur(40px)",
            backgroundImage: `
              radial-gradient(380px 260px at 30% 65%, rgba(255,155,105,0.12), transparent 60%),
              radial-gradient(440px 300px at 85% 55%, rgba(140,190,255,0.14), transparent 65%)
            `,
            backgroundRepeat: "no-repeat",
            transform: "translateX(10%)",
            animation: prefersReducedMotion ? undefined : "driftReverse 90s linear infinite",
          }}
        />
      </div>

      {/* Shooting stars */}
      {!prefersReducedMotion && meteors.length > 0 && (
        <div className="absolute inset-0">
          {meteors.map((m) => (
            <div
              key={m.id}
              className="shoot-wrap"
              style={{
                left: `${m.x}px`,
                top: `${m.y}px`,
                transform: `rotate(${m.angleDeg}deg)`,
              }}
            >
              <div
                className="shoot"
                onAnimationEnd={() =>
                  setMeteors((prev) => prev.filter((x) => x.id !== m.id))
                }
                style={
                  {
                    ["--len" as any]: `${m.length}px`,
                    ["--dur" as any]: `${m.dur}s`,
                  } as React.CSSProperties
                }
              >
                <span className="shoot-trail" />
                <span className="shoot-head" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scoped CSS for animations / meteors */}
      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0.5;
            transform: scale(0.95);
          }
        }
        @keyframes drift {
          0% {
            transform: translateX(-10%);
          }
          50% {
            transform: translateX(10%);
          }
          100% {
            transform: translateX(-10%);
          }
        }
        @keyframes driftReverse {
          0% {
            transform: translateX(10%);
          }
          50% {
            transform: translateX(-10%);
          }
          100% {
            transform: translateX(10%);
          }
        }

        /* The shoot animation moves along the local X axis; wrapper handles rotation */
        @keyframes shootX {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateX(var(--len));
            opacity: 0;
          }
        }

        .shoot-wrap {
          position: absolute;
          width: 1px;
          height: 1px;
          transform-origin: 0 0;
          pointer-events: none;
        }

        .shoot {
          position: absolute;
          left: 0;
          top: 0;
          width: 1px; /* logical axis line */
          height: 1px;
          animation: shootX var(--dur) linear forwards;
          will-change: transform, opacity;
          pointer-events: none;
        }

        .shoot-trail {
          position: absolute;
          left: -140px; /* extend a bit behind the head */
          top: 0;
          height: 2px;
          width: 140px;
          transform: translateY(-1px); /* center vertically */
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.65) 65%,
            rgba(255, 255, 255, 0.95) 100%
          );
          border-radius: 2px;
          filter: blur(0.3px);
          opacity: 0.9;
        }

        .shoot-head {
          position: absolute;
          left: 0; /* head at origin; animation moves it */
          top: 0;
          width: 4px;
          height: 4px;
          transform: translate(-2px, -2px); /* center on path */
          border-radius: 50%;
          background: white;
          box-shadow:
            0 0 8px rgba(255, 255, 255, 0.85),
            0 0 2px rgba(255, 255, 255, 1);
        }
      `}</style>
    </div>
  );
}
