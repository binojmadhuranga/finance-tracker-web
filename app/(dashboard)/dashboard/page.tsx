"use client";

import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  const { user, isLoading } = useAppSelector((state) => state.auth);

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
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Welcome back, {user.name}!
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-6 md:mb-8">
              Take control of your finances and achieve your financial goals.
            </p>
            <Link
              href="/transactions"
              className="inline-block px-6 py-3 md:px-8 md:py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-all transform hover:scale-105 text-base md:text-lg"
            >
              View Transactions
            </Link>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            <Image
              src="/hero.png"
              alt="Finance Dashboard"
              width={600}
              height={450}
              className="rounded-lg shadow-xl w-full md:w-[500px] lg:w-[600px] h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Total Balance</h3>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">$0.00</p>
          <p className="text-sm text-slate-500">Start tracking your finances</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Total Income</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">$0.00</p>
          <p className="text-sm text-slate-500">No income recorded yet</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Total Expenses</h3>
            <div className="p-2 bg-red-500/10 rounded-lg">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">$0.00</p>
          <p className="text-sm text-slate-500">No expenses recorded yet</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-400 text-lg mb-4">No transactions yet</p>
          <Link
            href="/transactions"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Your First Transaction
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/transactions?action=add-income"
          className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Add Income</h3>
              <p className="text-green-100">Record money received</p>
            </div>
          </div>
        </Link>

        <Link
          href="/transactions?action=add-expense"
          className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Add Expense</h3>
              <p className="text-red-100">Record money spent</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
