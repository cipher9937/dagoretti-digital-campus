"use client"

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, Users, FileText, Calendar, Bell, Video,
  CheckCircle, AlertCircle, Clock, TrendingUp, MessageSquare,
  Award, ArrowRight, User, BarChart3, GraduationCap
} from 'lucide-react';

const menuItems = [
  { icon: Users, label: 'My Classes', href: '#', color: 'bg-blue-50 text-blue-600' },
  { icon: FileText, label: 'Assignments', href: '#', color: 'bg-amber-50 text-amber-600' },
  { icon: Calendar, label: 'Timetable', href: '#', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Video, label: 'Online Classes', href: '#', color: 'bg-purple-50 text-purple-600' },
  { icon: CheckCircle, label: 'Attendance', href: '#', color: 'bg-rose-50 text-rose-600' },
  { icon: MessageSquare, label: 'Discussions', href: '#', color: 'bg-cyan-50 text-cyan-600' },
  { icon: BarChart3, label: 'Grades', href: '#', color: 'bg-gold-50 text-gold-600' },
  { icon: TrendingUp, label: 'Analytics', href: '#', color: 'bg-indigo-50 text-indigo-600' },
];

const pendingTasks = [
  { task: 'Grade Mathematics Quiz', count: 24, type: 'grading', due: 'Today' },
  { task: 'Review Chemistry Lab Reports', count: 18, type: 'review', due: 'Tomorrow' },
  { task: 'Mark English Essays', count: 32, type: 'grading', due: '3 days' },
];

const classSchedule = [
  { time: '8:00 AM - 9:30 AM', subject: 'Mathematics', class: 'Form 4M', room: 'Room 101', students: 42 },
  { time: '9:45 AM - 11:15 AM', subject: 'Mathematics', class: 'Form 3W', room: 'Room 205', students: 38 },
  { time: '11:30 AM - 1:00 PM', subject: 'Mathematics', class: 'Grade 10B', room: 'Room 302', students: 45 },
];

export function TeacherDashboard() {
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
                <User className="w-8 h-8 text-gold-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">Welcome, {user?.firstName || 'Teacher'}</h1>
                <p className="text-navy-500">Mathematics Department · Senior Teacher</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 bg-white rounded-lg border border-navy-200 hover:bg-navy-50 transition-colors">
                <Bell className="w-5 h-5 text-navy-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Button className="bg-navy-900 hover:bg-navy-800">
                <BookOpen className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Students', value: '125', icon: Users, color: 'bg-blue-50 text-blue-600' },
            { label: 'Classes', value: '3', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Pending', value: '74', icon: AlertCircle, color: 'bg-amber-50 text-amber-600' },
            { label: 'Graded', value: '156', icon: CheckCircle, color: 'bg-purple-50 text-purple-600' },
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
              <h2 className="text-lg font-semibold text-navy-900 mb-4">Teacher Portal</h2>
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

            {/* Pending Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border border-navy-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-navy-900">Pending Tasks</h2>
                <Link href="#" className="text-sm text-navy-600 hover:text-navy-900 flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.task} className="flex items-center gap-4 p-4 bg-navy-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      task.type === 'grading' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-navy-900">{task.task}</h3>
                      <p className="text-sm text-navy-500">{task.count} submissions pending</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-amber-600">Due {task.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Today's Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border border-navy-100"
            >
              <h2 className="text-lg font-semibold text-navy-900 mb-4">Today's Schedule</h2>
              <div className="space-y-3">
                {classSchedule.map((cls) => (
                  <div key={cls.class} className="p-3 bg-navy-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-navy-400" />
                      <span className="text-sm font-medium text-navy-900">{cls.time}</span>
                    </div>
                    <p className="text-sm text-navy-700 ml-6">{cls.subject} · {cls.class}</p>
                    <p className="text-xs text-navy-500 ml-6">{cls.room} · {cls.students} students</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6 border border-navy-100"
            >
              <h2 className="text-lg font-semibold text-navy-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Create New Assignment
                </Button>
                <Button className="w-full justify-start bg-emerald-50 hover:bg-emerald-100 text-emerald-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Attendance
                </Button>
                <Button className="w-full justify-start bg-purple-50 hover:bg-purple-100 text-purple-700">
                  <Video className="w-4 h-4 mr-2" />
                  Schedule Online Class
                </Button>
                <Button className="w-full justify-start bg-amber-50 hover:bg-amber-100 text-amber-700">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Class Analytics
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
