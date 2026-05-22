'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Heart, Instagram } from 'lucide-react';
import { SiteLogo } from '@/components/site-logo';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Adarsh-RD', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/adarshhhhhhrd/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:adarshdodmania@gmail.com', label: 'Email' },
    { icon: Instagram, href: 'https://www.instagram.com/_adxrshh.rd/', label: 'Instagram' },
  ];

  return (
    <footer className="relative border-t border-white/[0.04] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xs"
          >
            <div className="mb-4">
              <SiteLogo />
            </div>
            <p className="text-[#7a7589] text-xs leading-relaxed">
              B.E. CS & AI student at KLE Tech, Hubli. Building full-stack apps and agentic AI systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-[9px] uppercase tracking-[0.28em] text-[#7a7589] mb-3 font-medium">Navigation</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              {footerLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[#7a7589] hover:text-white text-xs transition-colors link-hover-effect">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.button onClick={scrollToTop} whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-lg glass hover:glass-hover transition-all duration-300 text-[#7a7589] hover:text-[#d63d4a] magnetic-element"
              title="Back to top">
              <ArrowUp size={18} />
            </motion.button>
          </motion.div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#7a7589]/60 text-[11px] flex items-center gap-1">
            © {currentYear} Adarsh R D. Built with <Heart size={10} className="text-[#d63d4a]" /> using Next.js
          </p>
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <motion.a key={social.label} href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -2 }}
                className="p-2 rounded-lg text-[#7a7589]/40 hover:text-[#7a7589] transition-colors" title={social.label}>
                <social.icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
