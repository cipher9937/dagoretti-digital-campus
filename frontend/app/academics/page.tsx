import { AcademicsHero } from '@/components/sections/academics-hero';
import { CurriculumOverview } from '@/components/sections/curriculum-overview';
import { SubjectListings } from '@/components/sections/subject-listings';
import { AcademicCalendar } from '@/components/sections/academic-calendar';
import { DepartmentInfo } from '@/components/sections/department-info';
import { LearningResources } from '@/components/sections/learning-resources';

export const metadata = {
  title: 'Academics | Dagoretti High School',
  description: 'Explore our academic programs including CBC Grade 10 and 8-4-4 Form 3-4 curriculum.',
};

export default function AcademicsPage() {
  return (
    <>
      <AcademicsHero />
      <CurriculumOverview />
      <SubjectListings />
      <AcademicCalendar />
      <DepartmentInfo />
      <LearningResources />
    </>
  );
}
