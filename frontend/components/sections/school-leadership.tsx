"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, GraduationCap, BookOpen, Shield } from 'lucide-react';

const leaders = [
  { name: 'Lawrence Nyakweba', role: 'Chief Principal', description: 'Leading the school with vision and dedication to academic excellence and holistic development.', icon: User },
  { name: 'Deputy Principal - Academics', role: 'Academic Affairs', description: 'Overseeing curriculum implementation, teacher development, and academic performance across all departments.', icon: GraduationCap },
  { name: 'Deputy Principal - Administration', role: 'School Administration', description: 'Managing day-to-day operations, student welfare, and ensuring a conducive learning environment.', icon: Shield },
  { name: 'Heads of Departments', role: 'Department Leadership', description: 'Eight dedicated heads leading Mathematics, Languages, Sciences, Humanities, Technical, Business, Arts, and Sports departments.', icon: BookOpen },
];

export function SchoolLeadership() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-navy-950" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Our Team</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4 mb-6">
            School Leadership
          </h2>
          <p className="text-navy-300 leading-relaxed">
            Our dedicated leadership team works tirelessly to maintain the highest standards 
            of education and create an environment where every student can thrive.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-navy-800/50 rounded-xl p-6 border border-navy-700 hover:border-gold-500/50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-navy-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <leader.icon className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="font-semibold text-white text-center mb-1">{leader.name}</h3>
              <p className="text-gold-400 text-sm text-center mb-3">{leader.role}</p>
              <p className="text-navy-300 text-sm text-center leading-relaxed">{leader.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
