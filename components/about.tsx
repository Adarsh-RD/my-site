'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Zap, Brain, Layers } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const heading = useTextScramble('About Me', isInView, 35);

  const features = [
    { icon: Code2, title: 'Full Stack Dev', desc: 'React, Node.js, PostgreSQL' },
    { icon: Brain, title: 'AI / ML', desc: 'Agentic systems, NLP, Ollama' },
    { icon: Zap, title: 'Fast Learner', desc: 'Hackathon winner & builder' },
    { icon: Layers, title: 'DevOps', desc: 'Docker, AWS, CI/CD' },
  ];

  const stats = [
    { value: '8.45', label: 'CGPA at KLE Tech' },
    { value: '96.4%', label: 'Class XII Score' },
    { value: '3+', label: 'Deployed Projects' },
  ];

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
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
            <span className="text-xs uppercase tracking-[0.3em] text-[#e84855] font-medium">01</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-gradient-primary">{heading || '\u00A0'}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <p className="text-[#9a95a8] text-lg leading-relaxed">
              I&apos;m Adarsh R D, a B.E. Computer Science & AI student at KLE Technological University, Hubli. I&apos;m passionate about building real-world software — from full-stack web apps to agentic AI systems that reason and act autonomously.
            </p>

            <p className="text-[#9a95a8] text-lg leading-relaxed">
              At Infosys, I built real-time anomaly detection pipelines with Apache Kafka, optimized BigQuery SQL queries cutting report times from 12s to 3.8s, and shipped a feature flag microservice with zero downtime — all in a cross-functional team of 8 engineers.
            </p>

            <p className="text-[#9a95a8] text-lg leading-relaxed">
              I&apos;ve been selected for Smart India Hackathon 2025, was runner-up at IgniTrix 2026 (state-level), and have an IEEE research paper on AI-based video restoration using U-Net. When I&apos;m not coding, I&apos;m building drones at the AeroKLE Club.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group glass p-5 rounded-xl hover:glass-hover transition-all duration-500 shimmer"
                >
                  <feature.icon className="w-5 h-5 text-[#e84855] mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-medium text-sm mb-1">{feature.title}</p>
                  <p className="text-[#9a95a8] text-xs">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="glass p-8 rounded-2xl hover:glass-hover transition-all duration-500 breathing-glow relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#e84855]/5 rounded-full blur-2xl" />
                <h3 className="text-5xl md:text-6xl font-bold text-gradient-primary mb-2 relative z-10">
                  {stat.value}
                </h3>
                <p className="text-[#9a95a8] text-sm tracking-wide relative z-10">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
