'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { geistMono } from "../ui/fonts";

export default function Page() {
  const { data: session, status } = useSession();
  const [refreshTokenExpiry, setRefreshTokenExpiry] = useState<Date | undefined>(undefined);
  const [accessTokenExpiry, setAccessTokenExpiry] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState(new Date());

  const user = session?.user;

  useEffect(() => {
    if(status === "authenticated") {
      setRefreshTokenExpiry(session.expires_in);
    }
  }, [session?.expires_in, status])

  useEffect(() => {
    setAccessTokenExpiry(session?.user?.accessTokenExpiry);
  }, [session?.user?.accessTokenExpiry])


  useEffect(() => {
    // Every 1 second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${geistMono.className} font-extralight `}>
          <h1 className={`text-[40px] font-light`}>Hi {user?.name}, Welcome to your Dashboard</h1>
          <div>Refresh Token Expiry: {refreshTokenExpiry === undefined ? "Loading..." : new Date(refreshTokenExpiry).toLocaleString()}</div>
          <div>Access Token Expiry: {accessTokenExpiry === undefined ? "Loading..." : new Date(accessTokenExpiry).toLocaleString()}</div>
          <div>Current Time: {time.toLocaleString()}</div>
    </div>
  );
}