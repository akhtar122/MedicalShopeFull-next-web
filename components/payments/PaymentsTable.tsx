"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { Payment } from "@/types/payment";

interface Props {
  payments: Payment[];
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

export default function PaymentsTable({
  payments,
}: Props) {
  if (payments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-white p-10 text-center">
        <p className="font-medium text-gray-700">
          No payments found
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Payments recorded against invoices will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">

          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left font-semibold">
                Invoice
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Payment Date
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Method
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Transaction Ref
              </th>

              <th className="px-5 py-4 text-right font-semibold">
                Amount
              </th>

              <th className="px-5 py-4 text-center font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b last:border-b-0 hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-900">
                    {payment.invoiceNumber ||
                      payment.invoiceId}
                  </div>

                  <div className="mt-1 max-w-[180px] truncate text-xs text-gray-400">
                    {payment.invoiceId}
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-700">
                  {formatDate(payment.paymentDate)}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {payment.paymentMethod}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="font-mono text-xs text-gray-700">
                    {payment.transactionRef || "—"}
                  </span>
                </td>

                <td className="px-5 py-4 text-right font-semibold text-gray-900">
                  {formatAmount(payment.amount)}
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