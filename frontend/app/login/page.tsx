import { LoginForm } from '@/components/sections/login-form';

export const metadata = {
  title: 'Login | Dagoretti High School Digital Campus',
  description: 'Access your student, teacher, or admin portal.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}
