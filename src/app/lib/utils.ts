import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

import { Session } from "next-auth";
import { Role } from "@/app/lib/definitions";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const capitalize = (word: string) => {
  const capitalized =
  word.charAt(0).toUpperCase()
  + word.slice(1)

  return capitalized;
}

export const parseZodError = (err: z.ZodError) => {
  let message: string = "";
  err.issues.forEach((issue: z.ZodIssue) => {
    const column = capitalize(issue.path[0].toString());
    const current = issue.message.replace("String", column);
    message = message.concat("- ", current, "\n");
  })

  return message;
}

export const isValidSession = (session: Session | null) => {
  if(session === null || session === undefined || session.user === undefined){
    return false;
  }
  return true;
}

export const hasRole = async (session: Session | null, role: Role) => {
  if(session === null || session === undefined || session.user === undefined){
    return false;
  }
  return session?.user.role === role;
};

export const hasAnyRole = async (session: Session | null, roles: Role[]) => {
  if(session === null || session === undefined || session.user === undefined){
    return false;
  }
  return roles.includes(session?.user.role as Role|| "");
};

export const getRefreshTokenExpiryInterval = () => {
  return (parseInt(process.env.REFRESH_TOKEN_EXPIRY_INTERVAL || "172800") * 1000)
}