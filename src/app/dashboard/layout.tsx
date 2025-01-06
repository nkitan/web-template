'use server'

import SideNav from '@/app/ui/dashboard/sidenav';
import { redirect } from 'next/navigation';
import { auth } from '../lib/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if(!session?.user){
    redirect("/");
  }

  return (
    <div className="flex flex-grow h-full flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}