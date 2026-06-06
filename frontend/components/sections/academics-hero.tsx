"use client"

import { motion } from 'framer-motion';

export function AcademicsHero() {
  return (
    <section className="relative pt-32 pb-20 bg-navy-950">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://kimi-web-img.moonshot.cn/img/pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/27088506718c764e28efd629b47abde9d1b5caf2.jpeg')] bg-cover bg-center" />
      </div>
      <div className="container-padding mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Academic Programs</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Academic Excellence
          </h1>
          <p className="text-navy-200 text-lg leading-relaxed">
            Comprehensive curriculum spanning both 8-4-4 and CBC systems, 
            delivered by qualified professionals with modern facilities.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
