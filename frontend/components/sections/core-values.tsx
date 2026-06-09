"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Shield, Heart, Lightbulb, Users, Award } from 'lucide-react';

const values = [
  { icon: Star, title: 'Academic Excellence', description: 'Pursuing the highest standards of academic achievement through rigorous curriculum and dedicated teaching.' },
  { icon: Shield, title: 'Discipline', description: 'Instilling self-discipline, respect for rules, and personal responsibility in all aspects of school life.' },
  { icon: Heart, title: 'Integrity', description: 'Upholding honesty, transparency, and ethical behavior in all interactions and endeavors.' },
  { icon: Lightbulb, title: 'Innovation', description: 'Encouraging creative thinking, problem-solving, and adaptation to new technologies and methodologies.' },
  { icon: Users, title: 'Leadership', description: 'Developing leadership qualities that empower students to serve and inspire positive change in their communities.' },
  { icon: Award, title: 'Excellence', description: 'Striving for excellence in academics, sports, arts, and all co-curricular activities.' },
];

export function CoreValues() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">What We Stand For</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Core Values
          </h2>
          <p className="text-navy-600 leading-relaxed">
            Our values form the foundation of everything we do, guiding our students, teachers, 
            and staff toward a shared vision of excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-navy-50 rounded-xl p-6 hover:bg-navy-100 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <value.icon className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">{value.title}</h3>
              <p className="text-sm text-navy-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
