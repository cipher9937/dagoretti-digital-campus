"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { GraduationCap, BookOpen, Shield, Library, ArrowRight } from 'lucide-react';

const portals = [
  { icon: GraduationCap, title: 'Student Portal', description: 'Access assignments, timetables, grades, and learning resources.', href: '/student-portal', color: 'bg-blue-500' },
  { icon: BookOpen, title: 'Teacher Portal', description: 'Manage classes, assignments, attendance, and student records.', href: '/teacher-portal', color: 'bg-emerald-500' },
  { icon: Shield, title: 'Admin Portal', description: 'School administration, user management, and system settings.', href: '/admin-portal', color: 'bg-purple-500' },
  { icon: Library, title: 'Digital Library', description: 'Access e-books, past papers, notes, and revision materials.', href: '/library', color: 'bg-amber-500' },
];

export function QuickPortalAccess() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Digital Campus</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Access Your Portal
          </h2>
          <p className="text-navy-600 leading-relaxed">
            Our digital campus platform provides secure access to all school resources, 
            personalized dashboards, and real-time updates for students, teachers, and administrators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((portal, index) => (
            <motion.div
              key={portal.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <Link href={portal.href}>
                <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 group h-full">
                  <div className={`w-14 h-14 ${portal.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <portal.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                    {portal.title}
                  </h3>
                  <p className="text-navy-600 text-sm leading-relaxed mb-4">{portal.description}</p>
                  <span className="text-sm font-semibold text-navy-900 group-hover:text-gold-600 transition-colors flex items-center gap-1">
                    Access Portal <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
