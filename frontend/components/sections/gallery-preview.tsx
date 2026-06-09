"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const galleryImages = [
  { src: 'https://kimi-web-img.moonshot.cn/img/pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/9a81e3556ad028e903fe1515cb192ed257cf9309.jpeg', title: 'School Main Building', category: 'Campus' },
  { src: 'https://kimi-web-img.moonshot.cn/img/pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/27088506718c764e28efd629b47abde9d1b5caf2.jpeg', title: 'Kenyatta Hall', category: 'Facilities' },
  { src: 'https://kimi-web-img.moonshot.cn/img/giantsofafrica.org/2f013b4e5a8954e8a33f4335023da5d5d8738411.jpg', title: 'Basketball Court', category: 'Sports' },
  { src: 'https://kimi-web-img.moonshot.cn/img/nation.africa/f224c56a162358bb90c957fc2aa36084e5715339.jpg', title: 'Sports Ground', category: 'Sports' },
  { src: 'https://kimi-web-img.moonshot.cn/img/giantsofafrica.org/fab02811fe69582b2705ad80f74d4dc6dabb44bc.jpg', title: 'Giants of Africa Court', category: 'Sports' },
  { src: 'https://kimi-web-img.moonshot.cn/img/cdn.thekenyatimes.com/1574ac516ae658c0c02a5e99f10ed436b69913c1.jpg', title: 'School Gate', category: 'Campus' },
];

export function GalleryPreview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-navy-950" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Campus Life</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4">School Gallery</h2>
          </div>
          <Link href="/gallery">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Camera className="w-4 h-4 mr-2" />
              View Gallery
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 bg-gold-500 text-navy-900 text-xs font-semibold rounded mb-2 inline-block">
                    {image.category}
                  </span>
                  <h3 className="text-white font-semibold">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
