"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Music, Microscope, Globe, BookOpen, Heart, Code, TreePine, Camera } from 'lucide-react';

const clubs = [
  { icon: Music, name: 'Music & Drama Club', description: 'Choir, traditional dance, and theatrical performances. National award winners in Kenya Music Festival.' },
  { icon: Microscope, name: 'Science Club', description: 'Science congress participants, innovation projects, and STEM competitions. Regional award winners.' },
  { icon: Globe, name: 'Debate & Drama', description: 'Public speaking, debate competitions, and dramatic arts development.' },
  { icon: BookOpen, name: 'Journalism Club', description: 'School newsletter, creative writing, and media literacy programs.' },
  { icon: Heart, name: 'Christian Union', description: 'Spiritual development, fellowship, and community service activities.' },
  { icon: Code, name: 'ICT Club', description: 'Programming, web development, and digital literacy skills for the modern world.' },
  { icon: TreePine, name: 'Environmental Club', description: 'Tree planting, conservation awareness, and sustainable practices.' },
  { icon: Camera, name: 'Photography Club', description: 'Visual storytelling, photo journalism, and creative photography.' },
];

export function ClubsSocieties() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Co-Curricular</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Clubs & Societies
          </h2>
          <p className="text-navy-600 leading-relaxed">
            Our vibrant clubs and societies provide students with opportunities to explore their 
            interests, develop talents, and build leadership skills beyond the classroom.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club, index) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-navy-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                <club.icon className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">{club.name}</h3>
              <p className="text-sm text-navy-600 leading-relaxed">{club.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
