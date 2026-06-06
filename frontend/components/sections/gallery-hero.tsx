"use client"

import { motion } from 'framer-motion';

export function GalleryHero() {
  return (
    <section className="relative pt-32 pb-20 bg-navy-950">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://kimi-web-img.moonshot.cn/img/giantsofafrica.org/2f013b4e5a8954e8a33f4335023da5d5d8738411.jpg')] bg-cover bg-center" />
      </div>
      <div className="container-padding mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Campus Life</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            School Gallery
          </h1>
          <p className="text-navy-200 text-lg leading-relaxed">
            Explore photos of our campus, facilities, events, sports, and the vibrant life at Dagoretti High School.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
