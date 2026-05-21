'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const heading = useTextScramble('Projects', isInView, 25);

  const projects = [
    {
      id: 1,
      title: 'Club Hub',
      description: 'Full-stack college club management platform with role-based access (student, club admin, coordinator), OTP auth via Brevo API, JWT sessions, Firebase FCM push notifications, event registration with capacity limits, and admin approval workflows.',
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
      description: 'AI resume screener with BabyAGI-inspired reasoning loop, LLM-powered requirement extraction via Ollama, AutoML pipeline (GridSearchCV across LR, SVC, RandomForest), hybrid scoring with TF-IDF + semantic embeddings, and custom skill extraction engine with 300+ normalized tech terms.',
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
      description: 'Infosys mini-project (KLE Tech × Infosys SoW): privacy-preserving engine to link Aadhaar, ABHA, DigiLocker, and mobile identities without storing raw IDs. HMAC-SHA256 blinded indexing, Pedersen-style ZK proofs for same-person verification, consent grant/revoke APIs, and tamper-evident hash-chain audit logs — delivered as a reference app and technical white-paper.',
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
      description: 'Research project on AI-based video restoration using U-Net architecture. Published as an IEEE research paper covering deep learning techniques for video frame enhancement and noise reduction.',
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

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
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
          className="flex flex-wrap gap-2 mb-12"
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

        <motion.div layout className="space-y-1">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative"
              >
                <div className={`flex flex-col md:flex-row md:items-center justify-between py-6 px-6 rounded-2xl transition-all duration-500 ${
                  hoveredProject === project.id ? 'glass-hover' : 'hover:bg-white/[0.02]'
                }`}>
                  <div className="flex items-start md:items-center gap-4 flex-1 min-w-0 mb-3 md:mb-0">
                    <span className="text-xs font-mono text-[#9a95a8]/40 w-6 shrink-0 mt-1 md:mt-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <motion.div
                      animate={{
                        scale: hoveredProject === project.id ? 1.5 : 1,
                        boxShadow: hoveredProject === project.id ? `0 0 20px ${project.color}40` : 'none',
                      }}
                      className="w-3 h-3 rounded-full shrink-0 mt-1 md:mt-0"
                      style={{ backgroundColor: project.color }}
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-gradient-primary transition-all duration-300">
                        {project.title}
                      </h3>
                      <motion.p
                        animate={{
                          height: hoveredProject === project.id ? 'auto' : 0,
                          opacity: hoveredProject === project.id ? 1 : 0,
                        }}
                        className="text-[#9a95a8] text-sm mt-1 overflow-hidden leading-relaxed"
                      >
                        {project.description}
                      </motion.p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 ml-10 md:ml-4">
                    <div className="hidden md:flex gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-[#9a95a8] border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-[#9a95a8]/50">{project.year}</span>

                    <div className="flex gap-2">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-lg glass hover:glass-hover text-[#9a95a8] hover:text-white transition-all"
                        title="GitHub"
                      >
                        <Github size={14} />
                      </motion.a>
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-lg glass hover:glass-hover text-[#9a95a8] hover:text-[#e84855] transition-all"
                        title="Live Demo"
                      >
                        <ArrowUpRight size={14} />
                      </motion.a>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/5 mx-6" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
