import { TeacherDashboard } from '@/components/portal/teacher-dashboard';

export const metadata = {
  title: 'Teacher Portal | Dagoretti High School',
  description: 'Teacher dashboard, classes, assignments, and student management.',
};

export default function TeacherPortalPage() {
  return <TeacherDashboard />;
}
