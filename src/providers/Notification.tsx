"use client";


import { useSSE } from "../hooks/useSSE";
import { useSession } from "next-auth/react";

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  useSSE(session?.user?.email || null); // runs globally ONCE

  return children;
};
