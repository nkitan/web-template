import type { NextAuthConfig } from 'next-auth';

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
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",
  
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 7 * 24 * 60 * 60, // 7 days
  
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 1 * 24 * 60 * 60, // 1 Day
  },
  events: {
    async signIn(message) { console.log(`User Signed In: `, message) /* on successful sign in */ },
    async signOut(message) { console.log(`User Signed Out: `, message) /* on signout */ },
    async createUser(message) { console.log(`User Created: `, message) /* user created */ },
    async updateUser(message) { console.log(`User Updated: `, message) /* user updated - e.g. their email was verified */ },
    async linkAccount(message) { console.log(`Account Linked To A user: `, message) /* account (e.g. Twitter) linked to a user */ },
    async session(message) { console.log(`Active Session: `, message) /* session is active */ },
  }
} satisfies NextAuthConfig;