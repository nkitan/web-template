'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const [expiry, setExpiry] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if(status === "authenticated") {
      setExpiry(session.expires_in);
    }
  }, [status])

  return (
    <div>
          <p>Dashboard Page</p>
          <p>{expiry === undefined ? "Loading..." : expiry}</p>
    </div>
  );
}