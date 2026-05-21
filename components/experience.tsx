'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Trophy } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const heading = useTextScramble('Experience', isInView, 30);

  const experiences = [
    {
      title: 'Project Intern',
      company: 'Infosys',
      location: 'Hubli, India',
      period: 'Aug 2025 — Jan 2026',
      bullets: [
        'Built a Cross-System Identity Resolution Engine for the Infosys SoW — securely linking Aadhaar, ABHA, DigiLocker, and mobile identities with privacy-preserving record linkage (no raw IDs stored or shared).',
        'Implemented HMAC-SHA256 hashing with per-identity salts, blinded O(1) indexing, and Pedersen-style zero-knowledge proofs so authorized apps can verify same-person linkages without exposing underlying identifiers.',
        'Shipped REST APIs for link, verify, unlink, and consent management with JWT auth, policy-based access controls, and tamper-evident hash-chain audit trails; delivered the reference app and technical white-paper.',
      ],
      technologies: ['Node.js', 'Express', 'MongoDB', 'Cryptography', 'REST APIs'],
    },
  ];

  const education = [
    {
      degree: 'B.E. in Computer Science & Artificial Intelligence',
      school: 'KLE Technological University, Hubli',
      year: '2023 — 2027',
      details: 'CGPA: 8.45 / 10.0',
      coursework: 'DSA, OS, DBMS, ML, Generative AI, Computer Networks, Software Engineering',
    },
    {
      degree: 'Class XII (KSEAB) — 96.4%',
      school: 'SMT S S Pattepur PU College, Ramdurg',
      year: '2021 — 2023',
      details: 'State Board Examination',
    },
    {
      degree: 'Class X (KSEAB) — 96.4%',
      school: 'GOVT Adarsha Vidyalaya RMSA, Katkol',
      year: '2016 — 2021',
      details: 'State Board Examination',
    },
  ];

  const achievements = [
    { title: 'Runner-up, IgniTrix 2026', desc: 'State-level hackathon', icon: '🏆' },
    { title: 'Selected, Smart India Hackathon 2025', desc: 'Inter-college level', icon: '🎯' },
    { title: 'IEEE Research Paper', desc: 'AI-based video restoration using U-Net', icon: '📄' },
    { title: 'Oracle Cloud Infrastructure 2025', desc: 'Certified Generative AI Professional', icon: '☁️' },
    { title: 'Juniper Networks JNCIA', desc: 'Certified Associate', icon: '🌐' },
    { title: 'AeroKLE Club', desc: 'Designed & built drones and model aircraft', icon: '🛩️' },
  ];

  return (
    <section id="experience" className="py-32 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
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
            <span className="text-xs uppercase tracking-[0.3em] text-[#e84855] font-medium">04</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-gradient-primary">{heading || '\u00A0'}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Work + Education */}
          <div className="lg:col-span-3">
            {/* Work */}
            <div className="flex items-center gap-2 mb-10">
              <Briefcase className="w-4 h-4 text-[#e84855]" />
              <h3 className="text-sm uppercase tracking-[0.2em] text-[#9a95a8] font-medium">Work</h3>
            </div>

            <div className="relative mb-16">
              <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-[#e84855]/40 via-[#e84855]/20 to-transparent" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative pl-8 group"
                >
                  <motion.div
                    whileInView={{ scale: [0, 1.4, 1] }}
                    viewport={{ once: true }}
                    className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-[#e84855] bg-[#060408] z-10"
                  >
                    <div className="absolute inset-1 rounded-full bg-[#e84855] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  <div className="glass p-6 rounded-xl hover:glass-hover transition-all duration-500 group-hover:translate-x-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <h4 className="text-lg font-semibold text-white">{exp.title}</h4>
                      <span className="text-xs font-mono text-[#e84855] tracking-wider">{exp.period}</span>
                    </div>
                    <p className="text-[#9a95a8] text-sm mb-4">{exp.company} — {exp.location}</p>
                    
                    <ul className="space-y-2 mb-4">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="text-[#9a95a8]/80 text-sm leading-relaxed flex gap-2">
                          <span className="text-[#e84855] mt-1 shrink-0">▸</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#e84855]/8 text-[#e84855]/80 border border-[#e84855]/15">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div className="flex items-center gap-2 mb-10">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm uppercase tracking-[0.2em] text-[#9a95a8] font-medium">Education</h3>
            </div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -2 }}
                  className="glass p-6 rounded-xl hover:glass-hover transition-all duration-500"
                >
                  <h4 className="text-sm font-semibold text-white mb-2 leading-snug">{edu.degree}</h4>
                  <p className="text-[#9a95a8] text-xs mb-1">{edu.school}</p>
                  <p className="text-[#9a95a8]/70 text-xs">{edu.details}</p>
                  {edu.coursework && (
                    <p className="text-[#9a95a8]/50 text-xs mt-2 italic">Coursework: {edu.coursework}</p>
                  )}
                  <span className="inline-block mt-3 text-[10px] font-mono text-purple-400 tracking-wider">{edu.year}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements & Certifications */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-10">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm uppercase tracking-[0.2em] text-[#9a95a8] font-medium">Achievements & Certs</h3>
            </div>

            <div className="space-y-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="glass p-5 rounded-xl hover:glass-hover transition-all duration-500 group flex items-start gap-4"
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-white text-sm font-medium mb-0.5">{item.title}</p>
                    <p className="text-[#9a95a8] text-xs">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
