'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Medal,
  Target,
  FileText,
  Cloud,
  Network,
  Plane,
  type LucideIcon,
} from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';
import { SectionHeader } from '@/components/section-header';

type AchievementCategory = 'hackathon' | 'research' | 'certification' | 'club';

interface Achievement {
  title: string;
  desc: string;
  icon: LucideIcon;
  category: AchievementCategory;
  year: string;
  featured?: boolean;
}

const categoryStyles: Record<
  AchievementCategory,
  { label: string; accent: string; border: string; bg: string }
> = {
  hackathon: {
    label: 'Hackathon',
    accent: 'text-[#e84855]',
    border: 'border-[#e84855]/25',
    bg: 'bg-[#e84855]/10',
  },
  research: {
    label: 'Research',
    accent: 'text-purple-400',
    border: 'border-purple-400/25',
    bg: 'bg-purple-400/10',
  },
  certification: {
    label: 'Certification',
    accent: 'text-amber-400',
    border: 'border-amber-400/25',
    bg: 'bg-amber-400/10',
  },
  club: {
    label: 'Extracurricular',
    accent: 'text-sky-400',
    border: 'border-sky-400/25',
    bg: 'bg-sky-400/10',
  },
};

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
      degree: 'Class XII (KSEAB) — 94.4%',
      school: 'SMT S S Pattepur PU College, Ramdurg',
      year: '2021 — 2023',
      details: 'State Board Examination',
    },
    {
      degree: 'Class X (KSEAB) — 95.68%',
      school: 'GOVT Adarsha Vidyalaya RMSA, Katkol',
      year: '2016 — 2021',
      details: 'State Board Examination',
    },
  ];

  const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null);

  const achievements: Achievement[] = [
    {
      title: 'Runner-up, IgniTrix 2026',
      desc: 'State-level hackathon',
      icon: Medal,
      category: 'hackathon',
      year: '2026',
      featured: true,
    },
    {
      title: 'Smart India Hackathon 2025',
      desc: 'Selected at inter-college level',
      icon: Target,
      category: 'hackathon',
      year: '2025',
    },
    {
      title: 'IEEE Research Paper',
      desc: 'AI-based video restoration using U-Net',
      icon: FileText,
      category: 'research',
      year: '2025',
    },
    {
      title: 'Oracle Cloud Infrastructure',
      desc: 'Certified Generative AI Professional',
      icon: Cloud,
      category: 'certification',
      year: '2025',
    },
    {
      title: 'Juniper Networks JNCIA',
      desc: 'Certified Associate',
      icon: Network,
      category: 'certification',
      year: '2025',
    },
    {
      title: 'AeroKLE Club',
      desc: 'Designed & built drones and model aircraft',
      icon: Plane,
      category: 'club',
      year: '2024',
    },
  ];

  return (
    <section id="experience" className="section-pad relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader number="04" title={heading || 'Experience'} />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-14">
          {/* Work */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-3.5 h-3.5 text-[#d63d4a]" />
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#7a7589] font-medium">Work</h3>
            </div>

            <div className="relative">
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
                    className="absolute left-0 top-2 w-[13px] h-[13px] rounded-full border-2 border-[#d63d4a] bg-[#030204] z-10"
                  >
                    <div className="absolute inset-1 rounded-full bg-[#e84855] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  <div className="card-box hover:glass-hover transition-all duration-500 group-hover:translate-x-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm sm:text-base font-semibold text-white/95">{exp.title}</h4>
                      <span className="text-[10px] font-mono text-[#d63d4a] tracking-wider">{exp.period}</span>
                    </div>
                    <p className="text-[#7a7589] text-xs mb-3">{exp.company} — {exp.location}</p>
                    
                    <ul className="space-y-1.5 mb-3">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="text-[#7a7589] text-xs leading-relaxed flex gap-2">
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
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400/90" />
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#7a7589] font-medium">Education</h3>
            </div>

            <div className="space-y-3">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -2 }}
                  className="card-box hover:glass-hover transition-all duration-500"
                >
                  <h4 className="text-xs sm:text-sm font-semibold text-white/95 mb-1.5 leading-snug">{edu.degree}</h4>
                  <p className="text-[#7a7589] text-[11px] mb-0.5">{edu.school}</p>
                  <p className="text-[#7a7589]/80 text-[11px]">{edu.details}</p>
                  {edu.coursework && (
                    <p className="text-[#7a7589]/60 text-[10px] mt-1.5 italic leading-snug">Coursework: {edu.coursework}</p>
                  )}
                  <span className="inline-block mt-3 text-[10px] font-mono text-purple-400 tracking-wider">{edu.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements — full-width bento grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-[#d63d4a]" />
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#7a7589] font-medium">
                Achievements & Certifications
              </h3>
            </div>
            <p className="text-[#7a7589]/70 text-[11px] max-w-md leading-relaxed">
              Hackathons, research, industry certs, and hands-on engineering outside the classroom.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {achievements.map((item, index) => {
              const style = categoryStyles[item.category];
              const Icon = item.icon;
              const isHovered = hoveredAchievement === index;
              const isFeatured = item.featured;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  onMouseEnter={() => setHoveredAchievement(index)}
                  onMouseLeave={() => setHoveredAchievement(null)}
                  className={`group relative overflow-hidden rounded-xl transition-all duration-500 ${
                    isFeatured ? 'sm:row-span-2' : ''
                  } ${isHovered ? 'glass-hover' : 'glass'}`}
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      isFeatured
                        ? 'bg-gradient-to-br from-[#e84855]/12 via-transparent to-transparent'
                        : 'bg-gradient-to-br from-white/[0.03] to-transparent'
                    }`}
                  />

                  <div
                    className={`relative h-full flex flex-col p-4 ${isFeatured ? 'sm:p-5 justify-between min-h-[200px]' : 'min-h-[128px]'}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <motion.div
                        animate={{
                          scale: isHovered ? 1.08 : 1,
                          boxShadow: isHovered
                            ? '0 0 24px rgba(232, 72, 85, 0.25)'
                            : '0 0 0 transparent',
                        }}
                        className={`shrink-0 flex items-center justify-center rounded-xl border ${style.border} ${style.bg} ${
                          isFeatured ? 'w-12 h-12' : 'w-10 h-10'
                        }`}
                      >
                        <Icon className={`${style.accent} ${isFeatured ? 'w-5 h-5' : 'w-4 h-4'}`} strokeWidth={1.75} />
                      </motion.div>

                      <span className="text-[10px] font-mono text-[#9a95a8]/50 tracking-wider tabular-nums">
                        {item.year}
                      </span>
                    </div>

                    <div className="flex-1">
                      <span
                        className={`inline-block text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border mb-3 ${style.border} ${style.bg} ${style.accent}`}
                      >
                        {style.label}
                      </span>

                      <h4
                        className={`font-semibold text-white/95 leading-snug mb-1 group-hover:text-gradient-primary transition-all duration-300 ${
                          isFeatured ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                        }`}
                      >
                        {item.title}
                      </h4>

                      <p className={`text-[#7a7589] leading-relaxed ${isFeatured ? 'text-xs sm:text-sm' : 'text-[11px]'}`}>
                        {item.desc}
                      </p>
                    </div>

                    {isFeatured && (
                      <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e84855] animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[#e84855]/80 font-medium">
                          Latest highlight
                        </span>
                      </div>
                    )}

                    <div
                      className={`absolute bottom-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                        item.category === 'hackathon'
                          ? 'bg-[#e84855]/15'
                          : item.category === 'research'
                            ? 'bg-purple-500/15'
                            : item.category === 'certification'
                              ? 'bg-amber-500/15'
                              : 'bg-sky-500/15'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
