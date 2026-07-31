'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Sparkles, Instagram, Rocket, FileText, Award, Phone } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';
import { openMailClient, MAILTO_LINK } from '@/lib/contact';
import Image from 'next/image';
import profileImage from '@/images/Firefly.jpg';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const nameText = useTextScramble('Adarsh R D', inView, 30);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="home"
      className="min-h-[88vh] sm:min-h-screen relative overflow-hidden flex items-center justify-center pt-20 sm:pt-24 md:pt-28 pb-10 md:pb-14"
      ref={containerRef}
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: yParallax }}
          className="absolute -top-20 -right-20 md:-top-32 md:-right-32 w-[220px] h-[220px] md:w-[500px] md:h-[500px] bg-[#e84855]/8 md:bg-[#e84855]/10 morph-blob blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          className="absolute -bottom-20 -left-20 md:-bottom-32 md:-left-32 w-[180px] h-[180px] md:w-[400px] md:h-[400px] bg-[#c41e3a]/6 md:bg-[#c41e3a]/8 morph-blob blur-3xl"
          aria-hidden
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[600px] md:h-[600px] bg-[#e84855]/4 md:bg-[#e84855]/5 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <motion.div
        style={{ opacity: opacityFade }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center"
      >
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[9px] sm:text-[10px] font-medium text-[#7a7589] tracking-wider uppercase max-w-[90vw] text-center">
            <Sparkles size={12} className="text-[#d63d4a]" />
            Full-Stack Developer & AI Engineer
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-8 md:mb-10 relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] animate-[spin_20s_linear_infinite]" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="58" fill="none" stroke="url(#ringGrad)" strokeWidth="0.5" strokeDasharray="8 6" />
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e84855" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#e84855" stopOpacity="0" />
                <stop offset="100%" stopColor="#e84855" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 rounded-full" style={{ animation: 'pulseRing 3s ease-out infinite' }}>
            <div className="w-full h-full rounded-full border border-[#e84855]/20" />
          </div>

          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#e84855]/30">
            <Image
              src={profileImage}
              alt="Adarsh R D"
              fill
              className="object-cover object-center scale-[1.12]"
              sizes="128px"
              priority
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-2">
            <span className="text-gradient-primary">{nameText || '\u00A0'}</span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-sm sm:text-base md:text-lg text-[#7a7589] font-light tracking-wide max-w-lg px-2 leading-relaxed">
            Crafting <span className="text-white font-medium">full-stack applications</span> &
            <span className="text-white font-medium"> agentic AI systems</span> that deliver results
          </p>
        </motion.div>

        {/* Stats — compact pills on mobile, glass cards on sm+ */}
        <motion.div variants={itemVariants} className="mb-10 px-2">
          {/* Mobile: compact inline row */}
          <div className="flex sm:hidden items-center justify-center gap-1">
            {[
              { value: '5+', label: 'Projects', color: '#e84855' },
              { value: '1', label: 'IEEE Paper', color: '#a855f7' },
              { value: '3+', label: 'Certs', color: '#38bdf8' },
            ].map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-1">
                {index > 0 && (
                  <span className="text-[#7a7589]/30 mx-1.5">·</span>
                )}
                <span
                  className="text-base font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] text-[#7a7589] uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop: glass cards with icons */}
          <div className="hidden sm:flex flex-wrap justify-center gap-4">
            {[
              { value: '5+', label: 'Deployed Projects', icon: Rocket, color: '#e84855' },
              { value: '1', label: 'IEEE Research Paper', icon: FileText, color: '#a855f7' },
              { value: '3+', label: 'Industry Certs', icon: Award, color: '#38bdf8' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative flex items-center gap-3 px-5 py-3.5 rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(10, 8, 16, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Glow border on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}15, transparent 60%)`,
                    border: `1px solid ${stat.color}35`,
                    borderRadius: 'inherit',
                  }}
                />

                {/* Icon */}
                <div
                  className="relative z-10 flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300"
                  style={{
                    background: `${stat.color}12`,
                    border: `1px solid ${stat.color}20`,
                  }}
                >
                  <stat.icon
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                    style={{ color: stat.color }}
                  />
                </div>

                {/* Text */}
                <div className="relative z-10 text-left">
                  <div
                    className="text-2xl font-bold tracking-tight"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-[#7a7589] uppercase tracking-widest leading-tight">
                    {stat.label}
                  </div>
                </div>

                {/* Corner glow */}
                <div
                  className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: stat.color }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative z-20 flex flex-wrap justify-center gap-2.5 mb-10 md:mb-12 px-2">
          {[
            { icon: Github, href: 'https://github.com/Adarsh-RD', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/adarshhhhhhrd/', label: 'LinkedIn' },
            { icon: Instagram, href: 'https://www.instagram.com/_adxrshh.rd/', label: 'Instagram' },
            { icon: Phone, href: 'tel:+916361612811', label: 'Call' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ y: -5, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="group relative z-20 p-3 rounded-xl bg-[#e84855]/10 border border-[#e84855]/25 hover:bg-[#e84855]/20 hover:border-[#e84855]/50 transition-all duration-300 cursor-pointer"
              style={{ boxShadow: '0 0 12px rgba(232,72,85,0.08)' }}
              aria-label={social.label}
            >
              <social.icon size={19} className="text-[#e84855] group-hover:text-white transition-colors duration-300 relative z-10" />
            </motion.a>
          ))}

          <motion.a
            href={MAILTO_LINK}
            onClick={(e) => {
              e.preventDefault();
              openMailClient();
            }}
            whileHover={{ y: -5, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="group relative z-20 p-3 rounded-xl bg-[#e84855]/10 border border-[#e84855]/25 hover:bg-[#e84855]/20 hover:border-[#e84855]/50 transition-all duration-300 cursor-pointer"
            style={{ boxShadow: '0 0 12px rgba(232,72,85,0.08)' }}
            aria-label="Email Adarsh"
          >
            <Mail size={19} className="text-[#e84855] group-hover:text-white transition-colors duration-300 relative z-10" />
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#7a7589]/50">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown size={14} className="text-[#d63d4a]/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
