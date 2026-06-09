"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

export function CurriculumOverview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Curriculum</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Dual Curriculum System
          </h2>
          <p className="text-navy-600 leading-relaxed">
            We offer both the 8-4-4 system and the Competency-Based Curriculum (CBC), 
            ensuring all students receive the best education suited to their academic journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-navy-50 rounded-xl p-8"
          >
            <div className="w-14 h-14 bg-navy-900 rounded-lg flex items-center justify-center mb-6">
              <GraduationCap className="w-7 h-7 text-gold-400" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">CBC Senior School</h3>
            <p className="text-navy-600 mb-6 leading-relaxed">
              Our Grade 10 program follows the Competency-Based Curriculum with three pathways 
              designed to develop skills and competencies for the 21st century.
            </p>
            <ul className="space-y-3">
              {['Grade 10 - STEM Pathway', 'Grade 10 - Social Sciences Pathway', 'Grade 10 - Arts & Sports Pathway', 'Project-Based Learning', 'Competency Assessment'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-navy-700">
                  <CheckCircle className="w-5 h-5 text-gold-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-navy-50 rounded-xl p-8"
          >
            <div className="w-14 h-14 bg-gold-500 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="w-7 h-7 text-navy-900" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">8-4-4 System</h3>
            <p className="text-navy-600 mb-6 leading-relaxed">
              Our Form 3 and Form 4 programs continue to deliver excellence in the 8-4-4 system, 
              preparing students for the Kenya Certificate of Secondary Education (KCSE) examinations.
            </p>
            <ul className="space-y-3">
              {['Form 3 - Comprehensive Subjects', 'Form 4 - KCSE Preparation', 'Science & Arts Combinations', 'Examination Preparation', 'Career Guidance'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-navy-700">
                  <CheckCircle className="w-5 h-5 text-gold-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
