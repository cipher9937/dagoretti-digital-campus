"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube, ExternalLink } from 'lucide-react';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'News & Updates', href: '/news' },
  { label: 'Events Calendar', href: '/events' },
  { label: 'Photo Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
];

const portalLinks = [
  { label: 'Student Portal', href: '/student-portal' },
  { label: 'Teacher Portal', href: '/teacher-portal' },
  { label: 'Admin Portal', href: '/admin-portal' },
  { label: 'Digital Library', href: '/library' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Main Footer */}
      <div className="container-padding mx-auto max-w-7xl py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* School Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-navy-900 font-bold text-xl">D</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Dagoretti High</h3>
                <p className="text-navy-300 text-sm">School · Est. 1929</p>
              </div>
            </div>
            <p className="text-navy-300 text-sm leading-relaxed">
              A National School in Nairobi, Kenya committed to academic excellence, 
              leadership development, and holistic education since 1929.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-gold-400">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-gold-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-gold-400">Portals</h4>
            <ul className="space-y-3">
              {portalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-gold-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-gold-400">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                <span className="text-navy-300 text-sm">
                  P.O. Box 21070 – 00505<br />
                  Waithaka, Dagoretti South<br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-500 shrink-0" />
                <span className="text-navy-300 text-sm">+254 (0) 733 643 666</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-500 shrink-0" />
                <span className="text-navy-300 text-sm">dagorettischool@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                <span className="text-navy-300 text-sm">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Sat: 8:00 AM - 12:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="container-padding mx-auto max-w-7xl py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-navy-400 text-sm">
              © {new Date().getFullYear()} Dagoretti High School. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-navy-400">
              <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Use</Link>
              <Link href="/sitemap" className="hover:text-gold-400 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
