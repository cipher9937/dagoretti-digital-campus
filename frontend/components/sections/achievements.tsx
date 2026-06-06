"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Medal, Star, Award, TrendingUp, GraduationCap } from 'lucide-react';

const achievements = [
  { icon: Trophy, title: 'KCSE Excellence', description: 'Consistently ranked among the top 500 schools nationally in KCSE examinations for over a decade.', metric: 'Top 500' },
  { icon: Medal, title: 'Sports Champions', description: 'Regional basketball champions with the Giants of Africa court. Active participation in national sports competitions.', metric: 'Regional' },
  { icon: Star, title: 'Science Congress', description: 'Multiple awards at the Nairobi Regional Science Congress for innovative student projects and research.', metric: 'Awards' },
  { icon: Award, title: 'Music Festival', description: 'National recognition in the Kenya Music Festival for outstanding choir and traditional dance performances.', metric: 'National' },
  { icon: TrendingUp, title: 'CBC Pioneers', description: 'Among the first schools to successfully implement the Competency-Based Curriculum for Grade 10.', metric: 'Pioneer' },
  { icon: GraduationCap, title: 'Alumni Success', description: 'Graduates have become leaders in government, business, academia, and professional sports across Kenya and beyond.', metric: 'Leaders' },
];

export function Achievements() {
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
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Recognition</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4 mb-6">
            School Achievements
          </h2>
          <p className="text-navy-300 leading-relaxed">
            Our commitment to excellence has been recognized through numerous awards and achievements 
            across academics, sports, arts, and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-navy-800/50 rounded-xl p-6 border border-navy-700 hover:border-gold-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/20 rounded-lg flex items-center justify-center shrink-0">
                  <achievement.icon className="w-6 h-6 text-gold-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{achievement.title}</h3>
                    <span className="px-2 py-1 bg-gold-500/20 text-gold-400 text-xs font-bold rounded">
                      {achievement.metric}
                    </span>
                  </div>
                  <p className="text-navy-300 text-sm leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
