"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, Calendar, Eye } from 'lucide-react';

const featuredArticle = {
  slug: 'dagoretti-top-500-kcse-2024',
  title: 'Dagoretti High School Ranks Among Top 500 in KCSE 2024',
  excerpt: 'Our students have once again demonstrated academic excellence in the national examinations, maintaining our position among the top 500 schools nationally. This achievement reflects the dedication of our students, teachers, and the entire school community.',
  category: 'Academic Excellence',
  date: 'January 15, 2024',
  views: 1245,
  image: 'https://kimi-web-img.moonshot.cn/img/cdn.thekenyatimes.com/9b88cd310e442dd21c1bd70f392cd84e3784e3b6.png',
};

export function FeaturedNews() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Featured Story</span>
          <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-gold-500 text-navy-900 text-xs font-semibold rounded-full">
                  {featuredArticle.category}
                </span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm text-navy-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {featuredArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {featuredArticle.views} views
                </span>
              </div>
              <h2 className="text-3xl font-bold text-navy-900 leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-navy-600 leading-relaxed text-lg">
                {featuredArticle.excerpt}
              </p>
              <Link href={`/news/${featuredArticle.slug}`}>
                <span className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600 transition-colors">
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
