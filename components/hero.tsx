'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Sparkles, Phone } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';

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
      className="min-h-screen relative overflow-hidden flex items-center justify-center pt-32 pb-16"
      ref={containerRef}
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: yParallax }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#e84855]/10 morph-blob blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#c41e3a]/8 morph-blob blur-3xl"
          aria-hidden
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e84855]/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        style={{ opacity: opacityFade }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-[#9a95a8] tracking-widest uppercase">
            <Sparkles size={14} className="text-[#e84855]" />
            B.E. in Computer Science & Artificial Intelligence
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-10 relative group"
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

          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#e84855]/30">
            <div className="w-full h-full bg-gradient-to-br from-[#1a1520] to-[#0d0b12] flex items-center justify-center">
              <span className="text-5xl font-bold text-gradient-primary">AD</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
            <span className="text-gradient-primary">{nameText || '\u00A0'}</span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-10">
          <p className="text-lg md:text-xl text-[#9a95a8] font-light tracking-wide max-w-xl">
            Building <span className="text-white font-medium">full-stack applications</span> &
            <span className="text-white font-medium"> agentic AI systems</span> at KLE Tech, Hubli
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            { value: '8.45', label: 'CGPA' },
            { value: '3+', label: 'Projects' },
            { value: 'SIH \'25', label: 'Selected' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-primary">{stat.value}</div>
              <div className="text-xs text-[#9a95a8] uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center gap-3 mb-16">
          {[
            { icon: Github, href: 'https://github.com/Adarsh-RD', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/adarshhhhhhrd/', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:adarshdodmania@gmail.com', label: 'Email' },
            { icon: Phone, href: 'tel:+916361612811', label: 'Phone' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl glass hover:glass-hover transition-all duration-300 text-[#9a95a8] hover:text-[#e84855] magnetic-element"
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9a95a8]/50">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown size={16} className="text-[#e84855]/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
