"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, GraduationCap, BookOpen, Shield, Lock, Mail, ArrowRight } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
    } catch (error: any) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-navy-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-navy-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">D</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900">Welcome Back</h1>
          <p className="text-navy-500 mt-2">Sign in to your Dagoretti High School portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy-400 text-navy-900"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-navy-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy-400 text-navy-900"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-navy-300 text-navy-900 focus:ring-navy-400" />
              <span className="text-navy-600">Remember me</span>
            </label>
            <button type="button" className="text-navy-600 hover:text-navy-900 font-medium">
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-navy-900 hover:bg-navy-800 text-white py-3 text-base"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-navy-100">
          <p className="text-sm text-navy-500 text-center mb-4">Quick Access Portals</p>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/student-portal">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-center">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <span className="text-xs font-medium text-navy-700">Student</span>
              </div>
            </Link>
            <Link href="/teacher-portal">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors text-center">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                <span className="text-xs font-medium text-navy-700">Teacher</span>
              </div>
            </Link>
            <Link href="/admin-portal">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors text-center">
                <Shield className="w-6 h-6 text-purple-600" />
                <span className="text-xs font-medium text-navy-700">Admin</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
