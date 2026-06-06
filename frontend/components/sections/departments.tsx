"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, Languages, FlaskConical, Globe, Wrench, Briefcase, Palette, Dumbbell } from 'lucide-react';

const departments = [
  { icon: Calculator, name: 'Mathematics', code: 'MATH', subjects: 'Mathematics, Statistics', head: 'Mr. James Mwangi' },
  { icon: Languages, name: 'Languages', code: 'LANG', subjects: 'English, Kiswahili, French', head: 'Mrs. Grace Wanjiku' },
  { icon: FlaskConical, name: 'Sciences', code: 'SCI', subjects: 'Physics, Chemistry, Biology, Agriculture', head: 'Mr. Peter Ochieng' },
  { icon: Globe, name: 'Humanities', code: 'HUM', subjects: 'History, Geography, CRE', head: 'Mrs. Mary Kamau' },
  { icon: Wrench, name: 'Technical', code: 'TECH', subjects: 'Computer Studies, Woodwork, Metalwork', head: 'Mr. David Kipchirchir' },
  { icon: Briefcase, name: 'Business', code: 'BUS', subjects: 'Business Studies, Economics, Accounting', head: 'Mrs. Sarah Njoroge' },
  { icon: Palette, name: 'Creative Arts', code: 'ARTS', subjects: 'Music, Art, Drama', head: 'Mrs. Rose Achieng' },
  { icon: Dumbbell, name: 'Sports', code: 'SPORT', subjects: 'Physical Education, Games', head: 'Mr. Joseph Kimani' },
];

export function Departments() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Academic Structure</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Academic Departments
          </h2>
          <p className="text-navy-600 leading-relaxed">
            Our eight academic departments are staffed by qualified professionals dedicated to 
            delivering excellence across all subject areas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-navy-100 transition-colors">
                <dept.icon className="w-6 h-6 text-navy-700" />
              </div>
              <span className="text-xs font-semibold text-gold-600 uppercase tracking-wider">{dept.code}</span>
              <h3 className="font-semibold text-navy-900 mt-1 mb-2">{dept.name}</h3>
              <p className="text-sm text-navy-500 mb-3">{dept.subjects}</p>
              <p className="text-xs text-navy-400">Head: {dept.head}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
