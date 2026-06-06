"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Eye, Target, Compass } from 'lucide-react';

export function VisionMission() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Our Foundation</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Vision, Mission & Core Values
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-navy-900 mb-4">Our Vision</h3>
            <p className="text-navy-600 leading-relaxed">
              To be a center of excellence in education, producing well-rounded individuals who are 
              academically competent, morally upright, and prepared to lead and serve society with 
              integrity and innovation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 bg-emerald-50 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-navy-900 mb-4">Our Mission</h3>
            <p className="text-navy-600 leading-relaxed">
              To provide quality holistic education that nurtures academic excellence, character 
              development, and leadership skills through innovative teaching, modern facilities, 
              and a supportive learning environment that prepares students for global citizenship.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 bg-amber-50 rounded-lg flex items-center justify-center mb-6">
              <Compass className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-navy-900 mb-4">Our Motto</h3>
            <p className="text-navy-600 leading-relaxed">
              <span className="text-gold-600 font-bold text-lg italic">"Elimu Ni Mali"</span>
              <br /><br />
              Education is Wealth. We believe that knowledge and learning are the most valuable 
              assets one can possess, forming the foundation for personal growth and national development.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
