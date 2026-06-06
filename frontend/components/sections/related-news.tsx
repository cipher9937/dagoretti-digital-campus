"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

const relatedItems = [
  {
    slug: 'giants-of-africa-basketball-court',
    title: 'Giants of Africa Unveil World-Class Basketball Court',
    category: 'Sports',
    date: 'January 20, 2023',
    image: 'https://kimi-web-img.moonshot.cn/img/giantsofafrica.org/2f013b4e5a8954e8a33f4335023da5d5d8738411.jpg',
  },
  {
    slug: 'cbc-grade-10-launch',
    title: 'CBC Transition: Grade 10 Program Launched Successfully',
    category: 'Curriculum',
    date: 'February 1, 2024',
    image: 'https://kimi-web-img.moonshot.cn/img/pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/8f76c62724c1d7361e0105396f081a9f14e930e9.jpeg',
  },
  {
    slug: 'science-congress-2024',
    title: 'Science Congress 2024: Students Win Regional Awards',
    category: 'Academic Excellence',
    date: 'May 20, 2024',
    image: 'https://kimi-web-img.moonshot.cn/img/cdn.thekenyatimes.com/9b88cd310e442dd21c1bd70f392cd84e3784e3b6.png',
  },
];

export function RelatedNews({ currentSlug }: { currentSlug: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const filtered = relatedItems.filter((item) => item.slug !== currentSlug).slice(0, 3);

  return (
    <section className="section-padding bg-navy-50" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-navy-900 mb-8">Related News</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map((news, index) => (
              <motion.article
                key={news.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-gold-600">{news.category}</span>
                  <h3 className="font-semibold text-navy-900 mt-1 mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors">
                    {news.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-navy-500">
                    <Calendar className="w-3 h-3" />
                    {news.date}
                  </div>
                  <Link href={`/news/${news.slug}`} className="text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors flex items-center gap-1 mt-3">
                    Read More <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
