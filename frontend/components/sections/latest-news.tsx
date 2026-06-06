"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const newsItems = [
  {
    slug: 'dagoretti-top-500-kcse-2024',
    title: 'Dagoretti High School Ranks Among Top 500 in KCSE 2024',
    excerpt: 'Our students have once again demonstrated academic excellence in the national examinations.',
    category: 'Academic Excellence',
    date: 'January 15, 2024',
    views: 1245,
    image: 'https://kimi-web-img.moonshot.cn/img/cdn.thekenyatimes.com/9b88cd310e442dd21c1bd70f392cd84e3784e3b6.png',
  },
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
];

export function LatestNews() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-navy-50" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Latest Updates</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4">News & Announcements</h2>
          </div>
          <Link href="/news">
            <Button variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-100">
              View All News
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <motion.article
              key={news.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
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
      </div>
    </section>
  );
}
