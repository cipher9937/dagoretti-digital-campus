"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

export function PrincipalMessage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding bg-navy-950" ref={ref}>
      <div className="container-padding mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="relative">
              <div className="w-64 h-80 bg-navy-800 rounded-2xl overflow-hidden mx-auto">
                <div className="w-full h-full bg-gradient-to-b from-navy-700 to-navy-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gold-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-navy-900">LN</span>
                    </div>
                    <p className="text-white font-semibold">Lawrence Nyakweba</p>
                    <p className="text-navy-300 text-sm">Chief Principal</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gold-500 rounded-xl flex items-center justify-center">
                <Quote className="w-10 h-10 text-navy-900" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Principal's Message</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Welcome to Dagoretti High School
            </h2>
            <div className="space-y-4 text-navy-200 leading-relaxed">
              <p>
                It is with great pleasure that I welcome you to Dagoretti High School, a National School 
                that has stood the test of time since 1929. Our school has consistently produced outstanding 
                academic results, with our students regularly ranking among the top performers in the 
                Kenya Certificate of Secondary Education (KCSE) examinations.
              </p>
              <p>
                At Dagoretti, we believe in nurturing not just academic excellence but also character, 
                leadership, and discipline. Our motto, "Elimu Ni Mali" (Education is Wealth), reflects 
                our commitment to providing quality education that transforms lives and builds futures.
              </p>
              <p>
                We have embraced the Competency-Based Curriculum (CBC) for our Grade 10 students while 
                continuing to deliver excellence in the 8-4-4 system for Forms 3 and 4. Our state-of-the-art 
                facilities, including the Giants of Africa basketball court, modern computer laboratories, 
                and well-equipped science labs, ensure our students have the best resources for learning.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-gold-400 font-semibold">Lawrence Nyakweba</p>
              <p className="text-navy-400 text-sm">Chief Principal</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
