'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Zap, Brain, Layers } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';
import { SectionHeader } from '@/components/section-header';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const heading = useTextScramble('About Me', isInView, 35);

  const features = [
    { icon: Brain, title: 'Curious by nature', desc: 'Always picking up new ideas and tools' },
    { icon: Code2, title: 'Ship-first mindset', desc: 'Ideas matter when they work in the real world' },
    { icon: Zap, title: 'Team player', desc: 'Hackathons, clubs, and builds with friends' },
    { icon: Layers, title: 'Beyond code', desc: 'Drones at AeroKLE, movies, campus life' },
  ];

  const stats = [
    { value: '8.45', label: 'CGPA at KLE Tech' },
    { value: '94.4%', label: 'Class XII (KSEAB)' },
    { value: '95.68%', label: 'Class X (KSEAB)' },
    { value: '5+', label: 'Deployed Projects' },
  ];

  return (
    <section id="about" className="section-pad relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="01"
          title={heading || 'About Me'}
          subtitle="Who I am — not just what I've built"
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 space-y-4"
          >
            <p className="body-text">
              I&apos;m Adarsh R D — a B.E. Computer Science & AI student at KLE Technological University, Hubli. I&apos;m the kind of person who gets hooked on a problem and won&apos;t stop until something real ships: a web app classmates can use, an AI tool that actually saves time, or a weekend hackathon idea that turns into a live project.
            </p>

            <p className="body-text">
              I love the full build cycle — sketching UI, wiring backends, breaking things, fixing them, and learning something new every sprint. I pick up fast, work well in teams, and I&apos;m happiest when code leaves my laptop and helps someone. The tech stack changes; the habit of building doesn&apos;t.
            </p>

            <p className="body-text">
              Competitions and campus life keep me grounded — Smart India Hackathon 2025, runner-up at IgniTrix 2026, research on AI video restoration, and drone builds with AeroKLE when I need a break from the editor. If you&apos;re looking for someone curious, reliable, and genuinely excited to build — I&apos;d love to connect.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group card-box hover:glass-hover transition-all duration-500"
                >
                  <feature.icon className="w-4 h-4 text-[#d63d4a] mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-white/95 font-medium text-xs sm:text-sm mb-0.5">{feature.title}</p>
                  <p className="text-[#7a7589] text-[11px] leading-snug">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-3"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="card-box hover:glass-hover transition-all duration-500 relative overflow-hidden"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-1 relative z-10">
                  {stat.value}
                </h3>
                <p className="text-[#7a7589] text-xs tracking-wide relative z-10">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
