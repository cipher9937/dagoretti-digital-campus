"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Landmark, Users, BookOpen } from 'lucide-react';

const timeline = [
  { year: '1929', title: 'School Founded', description: 'Dagoretti High School was established as a primary school in the Dagoretti area of Nairobi.' },
  { year: '1962', title: 'High School Status', description: 'The school officially became a high school, marking the beginning of secondary education at Dagoretti.' },
  { year: '1963', title: 'Official Inauguration', description: 'Dagoretti High School was officially inaugurated as a full high school with its first Form 1 students.' },
  { year: '1980s', title: 'National School Status', description: 'The school was elevated to National School status, allowing it to admit students from all over Kenya.' },
  { year: '2000s', title: 'Infrastructure Expansion', description: 'Major infrastructure development including new classrooms, laboratories, and dormitories.' },
  { year: '2023', title: 'Giants of Africa Court', description: 'Unveiling of the world-class basketball court donated by Giants of Africa foundation led by Masai Ujiri.' },
  { year: '2024', title: 'CBC Transition', description: 'Successful transition to Competency-Based Curriculum with the launch of Grade 10 program.' },
];

export function SchoolHistory() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Our Heritage</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 leading-tight">
              A Rich History of
              <span className="text-gold-500"> Excellence</span>
            </h2>
            <p className="text-navy-600 leading-relaxed text-lg">
              Founded in 1929, Dagoretti High School has grown from a modest primary school to one of 
              Kenya's premier national schools. Located in Waithaka, Dagoretti South Constituency, 
              Nairobi County, the school has been a beacon of academic excellence for nearly a century.
            </p>
            <p className="text-navy-600 leading-relaxed">
              The school was officially inaugurated as a high school in 1963, the same year Kenya gained 
              independence, symbolizing the nation's commitment to education. Over the decades, Dagoretti 
              High School has produced leaders in government, business, academia, and sports who have 
              shaped the destiny of Kenya.
            </p>
            <p className="text-navy-600 leading-relaxed">
              With a current student population of over 1,200 boys, the school continues to maintain its 
              reputation for academic excellence, consistently ranking among the top 500 schools nationally 
              in KCSE examinations. The school's motto, "Elimu Ni Mali" (Education is Wealth), reflects 
              the enduring belief that education is the foundation of prosperity.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-navy-50 rounded-xl p-4 text-center">
                <Calendar className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-navy-900">95+</div>
                <div className="text-sm text-navy-500">Years of Excellence</div>
              </div>
              <div className="bg-navy-50 rounded-xl p-4 text-center">
                <Landmark className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-navy-900">National</div>
                <div className="text-sm text-navy-500">School Status</div>
              </div>
              <div className="bg-navy-50 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-navy-900">1,200+</div>
                <div className="text-sm text-navy-500">Students</div>
              </div>
              <div className="bg-navy-50 rounded-xl p-4 text-center">
                <BookOpen className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-navy-900">80+</div>
                <div className="text-sm text-navy-500">Teachers</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-navy-900 mb-8">Timeline of Excellence</h3>
            <div className="relative border-l-2 border-gold-200 ml-4 space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gold-500 rounded-full border-4 border-white shadow-sm" />
                  <span className="text-gold-600 font-bold text-sm">{item.year}</span>
                  <h4 className="font-semibold text-navy-900 mt-1">{item.title}</h4>
                  <p className="text-navy-600 text-sm mt-1">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
