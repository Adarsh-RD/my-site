'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Instagram, Phone } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';
import { SectionHeader } from '@/components/section-header';
import {
  CONTACT_EMAIL,
  MAILTO_LINK,
  openMailClient,
} from '@/lib/contact';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const heading = useTextScramble("Let's Connect", isInView, 30);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT_EMAIL,
      action: 'mail' as const,
      link: MAILTO_LINK,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 6361612811',
      action: 'link' as const,
      link: 'tel:+916361612811',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@_adxrshh.rd',
      action: 'link' as const,
      link: 'https://www.instagram.com/_adxrshh.rd/',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Hubli, Karnataka, India',
      action: 'link' as const,
      link: '#',
    },
  ];

  const socials = [
    { icon: Github, href: 'https://github.com/Adarsh-RD', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/adarshhhhhhrd/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/_adxrshh.rd/', label: 'Instagram' },
  ];

  return (
    <section id="contact" className="section-pad relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="05"
          title={heading || "Let's Connect"}
          subtitle="Open to collaborations, freelance, and exciting projects. Let's build something."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 relative z-20 flex flex-col justify-center items-start space-y-6 card-box p-8 lg:p-12 rounded-2xl"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white/95">Got a project in mind?</h3>
              <p className="text-[#7a7589] text-sm leading-relaxed max-w-md">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. Skip the forms and send me an email directly.
              </p>
            </div>
            
            <motion.a
              href={MAILTO_LINK}
              onClick={(e) => {
                e.preventDefault();
                openMailClient();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex py-3.5 px-8 bg-gradient-to-r from-[#d63d4a] to-[#a8323f] text-white rounded-lg font-medium text-xs tracking-wider uppercase items-center justify-center gap-2 glow-red hover:glow-red-intense transition-all duration-500 magnetic-element"
            >
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Direct Email
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-3"
          >
            {contactInfo.map((info, index) => {
              const className =
                'flex items-center gap-3 p-3.5 rounded-xl card-box hover:glass-hover transition-all duration-500 group w-full text-left cursor-pointer';

              const inner = (
                <>
                  <div className="p-2 rounded-lg bg-[#d63d4a]/10 text-[#d63d4a] group-hover:bg-[#d63d4a]/18 transition-colors">
                    <info.icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#7a7589] text-[9px] uppercase tracking-wider mb-0.5">{info.label}</p>
                    <p className="text-white/95 text-xs font-medium truncate">{info.value}</p>
                  </div>
                </>
              );

              if (info.action === 'mail') {
                return (
                  <motion.a
                    key={info.label}
                    href={info.link}
                    onClick={(e) => {
                      e.preventDefault();
                      openMailClient();
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className={className}
                  >
                    {inner}
                  </motion.a>
                );
              }

              return (
                <motion.a
                  key={info.label}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className={className}
                  onClick={(e) => {
                    if (info.link === '#') e.preventDefault();
                    if (info.label === 'Phone') {
                      navigator.clipboard.writeText('+916361612811');
                      alert('Phone number copied to clipboard: +91 6361612811');
                    }
                  }}
                >
                  {inner}
                </motion.a>
              );
            })}

            <div className="pt-5 border-t border-white/[0.04]">
              <p className="text-[9px] uppercase tracking-[0.28em] text-[#7a7589] mb-3">Connect</p>
              <div className="flex gap-2">
                {socials.map((social) => (
                  <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-lg glass hover:glass-hover text-[#7a7589] hover:text-white transition-all duration-300 magnetic-element">
                    <social.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
