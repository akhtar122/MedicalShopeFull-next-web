"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  CreditCard,
  IndianRupee,
  RefreshCw,
  Search,
} from "lucide-react";

import PaymentReportTable from "@/components/reports/PaymentReportTable";
import { usePaymentReport } from "@/hooks/usePaymentReport";

export default function PaymentReportPage() {
  const {
    payments,
    loading,
    error,
    reload,
  } = usePaymentReport();

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("ALL");

  const [search, setSearch] =
    useState("");

  const filteredPayments =
    useMemo(() => {
      return payments.filter((payment) => {
        const paymentDate = new Date(
          payment.paymentDate
        );

        if (fromDate) {
          const from = new Date(
            `${fromDate}T00:00:00`
          );

          if (paymentDate < from) {
            return false;
          }
        }

        if (toDate) {
          const to = new Date(
            `${toDate}T23:59:59`
          );

          if (paymentDate > to) {
            return false;
          }
        }

        if (
          paymentMethod !== "ALL" &&
          payment.paymentMethod.toUpperCase() !==
            paymentMethod
        ) {
          return false;
        }

        if (search.trim()) {
          const query =
            search
              .trim()
              .toLowerCase();

          const invoice =
            payment.invoiceNumber
              ?.toLowerCase() || "";

          const reference =
            payment.transactionRef
              ?.toLowerCase() || "";

          const method =
            payment.paymentMethod
              .toLowerCase();

          if (
            !invoice.includes(query) &&
            !reference.includes(query) &&
            !method.includes(query)
          ) {
            return false;
          }
        }

        return true;
      });
    }, [
      payments,
      fromDate,
      toDate,
      paymentMethod,
      search,
    ]);

  const totalReceived =
    useMemo(() => {
      return filteredPayments.reduce(
        (sum, payment) =>
          sum + Number(payment.amount || 0),
        0
      );
    }, [filteredPayments]);

  const transactionCount =
    filteredPayments.length;

  const cashReceived =
    useMemo(() => {
      return filteredPayments
        .filter(
          (payment) =>
            payment.paymentMethod.toUpperCase() ===
            "CASH"
        )
        .reduce(
          (sum, payment) =>
            sum + Number(payment.amount || 0),
          0
        );
    }, [filteredPayments]);

  function clearFilters() {
    setFromDate("");
    setToDate("");
    setPaymentMethod("ALL");
    setSearch("");
  }

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Payment Report
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Analyze payments received against invoices
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
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Summary */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Received
              </p>

              <p className="mt-2 text-2xl font-bold">
                ₹
                {totalReceived.toLocaleString(
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
                Transactions
              </p>

              <p className="mt-2 text-2xl font-bold">
                {transactionCount}
              </p>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <CreditCard size={22} />
            </div>

          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Cash Received
              </p>

              <p className="mt-2 text-2xl font-bold">
                ₹
                {cashReceived.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </p>
            </div>

            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
              <CalendarDays size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* Filters */}

      <div className="rounded-2xl border bg-white p-5">

        <div className="mb-4">
          <h2 className="font-semibold">
            Filters
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Filter payment transactions
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) =>
                setFromDate(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(e) =>
                setToDate(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Method
            </label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
            >
              <option value="ALL">
                All Methods
              </option>

              <option value="CASH">
                Cash
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="CARD">
                Card
              </option>

              <option value="BANK_TRANSFER">
                Bank Transfer
              </option>

              <option value="OTHER">
                Other
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Search
            </label>

            <div className="relative">

              <Search
                size={17}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Invoice / reference"
                className="w-full rounded-lg border py-2.5 pl-9 pr-3 outline-none focus:border-blue-500"
              />

            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>

        </div>

      </div>

      {/* Table */}

      {loading ? (

        <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
          Loading payment report...
        </div>

      ) : (

        <PaymentReportTable
          payments={filteredPayments}
        />

      )}

    </div>
  );
}