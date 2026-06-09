"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './auth-provider';
import { Button } from './ui/button';
import { Menu, X, ChevronDown, GraduationCap, BookOpen, LogOut, User } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/academics', label: 'Academics' },
  { href: '/news', label: 'News' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

const portalLinks = [
  { href: '/student-portal', label: 'Student Portal', icon: GraduationCap },
  { href: '/teacher-portal', label: 'Teacher Portal', icon: BookOpen },
  { href: '/admin-portal', label: 'Admin Portal', icon: User },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-navy-100' : 'bg-transparent'
      }`}
    >
      <div className="container-padding mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center group-hover:bg-gold-500 transition-colors duration-300">
              <span className="text-white font-bold text-lg group-hover:text-navy-900 transition-colors">D</span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-bold text-lg leading-tight transition-colors ${isScrolled ? 'text-navy-900' : 'text-white'}`}>
                Dagoretti High
              </h1>
              <p className={`text-xs font-medium transition-colors ${isScrolled ? 'text-navy-600' : 'text-white/80'}`}>
                School · Est. 1929
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-navy-900 text-white'
                    : isScrolled
                    ? 'text-navy-700 hover:text-navy-900 hover:bg-navy-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center gap-3">
                <span className={`text-sm font-medium ${isScrolled ? 'text-navy-700' : 'text-white'}`}>
                  {user?.firstName} {user?.lastName}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className={`${isScrolled ? 'border-navy-200 text-navy-700' : 'border-white/30 text-white hover:bg-white/10'}`}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPortalOpen(!isPortalOpen)}
                    className={`${isScrolled ? 'border-navy-200 text-navy-700' : 'border-white/30 text-white'}`}
                  >
                    Portals
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isPortalOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  <AnimatePresence>
                    {isPortalOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-navy-100 py-2 z-50"
                      >
                        {portalLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                          >
                            <link.icon className="w-4 h-4 text-gold-500" />
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link href="/login">
                  <Button size="sm" className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                isScrolled ? 'text-navy-900 hover:bg-navy-50' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-navy-100 shadow-lg"
          >
            <div className="container-padding py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-navy-900 text-white'
                      : 'text-navy-700 hover:bg-navy-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-navy-100 space-y-2">
                {portalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                  >
                    <link.icon className="w-4 h-4 text-gold-500" />
                    {link.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <Link href="/login">
                    <Button className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold mt-2">
                      Sign In
                    </Button>
                  </Link>
                )}
                {isAuthenticated && (
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="w-full mt-2"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
