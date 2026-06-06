import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dagoretti High School | Digital Campus',
  description: 'Dagoretti High School - A National School in Nairobi, Kenya. Academic Excellence, Leadership, Discipline, and Prestige since 1929.',
  keywords: 'Dagoretti High School, Nairobi, Kenya, National School, Education, KCSE, CBC, Academic Excellence',
  authors: [{ name: 'Dagoretti High School' }],
  openGraph: {
    title: 'Dagoretti High School | Digital Campus',
    description: 'Academic Excellence, Leadership, Discipline, and Prestige since 1929',
    type: 'website',
    locale: 'en_KE',
    url: 'https://dagorettihigh.ac.ke',
    siteName: 'Dagoretti High School',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dagoretti High School',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dagoretti High School | Digital Campus',
    description: 'Academic Excellence, Leadership, Discipline, and Prestige since 1929',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-code-here',
  },
  alternates: {
    canonical: 'https://dagorettihigh.ac.ke',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
