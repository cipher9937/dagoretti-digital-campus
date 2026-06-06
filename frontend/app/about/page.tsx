import { AboutHero } from '@/components/sections/about-hero';
import { SchoolHistory } from '@/components/sections/school-history';
import { VisionMission } from '@/components/sections/vision-mission';
import { CoreValues } from '@/components/sections/core-values';
import { SchoolLeadership } from '@/components/sections/school-leadership';
import { Facilities } from '@/components/sections/facilities';
import { Departments } from '@/components/sections/departments';
import { ClubsSocieties } from '@/components/sections/clubs-societies';
import { Achievements } from '@/components/sections/achievements';

export const metadata = {
  title: 'About Us | Dagoretti High School',
  description: 'Learn about Dagoretti High School history, vision, mission, leadership, and facilities.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <SchoolHistory />
      <VisionMission />
      <CoreValues />
      <SchoolLeadership />
      <Facilities />
      <Departments />
      <ClubsSocieties />
      <Achievements />
    </>
  );
}
