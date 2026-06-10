'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactDetails = [
  { icon: MapPin, title: 'Address', content: 'P.O. Box 21070 - 00505, Waithaka, Dagoretti South, Nairobi, Kenya', color: 'bg-blue-50' },
  { icon: Phone, title: 'Phone', content: '+254 (0) 733 643 666 / +254 (0) 722 000 000', color: 'bg-emerald-50' },
  { icon: Mail, title: 'Email', content: 'info@dagoretti.sc.ke', color: 'bg-purple-50' },
  { icon: Clock, title: 'Office Hours', content: 'Monday - Friday: 7:00 AM - 5:00 PM', color: 'bg-orange-50' },
];

export function ContactInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((detail) => {
            const Icon = detail.icon;
            return (
              <div key={detail.title} className={`${detail.color} rounded-xl p-6 text-center`}>
                <div className="flex justify-center mb-3">
                  <Icon className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{detail.title}</h3>
                <p className="text-gray-600 text-sm">{detail.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}