'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="section-head"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="section-line" />
        <span className="section-eyebrow">{number}</span>
      </div>
      <h2 className="section-title">
        <span className="text-gradient-primary">{title}</span>
      </h2>
      {subtitle && <p className="section-desc">{subtitle}</p>}
    </motion.div>
  );
}
