"use client"

import { motion } from 'framer-motion';

export function NewsHero() {
  return (
    <section className="relative pt-32 pb-20 bg-navy-950">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://kimi-web-img.moonshot.cn/img/cdn.thekenyatimes.com/9b88cd310e442dd21c1bd70f392cd84e3784e3b6.png')] bg-cover bg-center" />
      </div>
      <div className="container-padding mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Latest Updates</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            News & Announcements
          </h1>
          <p className="text-navy-200 text-lg leading-relaxed">
            Stay informed with the latest news, achievements, and updates from Dagoretti High School.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
