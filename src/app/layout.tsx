import type { Metadata } from "next";
import { geistMono, geistSans } from '@/app/ui/fonts';
import '@/app/globals.css';
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "./ui/navbar/navbar";

export const metadata: Metadata = {
  title: `${process.env.APP_NAME}`,
  description: `${process.env.APP_REPO}`,
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
