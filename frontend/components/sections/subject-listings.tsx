"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, BookOpen, FlaskConical, Globe, Code, Music, Briefcase, TreePine } from 'lucide-react';

const subjects = [
  {
    category: 'Mathematics & Sciences',
    icon: Calculator,
    color: 'bg-blue-50',
    items: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Agriculture'],
  },
  {
    category: 'Languages',
    icon: BookOpen,
    color: 'bg-amber-50',
    items: ['English', 'Kiswahili', 'French (Optional)', 'German (Optional)'],
  },
  {
    category: 'Humanities',
    icon: Globe,
    color: 'bg-emerald-50',
    items: ['History & Government', 'Geography', 'Christian Religious Education', 'Islamic Religious Education'],
  },
  {
    category: 'Technical & Applied',
    icon: Code,
    color: 'bg-purple-50',
    items: ['Computer Studies', 'Woodwork', 'Metalwork', 'Electricity', 'Building Construction'],
  },
  {
    category: 'Business & Economics',
    icon: Briefcase,
    color: 'bg-rose-50',
    items: ['Business Studies', 'Economics', 'Accounting'],
  },
  {
    category: 'Creative Arts & Sports',
    icon: Music,
    color: 'bg-cyan-50',
    items: ['Music', 'Art & Design', 'Home Science', 'Physical Education'],
  },
];

export function SubjectListings() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Subjects</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Subject Offerings
          </h2>
          <p className="text-navy-600 leading-relaxed">
            A comprehensive range of subjects across all academic departments, 
            ensuring students can pursue their interests and career aspirations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className={`${group.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                <group.icon className="w-6 h-6 text-navy-700" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-4">{group.category}</h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-navy-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
