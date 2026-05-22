'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Layers, Wrench, Cpu } from 'lucide-react';
import { useTextScramble } from '@/hooks/use-text-scramble';
import { SectionHeader } from '@/components/section-header';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const heading = useTextScramble('Skills & Expertise', isInView, 25);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const skillCategories = [
    {
      category: 'Languages',
      icon: Code2,
      skills: [
        { name: 'Python', level: 90 },
        { name: 'JavaScript', level: 88 },
        { name: 'Java', level: 82 },
        { name: 'C / C++', level: 80 },
        { name: 'SQL', level: 85 },
        { name: 'HTML / CSS', level: 92 },
      ],
    },
    {
      category: 'Frameworks & Libraries',
      icon: Layers,
      skills: [
        { name: 'React', level: 90 },
        { name: 'Node.js', level: 88 },
        { name: 'Express', level: 85 },
        { name: 'FastAPI', level: 80 },
        { name: 'Flutter', level: 78 },
        { name: 'Spring Boot', level: 72 },
      ],
    },
    {
      category: 'Tools & Platforms',
      icon: Wrench,
      skills: [
        { name: 'Git', level: 92 },
        { name: 'Docker', level: 82 },
        { name: 'AWS', level: 78 },
        { name: 'Vercel / Render', level: 88 },
        { name: 'Linux', level: 80 },
        { name: 'Figma', level: 75 },
      ],
    },
    {
      category: 'Concepts & CS Core',
      icon: Cpu,
      skills: [
        { name: 'DSA', level: 88 },
        { name: 'System Design', level: 78 },
        { name: 'REST APIs', level: 90 },
        { name: 'DBMS', level: 85 },
        { name: 'Machine Learning', level: 82 },
        { name: 'Agile / Scrum', level: 80 },
      ],
    },
  ];

  const getGlow = (level: number) => {
    if (level >= 90) return '0 0 20px rgba(232,72,85,0.3), 0 0 40px rgba(232,72,85,0.1)';
    if (level >= 85) return '0 0 15px rgba(232,72,85,0.2)';
    return 'none';
  };

  return (
    <section id="skills" className="section-pad relative aurora-bg" ref={ref}>
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          number="02"
          title={heading || 'Skills & Expertise'}
          subtitle="From low-level C to agentic AI pipelines — here's what I work with"
        />

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {skillCategories.map((category, catIndex) => {
            const Icon = category.icon;
            const isCardHovered = hoveredCard === catIndex;

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredCard(catIndex)}
                onMouseLeave={() => setHoveredCard(null)}
                data-hoverable
                className={`card-box transition-all duration-500 group relative overflow-hidden ${
                  isCardHovered
                    ? 'glass-hover border-[#d63d4a]/25'
                    : ''
                }`}
              >
                {/* Removed tap indicator */}

                {/* Corner accent glow on hover */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isCardHovered ? 1 : 0 }}
                  className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#e84855]/8 rounded-full blur-2xl pointer-events-none"
                />

                {/* Header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className={`p-2 rounded-lg transition-all duration-300 ${isCardHovered
                      ? 'bg-[#d63d4a]/12'
                      : 'bg-white/[0.03]'
                    }`}>
                    <Icon size={16} className={`transition-colors duration-300 ${isCardHovered ? 'text-[#d63d4a]' : 'text-[#7a7589]'
                      }`} />
                  </div>
                  <h3 className={`text-sm sm:text-base font-semibold tracking-tight transition-colors duration-300 ${isCardHovered ? 'text-gradient-primary' : 'text-white/95'}`}>{category.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => {
                    const skillKey = `${catIndex}-${skill.name}`;
                    const isHovered = hoveredSkill === skillKey;
                    const opacityBase = 0.5 + (skill.level / 100) * 0.5;

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.08 + skillIndex * 0.05, type: 'spring', stiffness: 300 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        onMouseEnter={() => setHoveredSkill(skillKey)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        role="button"
                        className="relative rounded-full text-xs font-medium cursor-default transition-all duration-300 px-3 py-1.5"
                        style={{
                          background: isHovered
                            ? 'linear-gradient(135deg, rgba(232,72,85,0.25), rgba(232,72,85,0.1))'
                            : `rgba(255,255,255,${opacityBase * 0.06})`,
                          border: isHovered
                            ? '1px solid rgba(232,72,85,0.4)'
                            : `1px solid rgba(255,255,255,${opacityBase * 0.1})`,
                          color: isHovered ? '#fff' : `rgba(255,255,255,${opacityBase})`,
                          boxShadow: isHovered ? getGlow(skill.level) : 'none',
                        }}
                      >
                        <span className="relative z-10">{skill.name}</span>
                        <motion.span
                          initial={false}
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.5,
                            y: isHovered ? 0 : 5,
                          }}
                          transition={{ duration: 0.2 }}
                          className="absolute -top-2 -right-2 bg-[#e84855] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-20 leading-none"
                        >
                          {skill.level}
                        </motion.span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 pt-10 border-t border-white/[0.04]"
        >
          <h3 className="text-center text-[10px] uppercase tracking-[0.28em] text-[#7a7589] mb-6">Databases & More</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['PostgreSQL', 'MongoDB', 'Firebase', 'Supabase', 'GraphQL', 'Apache Kafka', 'Scikit-learn', 'Ollama'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -4 }}
                role="button"
                className="px-3 py-1.5 rounded-full glass hover:glass-hover text-xs font-medium text-[#7a7589] hover:text-white transition-all duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
