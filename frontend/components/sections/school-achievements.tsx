"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Medal, Star, Award } from 'lucide-react';

const achievements = [
  { year: '2024', title: 'KCSE Top 500 National Ranking', description: 'Maintained position among top 500 schools nationally in KCSE examinations.', icon: Trophy },
  { year: '2023', title: 'Giants of Africa Basketball Court', description: 'Unveiled world-class basketball facility donated by Masai Ujiri's foundation.', icon: Medal },
  { year: '2022', title: 'CBC Grade 10 Pioneer', description: 'Successfully transitioned to Competency-Based Curriculum as a pioneer school.', icon: Star },
  { year: '2021', title: 'Science Congress Champions', description: 'Won regional awards at the Nairobi Science Congress for innovative projects.', icon: Award },
  { year: '2020', title: 'Digital Infrastructure Upgrade', description: 'Launched modern computer laboratory with 50 PCs and high-speed internet.', icon: Trophy },
  { year: '2019', title: 'Music Festival Excellence', description: 'National recognition in the Kenya Music Festival for choir and traditional dance.', icon: Medal },
];

export function SchoolAchievements() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Our Achievements</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            A Legacy of Success
          </h2>
          <p className="text-navy-600 leading-relaxed">
            From academic excellence to sports championships, our students and school continue 
            to achieve remarkable milestones that shape the future of Kenya.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-white border border-navy-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors duration-300">
                  <achievement.icon className="w-6 h-6 text-gold-600 group-hover:text-navy-900 transition-colors" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gold-600">{achievement.year}</span>
                  <h3 className="font-semibold text-navy-900 mt-1 mb-2">{achievement.title}</h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
