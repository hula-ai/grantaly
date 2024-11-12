"use client";

import { theme } from "@/theme/theme";
import { SessionProvider } from "next-auth/react";

export function SessionProviders({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
