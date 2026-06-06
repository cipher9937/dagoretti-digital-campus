"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, MapPin, Filter } from 'lucide-react';
import { useState } from 'react';

const events = [
  {
    id: '1',
    title: 'Annual Sports Day 2024',
    date: 'June 15, 2024',
    time: '8:00 AM - 5:00 PM',
    location: 'School Sports Ground',
    category: 'Sports',
    description: 'Our annual inter-house sports competition featuring athletics, football, basketball, and more.',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Career Day & University Fair',
    date: 'July 20, 2024',
    time: '9:00 AM - 4:00 PM',
    location: 'Kenyatta Hall',
    category: 'Academic',
    description: 'Form 4 students meet with university representatives and industry professionals.',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Music & Drama Festival',
    date: 'August 10, 2024',
    time: '2:00 PM - 6:00 PM',
    location: 'School Amphitheatre',
    category: 'Cultural',
    description: 'Annual celebration of performing arts featuring choirs, drama, and traditional dances.',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Founders Day Celebration',
    date: 'September 21, 2024',
    time: '10:00 AM - 3:00 PM',
    location: 'School Assembly Ground',
    category: 'Community',
    description: 'Commemorating the founding of the school in 1929 and its rich history.',
    status: 'upcoming',
  },
  {
    id: '5',
    title: 'KCSE Mock Examinations',
    date: 'October 1-15, 2024',
    time: '8:00 AM - 4:00 PM',
    location: 'Examination Halls',
    category: 'Academic',
    description: 'Form 4 students sit for their mock examinations in preparation for the national exams.',
    status: 'upcoming',
  },
  {
    id: '6',
    title: 'Christmas Carol Service',
    date: 'December 20, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'School Chapel',
    category: 'Religious',
    description: 'Annual Christmas celebration with carols, scripture readings, and fellowship.',
    status: 'upcoming',
  },
];

const categories = ['All', 'Sports', 'Academic', 'Cultural', 'Community', 'Religious'];

export function EventsCalendar() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredEvents = activeCategory === 'All' 
    ? events 
    : events.filter((e) => e.category === activeCategory);

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Calendar</span>
              <h2 className="text-3xl font-bold text-navy-900 mt-2">Upcoming Events</h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-navy-500" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-navy-900 text-white'
                      : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="bg-white border border-navy-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
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
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                        Upcoming
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">{event.title}</h3>
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
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-navy-300 mx-auto mb-4" />
              <p className="text-navy-500">No events found in this category.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
