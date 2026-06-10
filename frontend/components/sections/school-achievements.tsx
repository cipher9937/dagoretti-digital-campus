'use client';

import { Trophy, Medal, Star, Award } from 'lucide-react';

const achievements = [
  { year: '2024', title: 'KCSE Top 500 National Ranking', description: 'Maintained position among top 500 schools nationally in KCSE examinations.', icon: Trophy },
  { year: '2023', title: 'Giants of Africa Basketball Court', description: 'Unveiled world-class basketball facility donated by Masai Ujiri foundation.', icon: Medal },
  { year: '2022', title: 'CBC Grade 10 Pioneer', description: 'Successfully transitioned to Competency-Based Curriculum as a pioneer school.', icon: Star },
  { year: '2021', title: 'Science Congress Champions', description: 'Won regional awards at the Nairobi Science Congress for innovative projects.', icon: Award },
  { year: '2020', title: 'Digital Infrastructure Upgrade', description: 'Launched modern computer laboratory with 50 PCs and high-speed internet.', icon: Trophy },
];

export function SchoolAchievements() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A legacy of excellence spanning decades of academic and extracurricular achievement.
          </p>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div key={achievement.year} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">{achievement.year}</span>
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}