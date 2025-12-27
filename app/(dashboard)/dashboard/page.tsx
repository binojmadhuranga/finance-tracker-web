"use client";

import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { transactionService, Transaction } from "@/services/transactionService";

export default function DashboardPage() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Fetch transactions
  useEffect(() => {
    setIsMounted(true);
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      setLoadingTransactions(true);
      setError(null);
      const data = await transactionService.getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch transactions");
    } finally {
      setLoadingTransactions(false);
    }
  };

  // Calculate stats
  const stats = transactions.reduce(
    (acc, transaction) => {
      const amount = parseFloat(transaction.amount);
      if (transaction.type === "income") {
        acc.totalIncome += amount;
      } else {
        acc.totalExpense += amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpense: 0 }
  );

  const totalBalance = stats.totalIncome - stats.totalExpense;
  const recentTransactions = transactions.slice(0, 5);

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
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden rounded-2xl h-64 md:h-80 lg:h-96">
        <Image
          src="/hero.png"
          alt="Finance Dashboard"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-transparent z-10" />
        <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Welcome back, {user.name}!
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mb-6 md:mb-8">
            Take control of your finances and achieve your financial goals.
          </p>
          <Link
            href="/transactions"
            className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-all transform hover:scale-105 text-base md:text-lg w-fit"
          >
            View Transactions
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
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
          <p className="text-3xl font-bold text-white mb-1">${totalBalance.toFixed(2)}</p>
          <p className="text-sm text-slate-500">
            {totalBalance >= 0 ? "You're doing great!" : "Keep tracking"}
          </p>
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
          <p className="text-3xl font-bold text-white mb-1">${stats.totalIncome.toFixed(2)}</p>
          <p className="text-sm text-slate-500">
            {stats.totalIncome > 0 ? "Great income!" : "No income recorded yet"}
          </p>
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
          <p className="text-3xl font-bold text-white mb-1">${stats.totalExpense.toFixed(2)}</p>
          <p className="text-sm text-slate-500">
            {stats.totalExpense > 0 ? "Track spending" : "No expenses recorded yet"}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
          <Link
            href="/transactions"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Loading State */}
        {loadingTransactions && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mb-3"></div>
            <p className="text-slate-400">Loading transactions...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loadingTransactions && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loadingTransactions && !error && transactions.length === 0 && (
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
        )}

        {/* Transactions List */}
        {!loadingTransactions && !error && recentTransactions.length > 0 && (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-slate-900/30 rounded-lg hover:bg-slate-900/50 transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2.5 rounded-lg ${
                      transaction.type === "income"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{transaction.note}</h4>
                    <p className="text-slate-400 text-sm">
                      {isMounted
                        ? new Date(transaction.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : transaction.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      transaction.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}${parseFloat(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-slate-500 text-xs">Category #{transaction.categoryId}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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
