"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { School, MapPin, Calendar, Award } from 'lucide-react';

const features = [
  { icon: School, title: 'National School', description: 'One of Kenya's premier national schools with a rich heritage of academic excellence.' },
  { icon: MapPin, title: 'Nairobi Location', description: 'Located in Waithaka, Dagoretti South Constituency, Nairobi County.' },
  { icon: Calendar, title: 'Since 1929', description: 'Founded in 1929, officially inaugurated as a high school in 1963.' },
  { icon: Award, title: 'Top Performer', description: 'Consistently ranked among the top 500 schools nationally in KCSE examinations.' },
];

export function SchoolIntro() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">About Our School</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 leading-tight">
              A Legacy of Excellence in
              <span className="text-gold-500"> Kenyan Education</span>
            </h2>
            <p className="text-navy-600 leading-relaxed text-lg">
              Dagoretti High School is a National School in Nairobi, Kenya, committed to providing 
              quality education that nurtures academic excellence, leadership, and character development. 
              Our school has produced leaders in various fields who continue to shape the nation.
            </p>
            <p className="text-navy-600 leading-relaxed">
              With a student population of over 1,200 boys, we offer both the 8-4-4 curriculum (Form 3-4) 
              and the Competency-Based Curriculum (CBC Grade 10), ensuring our students are prepared 
              for the evolving educational landscape.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900">1,200+</div>
                <div className="text-sm text-navy-500">Students</div>
              </div>
              <div className="w-px bg-navy-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900">80+</div>
                <div className="text-sm text-navy-500">Teachers</div>
              </div>
              <div className="w-px bg-navy-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900">95%</div>
                <div className="text-sm text-navy-500">Pass Rate</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-navy-50 rounded-xl p-6 hover:bg-navy-100 transition-colors duration-300"
              >
                <feature.icon className="w-8 h-8 text-gold-500 mb-4" />
                <h3 className="font-semibold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-navy-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
