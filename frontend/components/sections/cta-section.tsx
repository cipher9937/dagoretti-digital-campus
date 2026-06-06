"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, School } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900">
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <School className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Join the Dagoretti High School Family
          </h2>
          <p className="text-navy-200 text-lg leading-relaxed mb-8">
            Experience world-class education, state-of-the-art facilities, and a supportive community 
            that nurtures academic excellence and character development. Your journey to greatness starts here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold px-8">
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
