"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import {
  OutstandingPayment,
} from "@/types/payment";

interface Props {
  payments: OutstandingPayment[];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }
  ).format(amount);
}

export default function OutstandingPaymentsTable({
  payments,
}: Props) {
  if (payments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-white p-10 text-center">
        <p className="font-medium text-gray-700">
          No outstanding payments
        </p>

        <p className="mt-1 text-sm text-gray-500">
          All invoices are fully paid.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="overflow-x-auto">

        <table className="w-full min-w-[1000px] text-sm">

          <thead className="border-b bg-slate-50">

            <tr>

              <th className="px-5 py-4 text-left font-semibold">
                Invoice
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Customer
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Date
              </th>

              <th className="px-5 py-4 text-right font-semibold">
                Invoice Total
              </th>

              <th className="px-5 py-4 text-right font-semibold">
                Paid
              </th>

              <th className="px-5 py-4 text-right font-semibold">
                Outstanding
              </th>

              <th className="px-5 py-4 text-center font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-center font-semibold">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr
                key={payment.invoiceId}
                className="border-b last:border-b-0 hover:bg-slate-50"
              >

                <td className="px-5 py-4">

                  <div className="font-medium text-gray-900">
                    {payment.invoiceNumber}
                  </div>

                </td>

                <td className="px-5 py-4">

                  <div className="font-medium text-gray-900">
                    {payment.customerName}
                  </div>

                </td>

                <td className="px-5 py-4 text-gray-600">
                  {formatDate(
                    payment.invoiceDate
                  )}
                </td>

                <td className="px-5 py-4 text-right">
                  {formatAmount(
                    payment.invoiceTotal
                  )}
                </td>

                <td className="px-5 py-4 text-right font-medium text-green-700">
                  {formatAmount(
                    payment.totalPaid
                  )}
                </td>

                <td className="px-5 py-4 text-right font-bold text-red-600">
                  {formatAmount(
                    payment.outstandingAmount
                  )}
                </td>

                <td className="px-5 py-4 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      payment.paymentStatus ===
                      "PARTIAL"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.paymentStatus}
                  </span>

                </td>

                <td className="px-5 py-4 text-center">

                  <Link
                    href={`/dashboard/invoices/${payment.invoiceId}`}
                    className="inline-flex rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                    title="View Invoice"
                  >
                    <Eye size={18} />
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}