"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, Calendar, Eye, Search } from 'lucide-react';
import { useState } from 'react';

const newsItems = [
  {
    slug: 'giants-of-africa-basketball-court',
    title: 'Giants of Africa Unveil World-Class Basketball Court',
    excerpt: 'A state-of-the-art basketball facility donated by Giants of Africa is now open for our students.',
    category: 'Sports',
    date: 'January 20, 2023',
    views: 2103,
    image: 'https://kimi-web-img.moonshot.cn/img/giantsofafrica.org/2f013b4e5a8954e8a33f4335023da5d5d8738411.jpg',
  },
  {
    slug: 'cbc-grade-10-launch',
    title: 'CBC Transition: Grade 10 Program Launched Successfully',
    excerpt: 'Our school has successfully transitioned to the Competency-Based Curriculum with the launch of Grade 10.',
    category: 'Curriculum',
    date: 'February 1, 2024',
    views: 987,
    image: 'https://kimi-web-img.moonshot.cn/img/pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/8f76c62724c1d7361e0105396f081a9f14e930e9.jpeg',
  },
  {
    slug: 'alumni-reunion-2024',
    title: 'Alumni Reunion 2024: Celebrating 62 Years of Excellence',
    excerpt: 'Former students gathered to celebrate the school's rich history and contribute to its future.',
    category: 'Community',
    date: 'March 15, 2024',
    views: 856,
    image: 'https://kimi-web-img.moonshot.cn/img/pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/9a81e3556ad028e903fe1515cb192ed257cf9309.jpeg',
  },
  {
    slug: 'new-computer-lab',
    title: 'New Computer Laboratory Equipped with 50 Modern PCs',
    excerpt: 'Our ICT infrastructure has been significantly upgraded with a new computer laboratory.',
    category: 'Infrastructure',
    date: 'April 10, 2024',
    views: 743,
    image: 'https://kimi-web-img.moonshot.cn/img/pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/27088506718c764e28efd629b47abde9d1b5caf2.jpeg',
  },
  {
    slug: 'science-congress-2024',
    title: 'Science Congress 2024: Students Win Regional Awards',
    excerpt: 'Our students showcased innovative projects at the regional Science Congress.',
    category: 'Academic Excellence',
    date: 'May 20, 2024',
    views: 632,
    image: 'https://kimi-web-img.moonshot.cn/img/cdn.thekenyatimes.com/9b88cd310e442dd21c1bd70f392cd84e3784e3b6.png',
  },
  {
    slug: 'music-festival-success',
    title: 'Kenya Music Festival: National Recognition for Choir',
    excerpt: 'Our school choir and traditional dance group received national recognition at the Kenya Music Festival.',
    category: 'Arts',
    date: 'June 5, 2024',
    views: 521,
    image: 'https://kimi-web-img.moonshot.cn/img/nation.africa/f224c56a162358bb90c957fc2aa36084e5715339.jpg',
  },
];

const categories = ['All', 'Academic Excellence', 'Sports', 'Curriculum', 'Community', 'Infrastructure', 'Arts'];

export function NewsGrid() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = newsItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="section-padding bg-navy-50" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy-400 text-navy-900"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-navy-900 text-white'
                      : 'bg-white text-navy-700 hover:bg-navy-50 border border-navy-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news, index) => (
              <motion.article
                key={news.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gold-500 text-navy-900 text-xs font-semibold rounded-full">
                      {news.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-navy-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {news.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {news.views}
                    </span>
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-navy-600 line-clamp-2 mb-4">{news.excerpt}</p>
                  <Link href={`/news/${news.slug}`} className="text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors flex items-center gap-1">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-navy-500">No news articles found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
