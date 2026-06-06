"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Video, FileText, Download, Monitor, Library } from 'lucide-react';

const resources = [
  { icon: Library, title: 'Digital Library', description: 'Access thousands of e-books, journals, and research materials through our digital library platform.' },
  { icon: Video, title: 'Video Lectures', description: 'Recorded lessons and tutorials available for revision and self-paced learning across all subjects.' },
  { icon: FileText, title: 'Past Papers', description: 'Comprehensive collection of KCSE past papers, mock examinations, and revision materials.' },
  { icon: Download, title: 'Study Notes', description: 'Subject-specific notes, summaries, and revision guides prepared by our experienced teachers.' },
  { icon: Monitor, title: 'Online Classes', description: 'Live and recorded online classes with Google Meet integration for remote learning support.' },
  { icon: BookOpen, title: 'Textbooks', description: 'Digital textbooks and reference materials aligned with the current curriculum requirements.' },
];

export function LearningResources() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Resources</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Learning Resources
          </h2>
          <p className="text-navy-600 leading-relaxed">
            Comprehensive digital and physical resources to support student learning, 
            revision, and academic excellence across all subjects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-navy-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <resource.icon className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">{resource.title}</h3>
              <p className="text-sm text-navy-600 leading-relaxed">{resource.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
