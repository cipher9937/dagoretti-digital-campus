"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const events = [
  {
    id: '1',
    title: 'Annual Sports Day 2024',
    date: 'June 15, 2024',
    time: '8:00 AM - 5:00 PM',
    location: 'School Sports Ground',
    category: 'Sports',
    description: 'Our annual inter-house sports competition featuring athletics, football, basketball, and more.',
  },
  {
    id: '2',
    title: 'Career Day & University Fair',
    date: 'July 20, 2024',
    time: '9:00 AM - 4:00 PM',
    location: 'Kenyatta Hall',
    category: 'Academic',
    description: 'Form 4 students meet with university representatives and industry professionals.',
  },
  {
    id: '3',
    title: 'Music & Drama Festival',
    date: 'August 10, 2024',
    time: '2:00 PM - 6:00 PM',
    location: 'School Amphitheatre',
    category: 'Cultural',
    description: 'Annual celebration of performing arts featuring choirs, drama, and traditional dances.',
  },
];

export function UpcomingEvents() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">School Calendar</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4">Upcoming Events</h2>
          </div>
          <Link href="/events">
            <Button variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-100">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
              className="bg-white border border-navy-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0 w-20 h-20 bg-navy-900 rounded-xl flex flex-col items-center justify-center text-white">
                  <span className="text-2xl font-bold">{event.date.split(' ')[1].replace(',', '')}</span>
                  <span className="text-xs uppercase">{event.date.split(' ')[0].slice(0, 3)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-navy-600 text-sm mb-3">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-navy-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <Link href={`/events/${event.id}`}>
                  <Button variant="outline" size="sm" className="shrink-0 border-navy-200 hover:bg-navy-50">
                    Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
