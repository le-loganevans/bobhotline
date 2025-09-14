// app/page.tsx (your HomePage)
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import FeedbackFooter from '@/app/components/FeedbackFooter';

type Message = { label: string; src: string };

const messages: Message[] = [
  { label: 'Talking Jargon!', src: '/audio/talkJargon.mp3' },
  { label: 'bOoOoB', src: '/audio/booooob.mp3' },
  { label: 'Horoo...', src: '/audio/horoo.mp3' },
  { label: 'Hogwash', src: '/audio/hogwashPeople.mp3' },
  { label: 'Oooh!', src: '/audio/oooh.mp3' },
  { label: 'Hi Alex!', src: '/audio/hiAlex.mp3' },
];

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const audioMapRef = useRef<Map<number, HTMLAudioElement>>(new Map());

  useEffect(() => {
    const map = audioMapRef.current;
    messages.forEach((m, i) => {
      const a = new Audio(m.src);
      a.preload = 'auto';
      a.addEventListener('ended', () => {
        setPlayingIdx((idx) => (idx === i ? null : idx));
      });
      map.set(i, a);
    });
    return () => {
      audioMapRef.current.forEach((a) => {
        a.pause();
        a.src = '';
      });
      audioMapRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (!Number.isNaN(n) && n >= 1 && n <= messages.length) {
        e.preventDefault();
        playAudio(n - 1);
      }
      if (e.code === 'Space' && playingIdx !== null) {
        e.preventDefault();
        playAudio(playingIdx);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [playingIdx]);

  const playAudio = (idx: number) => {
    const map = audioMapRef.current;
    const current = playingIdx !== null ? map.get(playingIdx) : null;
    const next = map.get(idx);
    if (!next) return;

    if (playingIdx === idx) {
      current?.pause();
      if (current) current.currentTime = 0;
      setPlayingIdx(null);
      return;
    }

    if (current) {
      current.pause();
      current.currentTime = 0;
    }
    void next.play();
    setPlayingIdx(idx);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        relative z-10 min-h-dvh overflow-hidden
        flex flex-col items-center justify-center
        px-6 py-16 text-white
      "
    >
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-3">
          Bob’s Hotline
        </h1>
        <p className="text-zinc-300/90 max-w-xl mx-auto text-base md:text-lg">
          Tap a button—or press <span className="font-semibold">1–{messages.length}</span>—to hear an iconic line.
        </p>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-3xl">
        {messages.map((msg, i) => {
          const active = playingIdx === i;
          return (
            <motion.button
              key={i}
              whileHover={!prefersReducedMotion ? { scale: 1.025 } : undefined}
              whileTap={!prefersReducedMotion ? { scale: 0.975 } : undefined}
              onClick={() => playAudio(i)}
              aria-pressed={active}
              className={[
                'group relative h-20 rounded-2xl px-5',
                'backdrop-blur-xl transition-all',
                'border border-white/10',
                active
                  ? 'bg-white/15 shadow-[0_0_0_2px_rgba(34,211,238,0.45)_inset]'
                  : 'bg-white/8 hover:bg-white/12',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70',
                'flex items-center justify-between',
              ].join(' ')}
            >
              <span className="text-left font-medium text-sm md:text-base">
                {msg.label}
                <span className="ml-2 text-xs text-zinc-400/90">• {i + 1}</span>
              </span>

              {/* equalizer when active */}
              <div aria-hidden className="flex items-end gap-1 h-5">
                {[0, 1, 2].map((b) => (
                  <motion.span
                    key={b}
                    className={`w-1 rounded-sm ${active ? 'bg-cyan-300' : 'bg-zinc-500/50'}`}
                    initial={false}
                    animate={
                      active && !prefersReducedMotion
                        ? { scaleY: [0.6, 1, 0.7, 1.1, 0.6] }
                        : { scaleY: 0.8 }
                    }
                    transition={
                      active && !prefersReducedMotion
                        ? { repeat: Infinity, duration: 0.9 + b * 0.12, ease: 'easeInOut' }
                        : { duration: 0.2 }
                    }
                    style={{ transformOrigin: 'bottom', height: '1.25rem' }}
                  />
                ))}
              </div>

              {/* glow accent */}
              <span
                className={[
                  'pointer-events-none absolute inset-0 rounded-2xl',
                  active ? 'shadow-[0_0_60px_10px_rgba(34,211,238,0.25)]' : 'shadow-none',
                ].join(' ')}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Footer: link + feedback footer stacked */}
      <div className="mt-10 text-center">
        <a href="https://www.bobhotline.com" className="text-xs text-zinc-500 hover:underline">
          bobhotline.com
        </a>
        {/* Feedback lives right under the link */}
        <FeedbackFooter className="mt-3" />
      </div>
    </motion.div>
  );
}
