'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Copy, Check } from 'lucide-react';
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_RAW, openPhoneDialer } from '@/lib/contact';

interface PhoneContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function PhoneContactModal({ open, onClose }: PhoneContactModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_PHONE_RAW);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close phone dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="phone-modal-title"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="fixed left-1/2 top-1/2 z-[201] w-[min(calc(100%-2rem),22rem)] -translate-x-1/2 -translate-y-1/2 glass premium-shadow-lg rounded-2xl p-6 border border-[#e84855]/25 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#e84855]/15 text-[#e84855]">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#9a95a8]">Contact</p>
                  <h3 id="phone-modal-title" className="text-white font-semibold text-lg">
                    Phone
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg glass hover:glass-hover text-[#9a95a8] hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-3xl font-bold text-gradient-primary tracking-wide mb-2 tabular-nums">
              {CONTACT_PHONE_DISPLAY}
            </p>
            <p className="text-[#9a95a8] text-sm mb-6">Tap call on mobile, or copy the number.</p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  openPhoneDialer();
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e84855] to-[#c41e3a] text-white text-sm font-medium uppercase tracking-wider glow-red hover:glow-red-intense transition-all cursor-pointer"
              >
                Call now
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-3.5 rounded-xl glass hover:glass-hover text-white text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy number'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
