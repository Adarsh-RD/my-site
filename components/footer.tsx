'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';

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
  ];

  return (
    <footer className="relative border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xs"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e84855] to-[#c41e3a] flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="font-bold text-lg text-gradient-primary">darsh</span>
            </div>
            <p className="text-[#9a95a8] text-sm leading-relaxed">
              B.E. CS & AI student at KLE Tech, Hubli. Building full-stack apps and agentic AI systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#9a95a8] mb-4 font-medium">Navigation</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {footerLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[#9a95a8] hover:text-white text-sm transition-colors link-hover-effect">
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
              className="p-3 rounded-xl glass hover:glass-hover transition-all duration-300 text-[#9a95a8] hover:text-[#e84855] magnetic-element"
              title="Back to top">
              <ArrowUp size={18} />
            </motion.button>
          </motion.div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#9a95a8]/60 text-xs flex items-center gap-1">
            © {currentYear} Adarsh R D. Built with <Heart size={10} className="text-[#e84855]" /> using Next.js
          </p>
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <motion.a key={social.label} href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -2 }}
                className="p-2 rounded-lg text-[#9a95a8]/40 hover:text-[#9a95a8] transition-colors" title={social.label}>
                <social.icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
