import { StudentDashboard } from '@/components/portal/student-dashboard';

export const metadata = {
  title: 'Student Portal | Dagoretti High School',
  description: 'Student dashboard, assignments, classes, and resources.',
};

export default function StudentPortalPage() {
  return <StudentDashboard />;
}
