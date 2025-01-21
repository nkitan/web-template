"use server";

import AppLogo from '@/components/ui/app-logo';
import LoginForm from '@/app/ui/login/login-form';
import { auth } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import { geistMono } from '../ui/fonts';

// Define custom SignUp Page
export default async function LoginPage() {
  const session = await auth();
  if(session?.user){
    redirect("/dashboard");
  }

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AppLogo className={`${geistMono.className} text-white font-thin`} iconsize={12} textsize={12}/>
          </div>
        </div>
        <LoginForm session={session}/>
      </div>
    </main>
  );
} 