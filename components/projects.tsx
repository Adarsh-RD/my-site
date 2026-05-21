'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  link: string;
  github: string;
  color: string;
  year: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="group relative shrink-0 w-[min(100%,26rem)] sm:w-[28rem] flex flex-col glass rounded-2xl p-7 transition-all duration-500 hover:glass-hover premium-shadow"
      style={{ borderColor: `${project.color}18` }}
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
          <h3 className="text-base font-semibold text-white leading-snug group-hover:text-gradient-primary transition-all duration-300">
            {project.title}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#9a95a8]/50 shrink-0 tabular-nums">{project.year}</span>
      </div>

      <p className="text-[#9a95a8] text-sm leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-[#9a95a8] border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-[10px] uppercase tracking-[0.15em] text-[#9a95a8]/60">
          {project.category === 'fullstack' ? 'Full Stack' : project.category === 'ai' ? 'AI / ML' : 'Backend'}
        </span>
        <div className="flex gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-[#e84855]/15 text-[#9a95a8] hover:text-white transition-all"
            title="GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={14} />
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-[#e84855]/15 text-[#9a95a8] hover:text-[#e84855] transition-all"
            title="View project"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: `${project.color}20` }}
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
      link: '#',
      github: 'https://github.com/Adarsh-RD',
      color: '#e84855',
      year: '2025–26',
    },
    {
      id: 2,
      title: 'Agentic Resume Screening System',
      description:
        'AI resume screener with BabyAGI-inspired reasoning loop, LLM-powered requirement extraction via Ollama, AutoML pipeline (GridSearchCV across LR, SVC, RandomForest), hybrid scoring with TF-IDF + semantic embeddings, and custom skill extraction engine with 300+ normalized tech terms.',
      tags: ['Python', 'Flutter', 'Ollama', 'Scikit-learn'],
      category: 'ai',
      link: '#',
      github: 'https://github.com/Adarsh-RD',
      color: '#ff6b6b',
      year: '2026',
    },
    {
      id: 3,
      title: 'Cross-System Identity Resolution Engine',
      description:
        'Infosys mini-project (KLE Tech × Infosys SoW): privacy-preserving engine to link Aadhaar, ABHA, DigiLocker, and mobile identities without storing raw IDs. HMAC-SHA256 blinded indexing, Pedersen-style ZK proofs, consent APIs, and tamper-evident audit logs.',
      tags: ['Node.js', 'MongoDB', 'ZKP', 'REST APIs'],
      category: 'backend',
      link: 'https://github.com/Adarsh-RD/infosys-mini-project',
      github: 'https://github.com/Adarsh-RD/infosys-mini-project',
      color: '#c41e3a',
      year: '2025–26',
    },
    {
      id: 4,
      title: 'AI Video Restoration (IEEE Paper)',
      description:
        'Research project on AI-based video restoration using U-Net architecture. Published as an IEEE research paper covering deep learning techniques for video frame enhancement and noise reduction.',
      tags: ['Python', 'U-Net', 'Deep Learning', 'IEEE'],
      category: 'ai',
      link: '#',
      github: 'https://github.com/Adarsh-RD',
      color: '#e84855',
      year: '2025',
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
    <section id="projects" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="section-line" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#e84855] font-medium">03</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-gradient-primary">{heading || '\u00A0'}</span>
          </h2>
          <p className="text-[#9a95a8] text-lg mt-4 max-w-xl">
            Real projects, deployed and battle-tested
          </p>
        </motion.div>

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
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 magnetic-element ${
                selectedCategory === cat.id
                  ? 'bg-[#e84855] text-white glow-red'
                  : 'glass text-[#9a95a8] hover:text-white'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Marquee — aligned with filters, ~2.5 cards visible */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="projects-marquee relative overflow-hidden cursor-default rounded-r-2xl"
          style={{
            maskImage: 'linear-gradient(to right, black 72%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 72%, transparent 100%)',
          }}
        >
          <div className="projects-marquee-track gap-6 py-1">
            {marqueeProjects.map((project, index) => (
              <ProjectCard key={`${project.id}-${index}`} project={project} />
            ))}
          </div>
        </motion.div>

        <p className="text-[#9a95a8]/40 text-xs mt-5 tracking-wide">
          Hover to pause · scrolls automatically
        </p>
      </div>
    </section>
  );
}
