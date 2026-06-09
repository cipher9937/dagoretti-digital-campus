"use client"

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Send, User, Mail, MessageSquare, Phone, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section className="section-padding bg-navy-50" ref={ref}>
      <div className="container-padding mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Send Us a Message</h2>
            <p className="text-navy-600 mb-8">Fill out the form below and we will get back to you as soon as possible.</p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-emerald-800 mb-2">Message Sent!</h3>
                <p className="text-emerald-600">Thank you for reaching out. We will respond to your inquiry within 24-48 hours.</p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy-400 text-navy-900"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy-400 text-navy-900"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy-400 text-navy-900"
                        placeholder="+254 7XX XXX XXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-2">Subject</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy-400 text-navy-900"
                      >
                        <option value="">Select a subject</option>
                        <option value="admissions">Admissions Inquiry</option>
                        <option value="academic">Academic Information</option>
                        <option value="general">General Inquiry</option>
                        <option value="alumni">Alumni Relations</option>
                        <option value="partnership">Partnership & Sponsorship</option>
                        <option value="feedback">Feedback & Suggestions</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-navy-400" />
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy-400 text-navy-900 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-navy-900 hover:bg-navy-800 text-white py-3"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
