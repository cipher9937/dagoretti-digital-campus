"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, GraduationCap, Trophy, Users } from 'lucide-react';

const stats = [
  { icon: Users, value: '1,200+', label: 'Students' },
  { icon: GraduationCap, value: '95%', label: 'KCSE Pass Rate' },
  { icon: Trophy, value: 'Top 500', label: 'National Rank' },
  { icon: BookOpen, value: '1929', label: 'Established' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://kimi-web-img.moonshot.cn/img/pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/9a81e3556ad028e903fe1515cb192ed257cf9309.jpeg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-800/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container-padding mx-auto max-w-7xl pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 border border-gold-500/30 rounded-full text-gold-300 text-sm font-medium mb-6">
                <Trophy className="w-4 h-4" />
                National School · Nairobi, Kenya
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
            >
              Dagoretti
              <span className="block text-gold-400">High School</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-navy-200 max-w-xl leading-relaxed"
            >
              A National School committed to academic excellence, leadership development, 
              and holistic education. Where discipline meets prestige, and dreams take flight 
              since 1929.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/about">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold px-8">
                  Discover Our School
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/academics">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                  Academic Programs
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="pt-8 border-t border-white/10"
            >
              <p className="text-gold-400 font-serif text-xl italic">
                "Elimu Ni Mali" — Education is Wealth
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-gold-400 mb-3" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-navy-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
