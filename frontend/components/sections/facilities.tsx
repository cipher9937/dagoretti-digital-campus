"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Microscope, Laptop, BookOpen, Dumbbell, Music, Utensils, Home } from 'lucide-react';

const facilities = [
  { icon: Building2, title: 'Modern Classrooms', description: 'Spacious, well-ventilated classrooms equipped with modern teaching aids and comfortable seating for 40+ students.' },
  { icon: Microscope, title: 'Science Laboratories', description: 'State-of-the-art physics, chemistry, and biology laboratories with modern equipment for practical learning.' },
  { icon: Laptop, title: 'Computer Laboratory', description: 'New computer laboratory with 50 modern PCs, high-speed internet, and interactive smart boards for digital learning.' },
  { icon: BookOpen, title: 'School Library', description: 'Comprehensive library with thousands of books, journals, and digital resources supporting all curriculum areas.' },
  { icon: Dumbbell, title: 'Sports Facilities', description: 'World-class basketball court (Giants of Africa), football pitch, athletics track, and multi-purpose sports ground.' },
  { icon: Music, title: 'Arts & Music', description: 'Dedicated music room, art studio, and performance spaces for creative and cultural development.' },
  { icon: Utensils, title: 'Dining Hall', description: 'Spacious dining facility serving nutritious meals to all students and staff throughout the school term.' },
  { icon: Home, title: 'Boarding Facilities', description: 'Well-maintained dormitories providing comfortable accommodation with modern amenities for all students.' },
];

export function Facilities() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Infrastructure</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            World-Class Facilities
          </h2>
          <p className="text-navy-600 leading-relaxed">
            Our campus features modern facilities designed to support academic excellence, 
            sports development, and holistic student growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-navy-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <facility.icon className="w-6 h-6 text-navy-700" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">{facility.title}</h3>
              <p className="text-sm text-navy-600 leading-relaxed">{facility.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
