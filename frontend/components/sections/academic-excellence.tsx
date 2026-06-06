"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, BookOpen, Microscope, Calculator, Globe, Palette } from 'lucide-react';

const programs = [
  { icon: Calculator, title: 'Mathematics & Sciences', description: 'Advanced mathematics, physics, chemistry, and biology with modern laboratory facilities.', color: 'bg-blue-50' },
  { icon: BookOpen, title: 'Languages & Literature', description: 'English, Kiswahili, and foreign languages with comprehensive reading programs.', color: 'bg-amber-50' },
  { icon: Microscope, title: 'STEM Education', description: 'Science, Technology, Engineering, and Mathematics with hands-on project-based learning.', color: 'bg-emerald-50' },
  { icon: Globe, title: 'Humanities & Social Sciences', description: 'History, geography, CRE, and business studies with critical thinking focus.', color: 'bg-rose-50' },
  { icon: Palette, title: 'Arts & Sports', description: 'Music, drama, visual arts, and comprehensive sports programs including basketball.', color: 'bg-purple-50' },
  { icon: TrendingUp, title: 'CBC Grade 10', description: 'Competency-Based Curriculum with three pathways: STEM, Social Sciences, and Arts & Sports.', color: 'bg-cyan-50' },
];

export function AcademicExcellence() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-navy-50" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Academic Programs</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Excellence in Every Discipline
          </h2>
          <p className="text-navy-600 leading-relaxed">
            Our comprehensive curriculum spans both the 8-4-4 system and the new Competency-Based Curriculum, 
            ensuring every student receives a world-class education tailored to their strengths and aspirations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className={`${program.color} rounded-xl p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer`}
            >
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <program.icon className="w-7 h-7 text-navy-700" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">{program.title}</h3>
              <p className="text-navy-600 leading-relaxed text-sm">{program.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
