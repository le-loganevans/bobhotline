'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Phone as PhoneIcon,
  Film as FilmIcon,
  Images as ImagesIcon,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> };

const NAV: NavItem[] = [
  { href: '/',        label: 'Hotline', icon: PhoneIcon },
  { href: '/tribute', label: 'Tribute', icon: FilmIcon },
  { href: '/gallery', label: 'Gallery', icon: ImagesIcon },
];

export default function SidebarMenu() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(true); // desktop open by default
  const [mounted, setMounted] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  // Determine mobile/desktop
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      setOpen(!mobile); // close on mobile (dock visible), open on desktop
    };
    apply();
    mq.addEventListener('change', apply);
    setMounted(true);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Close mobile sheet on route change
  useEffect(() => {
    if (!mounted) return;
    if (isMobile) setOpen(false);
  }, [pathname, isMobile, mounted]);

  // ESC to close mobile sheet
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobile && open) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobile, open]);

  // Click outside sheet to close
  useEffect(() => {
    if (!isMobile || !open) return;
    const onClick = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [isMobile, open]);

  const spring = useMemo(
    () => (prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 24 }),
    [prefersReducedMotion]
  );

  const DESKTOP_WIDTH_COLLAPSED = 72;
  const DESKTOP_WIDTH_EXPANDED = 260;
  const chrome =
    'bg-neutral-900 text-white shadow-xl border border-neutral-800/60 rounded-none md:rounded-r-2xl';

  // DESKTOP SIDEBAR (unchanged behavior)
  const desktopAside = (
    <motion.aside
      aria-label="Primary"
      initial={false}
      animate={{ width: open ? DESKTOP_WIDTH_EXPANDED : DESKTOP_WIDTH_COLLAPSED }}
      transition={spring}
      className={`fixed inset-y-0 left-0 z-[100] hidden md:flex ${chrome}`}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center gap-2 px-3 py-3 border-b border-neutral-800/70">
          <button
            type="button"
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-neutral-800/70 focus:outline-none focus:ring focus:ring-cyan-500/40"
          >
            {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          {open && <span className="text-sm font-semibold tracking-wide text-neutral-200">Bob Hotline</span>}
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="space-y-1 px-2">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'group flex items-center gap-3 rounded-lg px-2 py-2 focus:outline-none focus:ring focus:ring-cyan-500/40',
                      active ? 'bg-neutral-800/80 text-white' : 'text-neutral-300 hover:bg-neutral-800/60 hover:text-white',
                    ].join(' ')}
                    aria-current={active ? 'page' : undefined}
                    title={!open ? label : undefined}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {open && <span className="text-sm">{label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.aside>
  );

  // MOBILE: persistent bottom dock
  const mobileDock = (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] md:hidden"
      role="navigation"
      aria-label="Primary bottom"
    >
      <div className={`flex items-center justify-between px-2 ${chrome} border-t rounded-t-2xl`}>
        {/* Menu toggle */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="mx-1 my-2 inline-flex items-center justify-center rounded-xl p-2 hover:bg-neutral-800/70 focus:outline-none focus:ring focus:ring-cyan-500/40"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Icon row (quick access) */}
        <ul className="flex flex-1 items-stretch justify-evenly">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'group flex flex-col items-center rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-cyan-500/40',
                    active ? 'text-white' : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60',
                  ].join(' ')}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5" />
                  <span className="mt-1 text-[11px]">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  // MOBILE: expanding sheet over the dock
  const mobileSheet = (
    <>
      {/* Backdrop */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        className="fixed inset-0 z-[95] bg-black/50 md:hidden"
        aria-hidden={!open}
      />
      {/* Sheet panel */}
      <motion.div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        initial={false}
        animate={{ y: open ? 0 : 20, opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        transition={spring}
        className={`fixed bottom-14 left-0 right-0 z-[100] md:hidden ${chrome} rounded-t-2xl`} // sits above the dock (dock is bottom:0)
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800/70">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-neutral-800/70 focus:outline-none focus:ring focus:ring-cyan-500/40"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold tracking-wide">Menu</span>
          </div>
        </div>

        <nav className="px-3 py-2">
          <ul className="space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'group flex items-center gap-3 rounded-lg px-2 py-2 focus:outline-none focus:ring focus:ring-cyan-500/40',
                      active ? 'bg-neutral-800/80 text-white' : 'text-neutral-300 hover:bg-neutral-800/60 hover:text-white',
                    ].join(' ')}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.div>
    </>
  );

  return (
    <>
      {/* Desktop left sidebar + spacer */}
      {desktopAside}
      <div
        aria-hidden
        className="hidden md:block"
        style={{ width: open ? DESKTOP_WIDTH_EXPANDED : DESKTOP_WIDTH_COLLAPSED }}
      />

      {/* Mobile bottom dock + sheet */}
      {mobileDock}
      {mobileSheet}
    </>
  );
}
