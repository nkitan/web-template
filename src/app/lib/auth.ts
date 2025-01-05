import NextAuth from "next-auth";
import { authConfig } from "@/app/lib/auth.config";
import Credentials from 'next-auth/providers/credentials';
import { validate } from "@/app/lib/auth.actions";

const credentialsTemplate = {
  email: { label: "Email", type: "email", placeholder: "Juan@mail.uy" },
  password: { label: "Password", type: "password", placeholder: "********" },
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        credentials: credentialsTemplate,
        async authorize(credentials) {
          // Callback to check if user is authorized
          return validate(credentials);
        },
      }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Save the role in the token
      }
      return token;
    },
  }
});