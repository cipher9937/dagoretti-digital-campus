'use client';

import { Eye, Calendar } from 'lucide-react';
import Link from 'next/link';

const newsItems = [
  {
    slug: 'kcse-2023-results',
    title: 'Dagoretti High School Shines in KCSE 2023',
    excerpt: 'Outstanding performance with multiple students achieving straight As in the national examinations.',
    category: 'Academic Excellence',
    date: 'February 1, 2024',
    views: 1243,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=60',
  },
  {
    slug: 'giants-of-africa-court',
    title: 'Giants of Africa Donates World-Class Basketball Court',
    excerpt: 'NBA executive Masai Ujiri foundation unveils a state-of-the-art basketball facility at our school.',
    category: 'Infrastructure',
    date: 'January 20, 2024',
    views: 987,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&auto=format&fit=crop&q=60',
  },
  {
    slug: 'alumni-reunion-2024',
    title: 'Alumni Reunion 2024: Celebrating 62 Years of Excellence',
    excerpt: 'Former students gathered to celebrate the school rich history and contribute to its future.',
    category: 'Community',
    date: 'March 15, 2024',
    views: 856,
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&auto=format&fit=crop&q=60',
  },
  {
    slug: 'cbc-grade-10-pioneer',
    title: 'Dagoretti Leads CBC Implementation as Pioneer School',
    excerpt: 'Successfully transitioned to the Competency-Based Curriculum with Grade 10 students excelling.',
    category: 'Academic',
    date: 'March 1, 2024',
    views: 654,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&auto=format&fit=crop&q=60',
  },
  {
    slug: 'science-congress-2024',
    title: 'Students Win Big at Nairobi Regional Science Congress',
    excerpt: 'Our students scooped multiple awards for innovative STEM projects at the regional competition.',
    category: 'Academic Excellence',
    date: 'February 20, 2024',
    views: 521,
    image: 'https://images.unsplash.com/photo-1532094349884-543559196f94?w=400&auto=format&fit=crop&q=60',
  },
  {
    slug: 'digital-library-launch',
    title: 'New Digital Library and E-Learning Platform Launched',
    excerpt: 'Students now have access to thousands of digital resources through our new online learning platform.',
    category: 'Technology',
    date: 'February 10, 2024',
    views: 432,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60',
  },
];

const categoryColors: Record<string, string> = {
  'Academic Excellence': 'bg-blue-100 text-blue-700',
  'Infrastructure': 'bg-green-100 text-green-700',
  'Community': 'bg-purple-100 text-purple-700',
  'Academic': 'bg-yellow-100 text-yellow-700',
  'Technology': 'bg-red-100 text-red-700',
};

export function NewsGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Link key={item.slug} href={`/news/${item.slug}`}>
              <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[item.category] || 'bg-gray-100 text-gray-700'}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.views}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}