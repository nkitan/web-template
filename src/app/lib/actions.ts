"use server"

import { signOut } from '@/app/lib/auth';
export const SignOut = async () => {
  await signOut({redirectTo: "/"})
}