"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactDetails = [
  { icon: MapPin, title: 'Address', content: 'P.O. Box 21070 – 00505
Waithaka, Dagoretti South
Nairobi, Kenya', color: 'bg-blue-50' },
  { icon: Phone, title: 'Phone', content: '+254 (0) 733 643 666
+254 (0) 722 000 000', color: 'bg-emerald-50' },
  { icon: Mail, title: 'Email', content: 'dagorettischool@gmail.com
info@dagorettihigh.ac.ke', color: 'bg-amber-50' },
  { icon: Clock, title: 'Office Hours', content: 'Mon - Fri: 8:00 AM - 5:00 PM
Sat: 8:00 AM - 12:00 PM', color: 'bg-rose-50' },
];

export function ContactInfo() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            Contact Information
          </h2>
          <p className="text-navy-600 leading-relaxed">
            We welcome inquiries from prospective students, parents, alumni, and partners. 
            Reach out to us through any of the following channels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className={`${detail.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              <detail.icon className="w-8 h-8 text-navy-700 mb-4" />
              <h3 className="font-semibold text-navy-900 mb-2">{detail.title}</h3>
              <p className="text-sm text-navy-600 whitespace-pre-line">{detail.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
