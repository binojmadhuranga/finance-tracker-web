"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProfile } from "@/features/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [isInitializing, setIsInitializing] = useState(true);

  // Restore session on app load
  useEffect(() => {
    const restoreSession = async () => {
      try {
        await dispatch(fetchProfile()).unwrap();
      } catch (error) {
        // No valid session - user needs to login
        console.log("No active session");
      } finally {
        setIsInitializing(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  // Handle redirects after session is restored
  useEffect(() => {
    if (isInitializing) return;

    const isAuthPage = pathname === "/login" || pathname === "/register";
    const isDashboardPage = pathname?.startsWith("/dashboard");

    // If user is logged in and on auth pages, redirect to dashboard
    if (isAuthenticated && isAuthPage) {
      router.push("/dashboard");
    }

    // If user is not logged in and on dashboard pages, redirect to login
    if (!isAuthenticated && isDashboardPage) {
      router.push("/login");
    }
  }, [isAuthenticated, pathname, isInitializing, router]);

  // Show loading spinner during initial session restore
  if (isInitializing) {
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
