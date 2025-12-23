"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/features/auth/authSlice";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    // AuthProvider will redirect to /login
  };

  // Loading state while restoring session
  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">Finance Tracker</h1>

            <div className="flex items-center space-x-4">
              <span className="text-slate-300">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-slate-400 mb-8">
          Track your finances and manage transactions
        </p>

        {/* (Your existing dashboard UI stays exactly the same here) */}
      </main>
    </div>
  );
}
