"use client"

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, BookOpen, Calendar, Bell, FileText, 
  Clock, CheckCircle, AlertCircle, TrendingUp, Library,
  MessageSquare, Video, Award, ArrowRight, User
} from 'lucide-react';

const menuItems = [
  { icon: BookOpen, label: 'My Classes', href: '#', color: 'bg-blue-50 text-blue-600' },
  { icon: FileText, label: 'Assignments', href: '#', color: 'bg-amber-50 text-amber-600' },
  { icon: Calendar, label: 'Timetable', href: '#', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Video, label: 'Online Classes', href: '#', color: 'bg-purple-50 text-purple-600' },
  { icon: Library, label: 'Digital Library', href: '#', color: 'bg-rose-50 text-rose-600' },
  { icon: MessageSquare, label: 'Discussions', href: '#', color: 'bg-cyan-50 text-cyan-600' },
  { icon: Award, label: 'Grades', href: '#', color: 'bg-gold-50 text-gold-600' },
  { icon: TrendingUp, label: 'Progress', href: '#', color: 'bg-indigo-50 text-indigo-600' },
];

const upcomingAssignments = [
  { subject: 'Mathematics', title: 'Calculus Problem Set', due: '2 days', status: 'pending' },
  { subject: 'English', title: 'Essay: Shakespeare Analysis', due: '5 days', status: 'pending' },
  { subject: 'Chemistry', title: 'Lab Report: Titration', due: '1 week', status: 'submitted' },
];

const announcements = [
  { title: 'Term 2 Opening Date', date: 'April 29, 2024', priority: 'high' },
  { title: 'KCSE Registration Deadline', date: 'May 15, 2024', priority: 'urgent' },
  { title: 'New Digital Library Platform', date: 'May 1, 2024', priority: 'normal' },
];

export function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-navy-50 pt-24 pb-12">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-navy-900 rounded-xl flex items-center justify-center">
                <User className="w-8 h-8 text-gold-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">Welcome back, {user?.firstName || 'Student'}</h1>
                <p className="text-navy-500">Form 4 · Stream M · Admission: 20210001</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 bg-white rounded-lg border border-navy-200 hover:bg-navy-50 transition-colors">
                <Bell className="w-5 h-5 text-navy-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Button className="bg-navy-900 hover:bg-navy-800">
                <GraduationCap className="w-4 h-4 mr-2" />
                My Profile
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Assignments', value: '12', icon: FileText, color: 'bg-blue-50 text-blue-600' },
            { label: 'Completed', value: '8', icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Pending', value: '4', icon: AlertCircle, color: 'bg-amber-50 text-amber-600' },
            { label: 'Attendance', value: '95%', icon: Clock, color: 'bg-purple-50 text-purple-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-xl p-4 border border-navy-100"
            >
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-navy-900">{stat.value}</div>
              <div className="text-sm text-navy-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Menu Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 border border-navy-100"
            >
              <h2 className="text-lg font-semibold text-navy-900 mb-4">Quick Access</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {menuItems.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-navy-50 transition-colors text-center group">
                      <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-navy-700">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Assignments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border border-navy-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-navy-900">Upcoming Assignments</h2>
                <Link href="#" className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.title} className="flex items-center gap-4 p-4 bg-navy-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      assignment.status === 'submitted' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {assignment.status === 'submitted' ? <CheckCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-navy-900">{assignment.title}</h3>
                      <p className="text-sm text-navy-500">{assignment.subject}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        assignment.status === 'submitted' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {assignment.status === 'submitted' ? 'Submitted' : `Due in ${assignment.due}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Announcements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border border-navy-100"
            >
              <h2 className="text-lg font-semibold text-navy-900 mb-4">Announcements</h2>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.title} className="p-3 bg-navy-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${
                        announcement.priority === 'urgent' ? 'bg-red-500' : 
                        announcement.priority === 'high' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      <span className="text-xs font-medium text-navy-500 uppercase">{announcement.priority}</span>
                    </div>
                    <h3 className="font-medium text-navy-900 text-sm">{announcement.title}</h3>
                    <p className="text-xs text-navy-500 mt-1">{announcement.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timetable Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6 border border-navy-100"
            >
              <h2 className="text-lg font-semibold text-navy-900 mb-4">Today's Classes</h2>
              <div className="space-y-3">
                {[
                  { time: '8:00 AM - 9:30 AM', subject: 'Mathematics', room: 'Room 101' },
                  { time: '9:45 AM - 11:15 AM', subject: 'English', room: 'Room 203' },
                  { time: '11:30 AM - 1:00 PM', subject: 'Chemistry', room: 'Lab 2' },
                ].map((cls) => (
                  <div key={cls.subject} className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg">
                    <Clock className="w-4 h-4 text-navy-400 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-navy-900">{cls.subject}</p>
                      <p className="text-xs text-navy-500">{cls.time} · {cls.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
