import { HeroSection } from '@/components/sections/hero';
import { SchoolIntro } from '@/components/sections/school-intro';
import { PrincipalMessage } from '@/components/sections/principal-message';
import { AcademicExcellence } from '@/components/sections/academic-excellence';
import { SchoolAchievements } from '@/components/sections/school-achievements';
import { LatestNews } from '@/components/sections/latest-news';
import { UpcomingEvents } from '@/components/sections/upcoming-events';
import { GalleryPreview } from '@/components/sections/gallery-preview';
import { QuickPortalAccess } from '@/components/sections/quick-portal-access';
import { ContactInfo } from '@/components/sections/contact-info';
import { CTASection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SchoolIntro />
      <PrincipalMessage />
      <AcademicExcellence />
      <SchoolAchievements />
      <LatestNews />
      <UpcomingEvents />
      <GalleryPreview />
      <QuickPortalAccess />
      <ContactInfo />
      <CTASection />
    </>
  );
}
