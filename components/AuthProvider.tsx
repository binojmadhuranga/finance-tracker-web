"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchProfile } from "@/features/auth/authSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Restore session on app load
  useEffect(() => {
    setIsMounted(true);
    const restoreSession = async () => {
      try {
        await dispatch(fetchProfile()).unwrap();
      } catch (error) {
        // No valid session - middleware will handle redirect
        console.log("No active session");
      } finally {
        setIsInitializing(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  // Show loading spinner during initial session restore
  if (!isMounted || isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
