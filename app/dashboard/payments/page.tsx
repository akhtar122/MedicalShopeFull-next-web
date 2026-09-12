"use client";

import { useMemo } from "react";
import {
  Banknote,
  CalendarDays,
  CreditCard,
  IndianRupee,
} from "lucide-react";

import PaymentsTable from "@/components/payments/PaymentsTable";
import { usePayments } from "@/hooks/usePayments";

export default function PaymentsPage() {
  const {
    payments,
    loading,
    error,
    reload,
  } = usePayments();

  const stats = useMemo(() => {
    const today = new Date();

    const todayPayments = payments.filter(
      (payment) => {
        const date = new Date(
          payment.paymentDate
        );

        return (
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate()
        );
      }
    );

    const totalAmount = payments.reduce(
      (sum, payment) =>
        sum + Number(payment.amount || 0),
      0
    );

    const todayAmount = todayPayments.reduce(
      (sum, payment) =>
        sum + Number(payment.amount || 0),
      0
    );

    const cashPayments = payments.filter(
      (payment) =>
        payment.paymentMethod.toUpperCase() ===
        "CASH"
    );

    const nonCashPayments =
      payments.filter(
        (payment) =>
          payment.paymentMethod.toUpperCase() !==
          "CASH"
      );

    return {
      totalAmount,
      todayAmount,
      totalPayments: payments.length,
      cashPayments: cashPayments.length,
      nonCashPayments:
        nonCashPayments.length,
    };
  }, [payments]);

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Payments
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Track invoice payments and transaction history
          </p>
        </div>

        <button
          onClick={reload}
          className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Summary Cards */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Payments
              </p>

              <p className="mt-2 text-2xl font-bold">
                {stats.totalPayments}
              </p>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Banknote size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Received
              </p>

              <p className="mt-2 text-2xl font-bold">
                ₹
                {stats.totalAmount.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </p>
            </div>

            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <IndianRupee size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Today's Payments
              </p>

              <p className="mt-2 text-2xl font-bold">
                ₹
                {stats.todayAmount.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </p>
            </div>

            <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
              <CalendarDays size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Cash / Other
              </p>

              <p className="mt-2 text-2xl font-bold">
                {stats.cashPayments}
                {" / "}
                {stats.nonCashPayments}
              </p>
            </div>

            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
              <CreditCard size={22} />
            </div>
          </div>
        </div>

      </div>

      {/* Table */}

      <div>
        {loading ? (
          <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
            Loading payments...
          </div>
        ) : (
          <PaymentsTable
            payments={payments}
          />
        )}
      </div>

    </div>
  );
}