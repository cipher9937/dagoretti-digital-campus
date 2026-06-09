"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, Languages, FlaskConical, Globe, Wrench, Briefcase, Palette, Dumbbell } from 'lucide-react';

const departments = [
  { icon: Calculator, name: 'Mathematics Department', head: 'Mr. James Mwangi', description: 'Pure and applied mathematics, statistics, and mathematical modeling. Consistently produces top performers in KCSE Mathematics.', teachers: 12, students: 400 },
  { icon: Languages, name: 'Languages Department', head: 'Mrs. Grace Wanjiku', description: 'English, Kiswahili, and foreign languages. Home of the school debate club and creative writing programs.', teachers: 15, students: 1200 },
  { icon: FlaskConical, name: 'Sciences Department', head: 'Mr. Peter Ochieng', description: 'Physics, Chemistry, Biology, and Agriculture. Modern laboratories equipped for practical learning and research.', teachers: 18, students: 800 },
  { icon: Globe, name: 'Humanities Department', head: 'Mrs. Mary Kamau', description: 'History, Geography, and CRE. Engages students in critical thinking and understanding of society and environment.', teachers: 10, students: 600 },
  { icon: Wrench, name: 'Technical Department', head: 'Mr. David Kipchirchir', description: 'Computer Studies, Woodwork, and Metalwork. Features modern computer laboratory with 50 PCs and internet.', teachers: 8, students: 300 },
  { icon: Briefcase, name: 'Business Department', head: 'Mrs. Sarah Njoroge', description: 'Business Studies, Economics, and Accounting. Prepares students for careers in commerce and entrepreneurship.', teachers: 6, students: 250 },
  { icon: Palette, name: 'Creative Arts Department', head: 'Mrs. Rose Achieng', description: 'Music, Art, and Drama. National award winners in Kenya Music Festival for choir and traditional dance.', teachers: 5, students: 200 },
  { icon: Dumbbell, name: 'Sports Department', head: 'Mr. Joseph Kimani', description: 'Physical Education and Sports. Features the Giants of Africa basketball court and comprehensive sports programs.', teachers: 4, students: 1200 },
];

export function DepartmentInfo() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Departments</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Academic Departments
          </h2>
          <p className="text-navy-600 leading-relaxed">
            Eight dedicated departments staffed by qualified professionals committed to 
            delivering excellence in their respective subject areas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-4">
                <dept.icon className="w-6 h-6 text-navy-700" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">{dept.name}</h3>
              <p className="text-xs text-gold-600 font-semibold mb-3">Head: {dept.head}</p>
              <p className="text-sm text-navy-600 leading-relaxed mb-4">{dept.description}</p>
              <div className="flex gap-4 text-xs text-navy-500">
                <span>{dept.teachers} Teachers</span>
                <span>{dept.students} Students</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
