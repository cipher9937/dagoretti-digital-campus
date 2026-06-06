"use client"

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { 
  Users, GraduationCap, BookOpen, FileText, Calendar, Bell,
  TrendingUp, AlertCircle, CheckCircle, Clock, ArrowRight,
  Shield, BarChart3, Settings, UserPlus, School
} from 'lucide-react';

const stats = [
  { label: 'Total Students', value: '1,245', change: '+3.2%', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { label: 'Total Teachers', value: '82', change: '+1.5%', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Active Classes', value: '24', change: '0%', icon: School, color: 'bg-purple-50 text-purple-600' },
  { label: 'Assignments', value: '156', change: '+12%', icon: FileText, color: 'bg-amber-50 text-amber-600' },
  { label: 'Attendance Rate', value: '94.5%', change: '+1.2%', icon: CheckCircle, color: 'bg-rose-50 text-rose-600' },
  { label: 'Resources', value: '2,340', change: '+8.5%', icon: BookOpen, color: 'bg-cyan-50 text-cyan-600' },
];

const recentActivity = [
  { action: 'New student registered', user: 'John Mwangi', time: '2 minutes ago', type: 'student' },
  { action: 'Assignment created', user: 'Mr. James Mwangi', time: '15 minutes ago', type: 'assignment' },
  { action: 'Attendance marked', user: 'Mrs. Grace Wanjiku', time: '1 hour ago', type: 'attendance' },
  { action: 'News article published', user: 'Admin', time: '2 hours ago', type: 'news' },
  { action: 'Resource uploaded', user: 'Mr. Peter Ochieng', time: '3 hours ago', type: 'resource' },
];

const quickActions = [
  { label: 'Add Student', icon: UserPlus, color: 'bg-blue-50 text-blue-600', href: '#' },
  { label: 'Add Teacher', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600', href: '#' },
  { label: 'Create News', icon: FileText, color: 'bg-amber-50 text-amber-600', href: '#' },
  { label: 'Manage Classes', icon: School, color: 'bg-purple-50 text-purple-600', href: '#' },
  { label: 'View Reports', icon: BarChart3, color: 'bg-rose-50 text-rose-600', href: '#' },
  { label: 'Settings', icon: Settings, color: 'bg-navy-50 text-navy-600', href: '#' },
];

export function AdminDashboard() {
  const { user } = useAuth();

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
                <Shield className="w-8 h-8 text-gold-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">Admin Dashboard</h1>
                <p className="text-navy-500">System Administrator · Dagoretti High School</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 bg-white rounded-lg border border-navy-200 hover:bg-navy-50 transition-colors">
                <Bell className="w-5 h-5 text-navy-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Button className="bg-navy-900 hover:bg-navy-800">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-xl p-4 border border-navy-100"
            >
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-navy-900">{stat.value}</div>
              <div className="text-xs text-navy-500 mb-1">{stat.label}</div>
              <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-navy-400'}`}>
                {stat.change} from last month
              </span>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 border border-navy-100"
            >
              <h2 className="text-lg font-semibold text-navy-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-navy-50 transition-colors text-center group border border-transparent hover:border-navy-100">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-navy-700">{action.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border border-navy-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-navy-900">Recent Activity</h2>
                <Link href="#" className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-navy-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'student' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'assignment' ? 'bg-amber-100 text-amber-600' :
                      activity.type === 'attendance' ? 'bg-emerald-100 text-emerald-600' :
                      activity.type === 'news' ? 'bg-purple-100 text-purple-600' :
                      'bg-cyan-100 text-cyan-600'
                    }`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-navy-900">{activity.action}</p>
                      <p className="text-xs text-navy-500">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-navy-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border border-navy-100"
            >
              <h2 className="text-lg font-semibold text-navy-900 mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-navy-600">Database</span>
                  <span className="flex items-center gap-1 text-sm text-emerald-600">
                    <CheckCircle className="w-4 h-4" /> Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-navy-600">API Server</span>
                  <span className="flex items-center gap-1 text-sm text-emerald-600">
                    <CheckCircle className="w-4 h-4" /> Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-navy-600">Storage</span>
                  <span className="flex items-center gap-1 text-sm text-emerald-600">
                    <CheckCircle className="w-4 h-4" /> 78% Used
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-navy-600">Active Users</span>
                  <span className="text-sm text-navy-900 font-medium">142 online</span>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6 border border-navy-100"
            >
              <h2 className="text-lg font-semibold text-navy-900 mb-4">Upcoming Events</h2>
              <div className="space-y-3">
                {[
                  { title: 'Sports Day 2024', date: 'June 15, 2024', type: 'Sports' },
                  { title: 'Career Day', date: 'July 20, 2024', type: 'Academic' },
                  { title: 'Music Festival', date: 'August 10, 2024', type: 'Cultural' },
                ].map((event) => (
                  <div key={event.title} className="p-3 bg-navy-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-navy-400" />
                      <span className="text-xs font-medium text-navy-500">{event.type}</span>
                    </div>
                    <p className="text-sm font-medium text-navy-900">{event.title}</p>
                    <p className="text-xs text-navy-500">{event.date}</p>
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
