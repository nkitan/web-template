import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(word: string){
  const capitalized =
  word.charAt(0).toUpperCase()
  + word.slice(1)

  return capitalized;
}

export function parseZodError(err: z.ZodError) {
  let message: string = "";
  err.issues.forEach((issue: z.ZodIssue) => {
    const column = capitalize(issue.path[0].toString());
    const current = issue.message.replace("String", column);
    message = message.concat("- ", current, "\n");
  })

  return message;
}
