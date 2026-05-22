'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';
import { SectionHeader } from '@/components/section-header';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  github: string;
  live?: string;
  color: string;
  year: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="group relative shrink-0 w-[16.5rem] max-w-[16.5rem] min-h-[20rem] sm:min-h-[22rem] flex flex-col rounded-xl p-4 sm:p-5 transition-all duration-500 bg-[#0a0810] border shadow-[0_8px_28px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.55)]"
      style={{
        borderColor: `${project.color}30`,
        boxShadow: `0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
      />

      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: project.color, boxShadow: `0 0 12px ${project.color}80` }}
          />
          <h3 className="text-xs sm:text-sm font-semibold text-white/95 leading-snug group-hover:text-gradient-primary transition-all duration-300 break-words">
            {project.title}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#7a7589]/50 shrink-0 tabular-nums">{project.year}</span>
      </div>

      <p className="text-[#7a7589] text-[11px] sm:text-xs leading-relaxed flex-1 mb-3 break-words line-clamp-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#15121c] text-[#9a95a8] border border-white/[0.08]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
        <span className="text-[10px] uppercase tracking-[0.15em] text-[#7a7589]/60">
          {project.category === 'fullstack' ? 'Full Stack' : project.category === 'ai' ? 'AI / ML' : 'Backend'}
        </span>
        <div className="flex gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#15121c] border border-white/12 text-white hover:border-[#d63d4a]/50 hover:bg-[#d63d4a]/15 transition-all"
            title="GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={15} strokeWidth={2} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border text-white transition-all"
              style={{
                backgroundColor: `${project.color}18`,
                borderColor: `${project.color}45`,
              }}
              title="Live demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>

      <div
        className="absolute bottom-0 right-0 w-28 h-28 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: `${project.color}25` }}
      />
    </article>
  );
}

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const heading = useTextScramble('Projects', isInView, 25);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Club Hub',
      description:
        'Full-stack college club management platform with role-based access (student, club admin, coordinator), OTP auth via Brevo API, JWT sessions, Firebase FCM push notifications, event registration with capacity limits, and admin approval workflows.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Firebase FCM'],
      category: 'fullstack',
      github: 'https://github.com/Adarsh-RD/clubhub',
      live: 'https://kle-clubhub.vercel.app/',
      color: '#e84855',
      year: '2025–26',
    },
    {
      id: 2,
      title: 'Online Quiz',
      description:
        'Secure server-controlled online quiz backend built with Go (Gin) featuring timed sessions, anti-cheating mechanisms, and role-based access control.',
      tags: ['Go', 'Gin', 'REST APIs', 'RBAC'],
      category: 'backend',
      github: 'https://github.com/Adarsh-RD/online-quiz',
      color: '#38bdf8',
      year: '2025',
    },
    {
      id: 3,
      title: 'Cross-System Identity Resolution Engine',
      description:
        'Infosys mini-project (KLE Tech × Infosys SoW): privacy-preserving engine to link Aadhaar, ABHA, DigiLocker, and mobile identities without storing raw IDs. HMAC-SHA256 blinded indexing, Pedersen-style ZK proofs, consent APIs, and tamper-evident audit logs.',
      tags: ['Node.js', 'MongoDB', 'ZKP', 'REST APIs'],
      category: 'backend',
      github: 'https://github.com/Adarsh-RD/infosys-mini-project',
      live: 'https://infosys-mini-project.onrender.com',
      color: '#c41e3a',
      year: '2025–26',
    },
    {
      id: 4,
      title: 'Spam Detector',
      description:
        'Real-time spam SMS and email detection system with classification pipelines for filtering malicious or unwanted messages before they reach the user.',
      tags: ['Java', 'ML', 'NLP', 'Email/SMS'],
      category: 'ai',
      github: 'https://github.com/Adarsh-RD/spam-detector',
      color: '#f97316',
      year: '2025',
    },
    {
      id: 5,
      title: 'ReturnX AI',
      description:
        'IgniTrix hackathon project — an always-on AI tax & job assistant for India\'s gig workforce. Multi-agent pipeline (SmsParser → TaxAdvisor → Insights) via Groq/Llama 3.3 parses payment SMS for income & TDS estimates; Smart Job Picker compares live delivery offers for best ₹/hour. Privacy-first, runs in the browser with localStorage.',
      tags: ['Python', 'Groq', 'Multi-Agent', 'Vercel'],
      category: 'ai',
      github: 'https://github.com/Adarsh-RD/hackathon-ignitrix',
      live: 'https://return-x1.vercel.app/',
      color: '#a855f7',
      year: '2026',
    },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'ai', label: 'AI / ML' },
    { id: 'backend', label: 'Backend' },
  ];

  const filteredProjects =
    selectedCategory === 'all' ? projects : projects.filter((p) => p.category === selectedCategory);

  const marqueeProjects = [...filteredProjects, ...filteredProjects];

  return (
    <section id="projects" className="section-pad relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="03"
          title={heading || 'Projects'}
          subtitle="Real projects, deployed and battle-tested"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-[#d63d4a] text-white glow-red'
                  : 'glass text-[#7a7589] hover:text-white'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <p className="text-xs text-[#7a7589] mb-3 tracking-wide">
          <span className="text-white/95 font-semibold tabular-nums">{filteredProjects.length}</span>
          {' '}
          {filteredProjects.length === 1 ? 'project' : 'projects'}
          {selectedCategory !== 'all' && (
            <span className="text-[#7a7589]/60">
              {' '}
              · filtered from {projects.length} total
            </span>
          )}
        </p>

        {/* Marquee — fixed narrow cards, 3 fit in viewport (280px × 3 + gaps) */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="projects-marquee relative w-full max-w-[calc(16.5rem*3+2.5rem)] overflow-hidden cursor-default"
          style={{
            maskImage: 'linear-gradient(to right, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 92%, transparent 100%)',
          }}
        >
          <div className="projects-marquee-track gap-5 py-1">
            {marqueeProjects.map((project, index) => (
              <ProjectCard key={`${project.id}-${index}`} project={project} />
            ))}
          </div>
        </motion.div>

        <p className="text-[#7a7589]/45 text-[10px] mt-4 tracking-wide">
          Hover to pause · scrolls automatically
        </p>
      </div>
    </section>
  );
}
