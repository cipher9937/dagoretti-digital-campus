"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, GraduationCap, BookOpen } from 'lucide-react';

const terms = [
  {
    term: 'Term 1',
    period: 'January - April',
    events: ['School Opening', 'Mid-Term Examinations', 'Science Congress', 'Term End Examinations'],
    status: 'Completed',
  },
  {
    term: 'Term 2',
    period: 'May - August',
    events: ['School Opening', 'Sports Day', 'Career Day', 'Mock Examinations (Form 4)', 'Term End Examinations'],
    status: 'Current',
  },
  {
    term: 'Term 3',
    period: 'September - November',
    events: ['School Opening', 'KCSE Examinations (Form 4)', 'Grade 10 Assessments', 'Closing Day', 'Graduation Ceremony'],
    status: 'Upcoming',
  },
];

export function AcademicCalendar() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Schedule</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Academic Calendar 2024
          </h2>
          <p className="text-navy-600 leading-relaxed">
            The academic year is structured into three terms with key examination dates, 
            co-curricular activities, and important school events.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {terms.map((term, index) => (
            <motion.div
              key={term.term}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
              className={`rounded-xl p-6 border-2 transition-all duration-300 ${
                term.status === 'Current' 
                  ? 'border-gold-500 bg-gold-50' 
                  : 'border-navy-100 bg-white hover:border-navy-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-gold-400" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  term.status === 'Current' 
                    ? 'bg-gold-500 text-navy-900' 
                    : term.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-navy-100 text-navy-700'
                }`}>
                  {term.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-1">{term.term}</h3>
              <p className="text-sm text-navy-500 mb-4">{term.period}</p>
              <ul className="space-y-2">
                {term.events.map((event) => (
                  <li key={event} className="text-sm text-navy-600 flex items-center gap-2">
                    <Clock className="w-3 h-3 text-gold-500 shrink-0" />
                    {event}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
