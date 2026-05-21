'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface SiteLogoProps {
  className?: string;
}

export function SiteLogo({ className = '' }: SiteLogoProps) {
  return (
    <Link
      href="#home"
      className={`group flex items-center gap-3 outline-none ${className}`}
      aria-label="Adarsh R D — Home"
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="relative shrink-0"
      >
        <div className="absolute -inset-1 rounded-2xl bg-[#e84855]/20 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#0d0b12] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#e84855] via-[#ff6b6b] to-[#8b2835]">
            <span className="font-mono text-[11px] font-bold tracking-tighter text-white leading-none">AR</span>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-[#060408] bg-emerald-400" />
        </div>
      </motion.div>

      <div className="flex flex-col leading-none min-w-0">
        <span className="flex items-baseline gap-0.5 text-sm sm:text-[15px] font-semibold tracking-tight">
          <span className="text-white transition-colors group-hover:text-[#f0eef5]">Adarsh</span>
          <span className="text-gradient-primary font-bold">.</span>
          <span className="text-[#9a95a8] text-xs sm:text-sm font-medium ml-0.5">RD</span>
        </span>
        <span className="hidden sm:block text-[9px] uppercase tracking-[0.22em] text-[#9a95a8]/55 mt-1.5 font-medium">
          CS & AI · Portfolio
        </span>
      </div>
    </Link>
  );
}
