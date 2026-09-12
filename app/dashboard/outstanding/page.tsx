"use client";

import {
  useMemo,
} from "react";

import {
  AlertCircle,
  RefreshCw,
  Wallet,
} from "lucide-react";

import {
  useOutstandingPayments,
} from "@/hooks/useOutstandingPayments";

import OutstandingPaymentsTable from "@/components/payments/OutstandingPaymentsTable";

export default function OutstandingPaymentsPage() {

  const {
    payments,
    loading,
    error,
    reload,
  } = useOutstandingPayments();

  const totalOutstanding =
    useMemo(() => {
      return payments.reduce(
        (sum, payment) =>
          sum +
          Number(
            payment.outstandingAmount || 0
          ),
        0
      );
    }, [payments]);

  const partialInvoices =
    useMemo(() => {
      return payments.filter(
        (payment) =>
          payment.paymentStatus ===
          "PARTIAL"
      ).length;
    }, [payments]);

  const pendingInvoices =
    useMemo(() => {
      return payments.filter(
        (payment) =>
          payment.paymentStatus ===
          "PENDING"
      ).length;
    }, [payments]);

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Outstanding Payments
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Track unpaid and partially paid invoices
          </p>

        </div>

        <button
          onClick={reload}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">

          <AlertCircle size={20} />

          {error}

        </div>
      )}

      {/* Summary Cards */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Total Outstanding */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Outstanding
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                ₹
                {totalOutstanding.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </p>

            </div>

            <div className="rounded-xl bg-red-100 p-3 text-red-600">
              <Wallet size={22} />
            </div>

          </div>

        </div>

        {/* Partial */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Partial Invoices
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {partialInvoices}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Customer has made a partial payment
          </p>

        </div>

        {/* Pending */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Pending Invoices
          </p>

          <p className="mt-2 text-2xl font-bold text-orange-600">
            {pendingInvoices}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            No payment recorded
          </p>

        </div>

      </div>

      {/* Table */}

      {loading ? (

        <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
          Loading outstanding payments...
        </div>

      ) : (

        <OutstandingPaymentsTable
          payments={payments}
        />

      )}

    </div>
  );
}