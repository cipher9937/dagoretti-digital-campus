"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, CheckCircle } from 'lucide-react';

const pastEvents = [
  { title: 'KCSE 2023 Results Celebration', date: 'January 10, 2024', description: 'Celebrating outstanding KCSE results with students, parents, and staff.' },
  { title: 'Giants of Africa Court Launch', date: 'January 20, 2023', description: 'Official unveiling of the world-class basketball court donated by Giants of Africa.' },
  { title: 'Alumni Reunion 2023', date: 'December 15, 2023', description: 'Annual gathering of former students to celebrate the school's legacy and contribute to development.' },
  { title: 'Science Congress 2023', date: 'August 20, 2023', description: 'Students showcased innovative projects at the regional Science Congress, winning multiple awards.' },
  { title: 'Sports Day 2023', date: 'June 18, 2023', description: 'Annual inter-house sports competition with outstanding performances in athletics and team sports.' },
  { title: 'Career Day 2023', date: 'July 22, 2023', description: 'University representatives and industry professionals engaged with Form 4 students on career paths.' },
];

export function EventsList() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-navy-50" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12">
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Past Events</span>
            <h2 className="text-3xl font-bold text-navy-900 mt-2">Event History</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-navy-400" />
                      <span className="text-sm text-navy-500">{event.date}</span>
                    </div>
                    <h3 className="font-semibold text-navy-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-navy-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
