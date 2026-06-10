'use client';

import { Calendar, MapPin } from 'lucide-react';

const pastEvents = [
  { title: 'KCSE 2023 Results Celebration', date: 'January 10, 2024', description: 'Celebrating outstanding KCSE results with students, parents, and staff.' },
  { title: 'Giants of Africa Court Launch', date: 'January 20, 2023', description: 'Official unveiling of the world-class basketball court donated by Giants of Africa.' },
  { title: 'Alumni Reunion 2023', date: 'December 15, 2023', description: 'Annual gathering of former students to celebrate the school legacy and contribute to development.' },
  { title: 'Science Congress 2023', date: 'August 20, 2023', description: 'Students showcased innovative projects at the regional Science Congress, winning multiple awards.' },
  { title: 'Sports Day 2023', date: 'June 18, 2023', description: 'Annual inter-house sports competition with outstanding performances in athletics and team sports.' },
  { title: 'Career Day 2023', date: 'July 22, 2023', description: 'University representatives and industry professionals engaged with Form 4 students on career paths.' },
];

const upcomingEvents = [
  { title: 'Term 2 Opening Day', date: 'May 6, 2024', location: 'Main School Ground', category: 'Academic' },
  { title: 'Inter-House Athletics', date: 'May 25, 2024', location: 'School Ground', category: 'Sports' },
  { title: 'Parent-Teacher Meeting', date: 'June 8, 2024', location: 'School Hall', category: 'Parents' },
  { title: 'Mid-Term Examinations', date: 'June 17, 2024', location: 'All Classrooms', category: 'Academic' },
];

export function EventsList() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upcoming */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="flex gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-900 text-white rounded-xl flex flex-col items-center justify-center text-xs font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h2>
            <div className="space-y-3">
              {pastEvents.map((event) => (
                <div key={event.title} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm">{event.title}</h3>
                  <p className="text-xs text-blue-600 mt-0.5">{event.date}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}