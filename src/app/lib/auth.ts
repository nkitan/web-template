import NextAuth from "next-auth";
import { authConfig } from "@/app/lib/auth.config";
import Credentials from 'next-auth/providers/credentials';
import { getUser, validate } from "@/app/lib/auth.actions";
import { DefaultSession } from "next-auth";
import { getAccessTokenExpiryInterval } from "./utils";

const isDebug: boolean = false;

declare module "next-auth" {
  interface Session {
    user?: {
      user_id: string | undefined;
      role: string;
      accessTokenExpiry: Date | undefined;
    } & DefaultSession["user"];
    expires_in: Date;
    error?: "RefreshTokenInvalidError" | "RefreshTokenExpiredError"
  }

  interface User {
    role: string;
    refresh_token: string;
    refresh_token_expiry: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
    role: string;
    refresh_token: string;
    refresh_token_expiry: string;
    error?: "RefreshTokenInvalidError" | "RefreshTokenExpiredError"
  }
}

const credentialsTemplate = {
  email: { label: "Email", type: "email", placeholder: "Juan@mail.uy" },
  password: { label: "Password", type: "password", placeholder: "********" },
}

const isValidRefreshToken = async (email: string | undefined | null, refresh_token: string) => {
  try {
    if (email === null || email === undefined){
      throw "Email not provided"
    }

    const user = await getUser(email);

    if(user === null) {
      throw "No Such User"
    }

    // If refresh token is valid and hasn't expired, return true
    if(user.refresh_token === refresh_token && Date.now() < user.refresh_token_expiry){
      return true;
    }
  } catch (error) {
    console.log("RefreshTokenValidateError: ", error);
  } finally {
    // return false for all other conditions
    return false;
  }
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
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.user_id = token.sub;
        session.user.role = token.role;
        session.expires_in = new Date(parseInt(token.refresh_token_expiry));
        if(token.exp !== undefined) {
          session.user.accessTokenExpiry = new Date(token.exp * 1000);
        } else {
          session.user.accessTokenExpiry = undefined
        }
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        // First log in

        token.role = user.role; // set role in JWT
        token.refresh_token = user.refresh_token; // set refresh_token in JWT
        token.refresh_token_expiry = user.refresh_token_expiry.toString();
        return token;
      }

      // On subsequent useSessions, if token is expired
      if (!token.exp || Date.now() > token.exp * 1000) {
        if(isDebug) console.warn("Token has expired, trying to refresh")
        // Token is expired or no token expiry provided
        // Try to use refresh token

        if(!token.refresh_token) {
          if(isDebug) console.error(`No refresh token found`)
          // Doesn't even have refresh_token, invalid request, return error
          throw "RefreshTokenInvalidError";
        }

        // If refresh token is valid and isn't expired, 
        if(await isValidRefreshToken(token.email, token.refresh_token)) {
          if(isDebug) console.log(`We have a valid refresh token, extending the current expiry from ${new Date(token.exp || 0)}`)
          token.exp = Date.now() + getAccessTokenExpiryInterval(); // Extend token by 10 minutes
          if(isDebug) console.log(`to ${new Date(token.exp || 0)}`)
        } else {
          throw "RefreshTokenExpiredError"
        }
      }

      return token;
    },
  }
});