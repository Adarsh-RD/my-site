'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';
import { SectionHeader } from '@/components/section-header';
import { PhoneContactModal } from '@/components/phone-contact-modal';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  MAILTO_LINK,
  openMailClient,
  submitContactForm,
} from '@/lib/contact';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const heading = useTextScramble("Let's Connect", isInView, 30);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormError('');

    try {
      await submitContactForm(formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (err) {
      setFormStatus('error');
      const message = err instanceof Error ? err.message : 'Could not send right now.';
      setFormError(
        message.includes('RESEND_API_KEY')
          ? 'Email service is not set up on the server yet. Use the button below to email directly.'
          : `${message} Or email me at ${CONTACT_EMAIL}.`,
      );
    }
  };

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
      value: CONTACT_PHONE_DISPLAY,
      action: 'phone' as const,
      link: '#',
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

  const inputClasses = (field: string) =>
    `w-full px-3.5 py-2.5 bg-transparent border rounded-lg text-white/95 placeholder-[#7a7589]/50 focus:outline-none transition-all duration-500 text-sm ${
      focusedField === field
        ? 'border-[#d63d4a]/45 shadow-[0_0_16px_rgba(214,61,74,0.08)]'
        : 'border-white/[0.06] hover:border-white/12'
    }`;

  return (
    <section id="contact" className="section-pad relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="05"
          title={heading || "Let's Connect"}
          subtitle="Open to internships, collaborations, and cool projects. Let's build something."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 relative z-20"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7a7589] text-[10px] font-medium mb-1.5 uppercase tracking-wider">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                    required className={inputClasses('name')} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-[#7a7589] text-[10px] font-medium mb-1.5 uppercase tracking-wider">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    required className={inputClasses('email')} placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-[#7a7589] text-[10px] font-medium mb-1.5 uppercase tracking-wider">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                  onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)}
                  required className={inputClasses('subject')} placeholder="Project discussion" />
              </div>
              <div>
                <label className="block text-[#7a7589] text-[10px] font-medium mb-1.5 uppercase tracking-wider">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange}
                  onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                  required rows={4} className={`${inputClasses('message')} resize-none`}
                  placeholder="Tell me about your project..." />
              </div>
              <motion.button
                whileHover={formStatus !== 'sending' ? { scale: 1.02 } : undefined}
                whileTap={formStatus !== 'sending' ? { scale: 0.98 } : undefined}
                type="submit"
                disabled={formStatus === 'sending'}
                className="group w-full py-3 bg-gradient-to-r from-[#d63d4a] to-[#a8323f] text-white rounded-lg font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 glow-red hover:glow-red-intense transition-all duration-500 magnetic-element disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send
                  size={16}
                  className={`transition-transform ${formStatus === 'sending' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`}
                />
                {formStatus === 'sending' ? 'Sending…' : 'Send Message'}
              </motion.button>
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-3 rounded-xl glass text-sm text-emerald-400"
                >
                  ✓ Message sent — check your inbox for my reply.
                </motion.div>
              )}
              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-3 rounded-xl glass text-sm text-[#d63d4a]"
                >
                  {formError}{' '}
                  <button
                    type="button"
                    onClick={openMailClient}
                    className="underline hover:text-white transition-colors"
                  >
                    Open email
                  </button>
                </motion.div>
              )}
            </form>
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

              if (info.action === 'phone') {
                return (
                  <motion.button
                    key={info.label}
                    type="button"
                    onClick={() => setPhoneOpen(true)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className={className}
                  >
                    {inner}
                  </motion.button>
                );
              }

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
                  onClick={info.link === '#' ? (e) => e.preventDefault() : undefined}
                >
                  {inner}
                </motion.a>
              );
            })}

            <PhoneContactModal open={phoneOpen} onClose={() => setPhoneOpen(false)} />

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
