"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Eye, Share2, Bookmark } from 'lucide-react';

export function NewsArticle({ news }: { news: any }) {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container-padding mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/news" className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-900 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>

          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <img
              src={news.image || 'https://kimi-web-img.moonshot.cn/img/cdn.thekenyatimes.com/9b88cd310e442dd21c1bd70f392cd84e3784e3b6.png'}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-gold-500 text-navy-900 text-xs font-semibold rounded-full">
                {news.category || 'News'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 text-sm text-navy-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {news.date || 'Recent'}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {news.views || 0} views
              </span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-navy-50 text-navy-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-navy-50 text-navy-600 transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-6">
            {news.title}
          </h1>

          <div className="prose prose-navy max-w-none">
            <p className="text-lg text-navy-600 leading-relaxed mb-6">
              {news.content || news.excerpt}
            </p>
            <p className="text-navy-600 leading-relaxed mb-4">
              Dagoretti High School continues to maintain its position as one of Kenya's premier national schools, 
              consistently delivering excellence in academics, sports, and co-curricular activities. This latest 
              development further cements our commitment to providing world-class education and facilities for our students.
            </p>
            <p className="text-navy-600 leading-relaxed">
              Under the leadership of Chief Principal Lawrence Nyakweba, the school has seen remarkable growth in 
              infrastructure, academic performance, and student welfare. The entire school community remains 
              dedicated to upholding the motto "Elimu Ni Mali" and preparing the next generation of Kenyan leaders.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
