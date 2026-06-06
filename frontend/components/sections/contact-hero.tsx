"use client"

import { motion } from 'framer-motion';

export function ContactHero() {
  return (
    <section className="relative pt-32 pb-20 bg-navy-950">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://kimi-web-img.moonshot.cn/img/cdn.thekenyatimes.com/1574ac516ae658c0c02a5e99f10ed436b69913c1.jpg')] bg-cover bg-center" />
      </div>
      <div className="container-padding mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Contact Us
          </h1>
          <p className="text-navy-200 text-lg leading-relaxed">
            We welcome inquiries from prospective students, parents, alumni, and partners. 
            Reach out to us through any of the following channels.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
