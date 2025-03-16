import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import LoginForm from '@/components/auth/login/login-form';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    // redirect('/');
    console.log(session);
  }

  return <LoginForm />;
}
