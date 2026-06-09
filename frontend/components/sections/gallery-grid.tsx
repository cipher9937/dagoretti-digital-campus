"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Camera, Filter, Grid3X3, LayoutList, X } from 'lucide-react';

const galleryImages = [
  { src: 'https://kimi-web-img.moonshot.cn/img/pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/9a81e3556ad028e903fe1515cb192ed257cf9309.jpeg', title: 'School Main Gate', category: 'Campus', description: 'The iconic entrance to Dagoretti High School' },
  { src: 'https://kimi-web-img.moonshot.cn/img/pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/27088506718c764e28efd629b47abde9d1b5caf2.jpeg', title: 'Kenyatta Hall', category: 'Facilities', description: 'Our main assembly and examination hall' },
  { src: 'https://kimi-web-img.moonshot.cn/img/giantsofafrica.org/2f013b4e5a8954e8a33f4335023da5d5d8738411.jpg', title: 'Giants of Africa Basketball Court', category: 'Sports', description: 'World-class basketball facility donated by Giants of Africa' },
  { src: 'https://kimi-web-img.moonshot.cn/img/giantsofafrica.org/fab02811fe69582b2705ad80f74d4dc6dabb44bc.jpg', title: 'Basketball Court Aerial View', category: 'Sports', description: 'Aerial view of the state-of-the-art basketball court' },
  { src: 'https://kimi-web-img.moonshot.cn/img/nation.africa/f224c56a162358bb90c957fc2aa36084e5715339.jpg', title: 'Sports Ground', category: 'Sports', description: 'Multi-purpose sports ground for athletics and football' },
  { src: 'https://kimi-web-img.moonshot.cn/img/cdn.thekenyatimes.com/1574ac516ae658c0c02a5e99f10ed436b69913c1.jpg', title: 'School Gate', category: 'Campus', description: 'Main entrance with school signage' },
  { src: 'https://kimi-web-img.moonshot.cn/img/cdn.thekenyatimes.com/9b88cd310e442dd21c1bd70f392cd84e3784e3b6.png', title: 'Academic Excellence', category: 'Academic', description: 'Students engaged in learning activities' },
  { src: 'https://kimi-web-img.moonshot.cn/img/pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/8f76c62724c1d7361e0105396f081a9f14e930e9.jpeg', title: 'CBC Grade 10 Launch', category: 'Academic', description: 'Launch of the Competency-Based Curriculum program' },
];

const categories = ['All', 'Campus', 'Facilities', 'Sports', 'Academic', 'Events'];

export function GalleryGrid() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-navy-500" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-navy-900 text-white'
                      : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-700'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-700'}`}
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.05 + index * 0.05 }}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                  viewMode === 'grid' ? (index === 0 ? 'md:col-span-2 md:row-span-2' : '') : 'flex gap-6'
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <div className={`relative overflow-hidden rounded-xl ${viewMode === 'list' ? 'w-48 h-32 shrink-0' : ''}`}>
                  <img
                    src={image.src}
                    alt={image.title}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                      viewMode === 'grid' ? 'h-64' : 'h-full'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-2 py-1 bg-gold-500 text-navy-900 text-xs font-semibold rounded mb-2 inline-block">
                        {image.category}
                      </span>
                      <h3 className="text-white font-semibold">{image.title}</h3>
                      <p className="text-navy-300 text-sm">{image.description}</p>
                    </div>
                  </div>
                </div>
                {viewMode === 'list' && (
                  <div className="flex-1 py-2">
                    <span className="px-2 py-1 bg-gold-100 text-gold-700 text-xs font-semibold rounded mb-2 inline-block">
                      {image.category}
                    </span>
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">{image.title}</h3>
                    <p className="text-navy-600 text-sm">{image.description}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <Camera className="w-12 h-12 text-navy-300 mx-auto mb-4" />
              <p className="text-navy-500">No images found in this category.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-navy-950/95 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <span className="px-3 py-1 bg-gold-500 text-navy-900 text-sm font-semibold rounded-full">
                {selectedImage.category}
              </span>
              <h3 className="text-white text-xl font-semibold mt-2">{selectedImage.title}</h3>
              <p className="text-navy-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
