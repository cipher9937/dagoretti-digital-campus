"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export function ContactMap() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-navy-100">
            <div className="p-6 border-b border-navy-100">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-gold-600" />
                <h2 className="text-xl font-bold text-navy-900">Our Location</h2>
              </div>
              <p className="text-navy-600">
                Dagoretti High School is located in Waithaka, Dagoretti South Constituency, Nairobi County, Kenya.
              </p>
            </div>

            {/* Google Maps Embed */}
            <div className="relative w-full h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8182!2d36.7384!3d-1.2965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a4b8e3e8f3f%3A0x7e3e8f3f8e3e8f3f!2sDagoretti%20High%20School!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dagoretti High School Location"
                className="absolute inset-0"
              />
            </div>

            <div className="p-6 bg-navy-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Getting Here</h3>
                  <p className="text-sm text-navy-600">
                    The school is accessible via Ngong Road and Dagoretti Road. Public transport (matatus) 
                    from Nairobi CBD to Waithaka are available. The school is approximately 10km from the city center.
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Dagoretti+High+School,Nairobi,Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors text-sm font-medium shrink-0"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
