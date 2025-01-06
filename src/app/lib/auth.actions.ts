'use server';
 
import { AuthError } from "next-auth";
import { getRefreshTokenExpiryInterval, parseZodError } from "@/app/lib/utils";
import { PrismaClient, User } from "@prisma/client";
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import { redirect, RedirectType } from "next/navigation";
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { signIn } from "@/app/lib/auth";
import { randomUUID } from "crypto";

const isDebug: boolean = false;
const prisma = new PrismaClient();

export async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    return user;
  } catch (error) {
    if(error instanceof PrismaClientInitializationError) {
      console.log(`Could not connect to the database: ${error}`)
      throw new Error("Failed to connect to database");
    } else if (error instanceof PrismaClientKnownRequestError) {
      console.log(`Invalid DB Request: ${error}`)
      throw new Error("An invalid DB request was made");
    }
    console.log(`Unknown error occurred while fetching user: ${error}`)
    throw new Error(`Failed to fetch user.`)
  }
}

const update_refresh_token = async (email: string) => {
  try {
    const user = await prisma.user.update({
      where: { email: email },
      data : {refresh_token: randomUUID(), refresh_token_expiry: Date.now() + getRefreshTokenExpiryInterval()}
    });
    if(isDebug) console.log("User Refresh Token Updated: ", user);
  } catch (error) {
    console.log(error.stack)
  }
}

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    const options = {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false
    };
    await signIn("credentials", options);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          console.log("Unknown AuthError: ", error.cause);
          return 'Something went wrong.';
      }
    } else {
      console.log("Unknown Error: ", error.cause);
    }
  }
  redirect("/dashboard", RedirectType.push);
}

export const signUp = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    const parsedCredentials = z
      .object({ email: z.string().email(), password: z.string().min(6), username: z.string().min(5)})
      .safeParse(Object.fromEntries(formData));

    if (parsedCredentials.success) {
      const { email, password, username } = parsedCredentials.data;

      // Check if email is already registered
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if(existingUser != null){
        return "A User with that email exists";
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const refresh_token_expiry = Date.now() + getRefreshTokenExpiryInterval();

      // Create a new user if user is unique
      const newUser = {
        name: username,
        email,
        password: hashedPassword,
        refresh_token_expiry: refresh_token_expiry,
      };

      const createdUser: User = await prisma.user.create({
        data: newUser
      });

      if(createdUser === null || createdUser === undefined){
        throw "Failed to create user"
      }

      try {
        const options = {
          email: formData.get('email'),
          password: formData.get('password'),
          redirect: false,
        };

        // Try to sign in
        
        await signIn("credentials", options);
      } catch (error) {
        console.log("Error while logging in:", error.stack)
        throw "Error while logging in"
      }

    } else if (parsedCredentials.error) {
      console.log("PCERROR: ", parsedCredentials.error);
      throw parsedCredentials.error;
    } else {
      throw "Unknown Error While Parsing";
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return parseZodError(error);
    }

    if(error !== null && error !== undefined){
      console.error("UNKNOWN ERROR: ", error.stack)
    } else {
      console.log("UNKNOWN ERROR: UNDEFINED/NULL")
    }

    return "An Unknown Error Occurred";
  }
  redirect("/login");
};

export async function validate(credentials: object){
  const parsedCredentials = z
  .object({ email: z.string().email(), password: z.string().min(6) })
  .safeParse(credentials);

  if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;
      const user = await getUser(email);

      if (!user || user == null) {
        return null;
      }

      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        update_refresh_token(user.email);
        return user;
      }
  }

  return null;
}