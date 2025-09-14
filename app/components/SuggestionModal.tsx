"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SuggestionModalRef {
  open: () => void;
}

type Status = "idle" | "sending" | "sent" | "error";
const MAX_CHARS = 600;

const SuggestionModal = forwardRef<SuggestionModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", suggestion: "", honey: "" });
  const openerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      openerRef.current = (document.activeElement as HTMLElement) ?? null;
      setIsOpen(true);
    },
  }));

  const remaining = useMemo(
    () => Math.max(0, MAX_CHARS - form.suggestion.length),
    [form.suggestion]
  );

  const closeModal = () => {
    setIsOpen(false);
    setStatus("idle");
    setForm({ name: "", email: "", suggestion: "", honey: "" });
    requestAnimationFrame(() => openerRef.current?.focus?.());
  };

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Autofocus & focus trap
  useEffect(() => {
    if (!isOpen) return;
    firstFieldRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusables).filter((el) => !el.hasAttribute("aria-hidden"));
        if (list.length === 0) return;

        const first = list[0];
        const last = list[list.length - 1];
        const active = document.activeElement as HTMLElement;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const onBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honey) return; // bot honeypot
    if (!form.name.trim() || !form.email.trim() || !form.suggestion.trim()) return;
    if (form.suggestion.length > MAX_CHARS) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          suggestion: form.suggestion.trim(),
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      const t = setTimeout(closeModal, 2200);
      return () => clearTimeout(t);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70"
          onMouseDown={onBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="suggestion-title"
            aria-describedby="suggestion-desc"
            ref={dialogRef}
            className="
              relative w-[92%] max-w-lg
              /* ↓ cap height so it fits phones; allow inner scroll */
              max-h-[min(92vh,560px)] md:max-h-[80vh]
              rounded-3xl border border-white/10
              bg-gradient-to-b from-white/10 to-white/[0.06]
              backdrop-blur-2xl
              shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]
              text-white
              overflow-hidden
            "
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            {/* Glow border accent */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-zinc-200 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
              aria-label="Close dialog"
            >
              ✕
            </button>

            {/* Content uses a 3-row grid: header / scrollable body / sticky actions */}
            {status !== "sent" ? (
              <form
                onSubmit={handleSubmit}
                className="
                  grid grid-rows-[auto_1fr_auto]
                  /* tighter padding on mobile */
                  p-4 sm:p-6 md:p-8
                  gap-4
                  h-full
                  overscroll-contain
                "
              >
                {/* Header */}
                <div className="text-center">
                  <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] sm:text-[11px] uppercase tracking-wide text-zinc-300/90">
                    <span className="inline-block size-2 rounded-full bg-cyan-300" />
                    Feedback
                  </div>
                  <h2 id="suggestion-title" className="mt-2 text-xl sm:text-2xl font-extrabold tracking-tight">
                    Tell us what you think
                  </h2>
                  <p id="suggestion-desc" className="mt-1 text-[13px] sm:text-sm text-zinc-300/90">
                    We read every message. Ideas, bugs, or nice words—anything helps.
                  </p>
                </div>

                {/* Scrollable body */}
                <div className="min-h-0 overflow-y-auto pr-1">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honey"
                    value={form.honey}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <label className="group block">
                      <span className="mb-1 block text-xs text-zinc-300/90">Name</span>
                      <input
                        ref={firstFieldRef}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        required
                        className="
                          w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2
                          text-[15px] text-white placeholder:text-zinc-400
                          outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30
                        "
                      />
                    </label>

                    <label className="group block">
                      <span className="mb-1 block text-xs text-zinc-300/90">Email</span>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="bob@bobhotlines.com"
                        required
                        className="
                          w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2
                          text-[15px] text-white placeholder:text-zinc-400
                          outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30
                        "
                      />
                      <span className="mt-1 block text-[11px] text-zinc-400">
                        We only use this to follow up if needed.
                      </span>
                    </label>

                    <label className="group block">
                      <span className="mb-1 block text-xs text-zinc-300/90">Suggestion</span>
                      <div
                        className="
                          relative rounded-xl border border-white/10 bg-white/10
                          focus-within:border-cyan-400/60 focus-within:ring-2 focus-within:ring-cyan-400/30
                        "
                      >
                        <textarea
                          name="suggestion"
                          value={form.suggestion}
                          onChange={handleChange}
                          placeholder="What should we add, improve, or fix?"
                          required
                          maxLength={MAX_CHARS}
                          className="
                            w-full resize-none rounded-xl bg-transparent px-3 py-2.5
                            text-[15px] text-white placeholder:text-zinc-400
                            outline-none
                            /* ↓ shorter on phones */
                            h-24 sm:h-32
                          "
                        />
                        <div className="pointer-events-none absolute bottom-2 right-2 text-[11px] text-zinc-400">
                          {remaining}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Sticky actions */}
                <div
                  className="
                    mt-2 sm:mt-3 flex items-center justify-between gap-3
                    sticky bottom-0
                    bg-gradient-to-t from-black/30 to-transparent
                    pt-3
                    /* iOS safe area */
                    pb-[max(0.25rem,env(safe-area-inset-bottom))]
                  "
                >
                  <button
                    type="button"
                    onClick={closeModal}
                    className="
                      inline-flex items-center justify-center rounded-xl
                      border border-white/10 bg-white/10 px-4 py-2.5
                      text-sm text-zinc-200 hover:bg-white/15
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={status === "sending" || form.suggestion.length === 0}
                    className="
                      inline-flex items-center justify-center rounded-xl
                      border border-cyan-400/40 bg-cyan-400/15 px-4 py-2.5
                      text-sm font-medium text-cyan-200
                      hover:bg-cyan-400/20 hover:border-cyan-300/50
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60
                      disabled:opacity-60 disabled:cursor-not-allowed
                    "
                  >
                    {status === "sending" ? (
                      <>
                        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
                        Sending…
                      </>
                    ) : (
                      "Send feedback"
                    )}
                  </button>
                </div>

                {status === "error" && (
                  <p className="mt-2 text-sm text-red-400">❌ Something went wrong. Please try again.</p>
                )}
              </form>
            ) : (
              <div className="p-6 sm:p-8 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/20 ring-1 ring-emerald-300/30">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Thanks for the suggestion!</h3>
                <p className="mt-1 text-sm text-zinc-300/90">
                  We’ve received it. This window will close shortly.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-zinc-200 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                >
                  Close now
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

SuggestionModal.displayName = "SuggestionModal";
export default SuggestionModal;
