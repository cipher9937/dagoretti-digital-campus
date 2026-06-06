"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock, Globe, Building2 } from 'lucide-react';

const details = [
  { icon: Building2, title: 'School Name', content: 'Dagoretti High School', subtext: 'National School · Nairobi, Kenya' },
  { icon: MapPin, title: 'Physical Address', content: 'Waithaka, Dagoretti South Constituency', subtext: 'Nairobi County, Kenya' },
  { icon: Globe, title: 'Postal Address', content: 'P.O. Box 21070 – 00505', subtext: 'Nairobi, Kenya' },
  { icon: Phone, title: 'Phone Numbers', content: '+254 (0) 733 643 666', subtext: 'Office Hours: Mon-Fri 8AM-5PM' },
  { icon: Mail, title: 'Email Address', content: 'dagorettischool@gmail.com', subtext: 'For general inquiries and admissions' },
  { icon: Clock, title: 'Office Hours', content: 'Monday - Friday: 8:00 AM - 5:00 PM', subtext: 'Saturday: 8:00 AM - 12:00 PM' },
];

export function ContactDetails() {
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
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Contact Information</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mt-4 mb-6">
            How to Reach Us
          </h2>
          <p className="text-navy-600 leading-relaxed">
            We are here to answer your questions about admissions, academics, and school life. 
            Contact us through any of the channels below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-navy-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                <detail.icon className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-1">{detail.title}</h3>
              <p className="text-navy-800 font-medium">{detail.content}</p>
              <p className="text-sm text-navy-500 mt-1">{detail.subtext}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
