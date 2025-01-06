import type { NextAuthConfig } from 'next-auth';
import { getAccessTokenExpiryInterval } from '@/app/lib/utils';

const showMessages = false;
export const authConfig = {
  pages: {
    signIn: '/login',
    //signOut: '/signOut',
    //error: '/auth/error', // Error code passed in query string as ?error=
    //verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/dashboard/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl)); // send logged in users to dashboard
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
  session: {
    strategy: "jwt",
    maxAge: getAccessTokenExpiryInterval(),
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: getAccessTokenExpiryInterval(), // 10 minutes
  },
  events: {
    async signIn(message) { if(showMessages) console.log(`User Signed In: `, message) /* on successful sign in */ },
    async signOut(message) { if(showMessages) console.log(`User Signed Out: `, message) /* on signout */ },
    async createUser(message) { if(showMessages) console.log(`User Created: `, message) /* user created */ },
    async updateUser(message) { if(showMessages) console.log(`User Updated: `, message) /* user updated - e.g. their email was verified */ },
    async linkAccount(message) { if(showMessages) console.log(`Account Linked To A user: `, message) /* account (e.g. Twitter) linked to a user */ },
    async session(message) { if(showMessages) console.log(`Active Session: `, message) /* session is active */ },
  }
} satisfies NextAuthConfig;