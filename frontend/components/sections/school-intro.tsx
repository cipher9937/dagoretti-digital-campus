'use client';

import { School, MapPin, Calendar, Award } from 'lucide-react';

const features = [
  { icon: School, title: 'National School', description: 'One of Kenya premier national schools with a rich heritage of academic excellence.' },
  { icon: MapPin, title: 'Nairobi Location', description: 'Located in Waithaka, Dagoretti South Constituency, Nairobi County.' },
  { icon: Calendar, title: 'Since 1929', description: 'Founded in 1929, officially inaugurated as a high school in 1963.' },
  { icon: Award, title: 'Top Performer', description: 'Consistently ranked among the top 500 schools nationally in KCSE examinations.' },
];

export function SchoolIntro() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Dagoretti High School</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Dagoretti High School is a leading national secondary school in Nairobi, Kenya,
            committed to nurturing academic excellence, leadership, and character in every student.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}