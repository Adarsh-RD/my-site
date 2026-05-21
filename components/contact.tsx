'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const heading = useTextScramble("Let's Connect", isInView, 30);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'adarshdodmania@gmail.com', link: 'mailto:adarshdodmania@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91-6361612811', link: 'tel:+916361612811' },
    { icon: Instagram, label: 'Instagram', value: '@_adxrshh.rd', link: 'https://www.instagram.com/_adxrshh.rd/' },
    { icon: MapPin, label: 'Location', value: 'Hubli, Karnataka, India', link: '#' },
  ];

  const socials = [
    { icon: Github, href: 'https://github.com/Adarsh-RD', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/adarshhhhhhrd/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/_adxrshh.rd/', label: 'Instagram' },
  ];

  const inputClasses = (field: string) =>
    `w-full px-4 py-3.5 bg-transparent border rounded-xl text-white placeholder-[#9a95a8]/40 focus:outline-none transition-all duration-500 text-sm ${
      focusedField === field
        ? 'border-[#e84855]/50 shadow-[0_0_20px_rgba(232,72,85,0.1)]'
        : 'border-white/8 hover:border-white/15'
    }`;

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#e84855] font-medium">05</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-gradient-primary">{heading || '\u00A0'}</span>
          </h2>
          <p className="text-[#9a95a8] text-lg mt-4 max-w-xl">
            Open to internships, collaborations, and cool projects. Let&apos;s build something.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#9a95a8] text-xs font-medium mb-2 uppercase tracking-wider">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                    required className={inputClasses('name')} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-[#9a95a8] text-xs font-medium mb-2 uppercase tracking-wider">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    required className={inputClasses('email')} placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-[#9a95a8] text-xs font-medium mb-2 uppercase tracking-wider">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                  onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)}
                  required className={inputClasses('subject')} placeholder="Project discussion" />
              </div>
              <div>
                <label className="block text-[#9a95a8] text-xs font-medium mb-2 uppercase tracking-wider">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange}
                  onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                  required rows={5} className={`${inputClasses('message')} resize-none`}
                  placeholder="Tell me about your project..." />
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                className="group w-full py-4 bg-gradient-to-r from-[#e84855] to-[#c41e3a] text-white rounded-xl font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2 glow-red hover:glow-red-intense transition-all duration-500 magnetic-element">
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Send Message
              </motion.button>
              {submitted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center py-3 rounded-xl glass text-sm text-emerald-400">
                  ✓ Message sent successfully!
                </motion.div>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                target={info.link.startsWith('http') ? '_blank' : undefined}
                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-5 rounded-xl glass hover:glass-hover transition-all duration-500 group"
              >
                <div className="p-2.5 rounded-lg bg-[#e84855]/10 text-[#e84855] group-hover:bg-[#e84855]/20 transition-colors">
                  <info.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#9a95a8] text-[10px] uppercase tracking-wider mb-0.5">{info.label}</p>
                  <p className="text-white text-sm font-medium truncate">{info.value}</p>
                </div>
              </motion.a>
            ))}

            <div className="pt-8 border-t border-white/5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a95a8] mb-4">Connect</p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl glass hover:glass-hover text-[#9a95a8] hover:text-white transition-all duration-300 magnetic-element">
                    <social.icon size={18} />
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
