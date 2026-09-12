"use client";

import { Payment } from "@/types/payment";

interface PaymentReportTableProps {
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

function getMethodClass(method: string) {
  switch (method.toUpperCase()) {
    case "CASH":
      return "bg-green-100 text-green-700";

    case "UPI":
      return "bg-blue-100 text-blue-700";

    case "CARD":
      return "bg-purple-100 text-purple-700";

    case "BANK_TRANSFER":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function PaymentReportTable({
  payments,
}: PaymentReportTableProps) {
  if (payments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-white p-10 text-center">
        <p className="font-medium text-gray-700">
          No payment records found
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Try changing the date, payment method, or search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="font-semibold text-gray-900">
            Payment Transactions
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            {payments.length} transaction
            {payments.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Payment Date
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Invoice
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Payment Method
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Transaction Ref
              </th>

              <th className="px-5 py-4 text-right font-semibold text-gray-700">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b last:border-b-0 hover:bg-slate-50"
              >
                {/* Payment Date */}
                <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                  {formatDate(payment.paymentDate)}
                </td>

                {/* Invoice */}
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-900">
                    {payment.invoiceNumber ||
                      payment.invoiceId}
                  </div>

                  {!payment.invoiceNumber && (
                    <div className="mt-1 max-w-[220px] truncate text-xs text-gray-400">
                      {payment.invoiceId}
                    </div>
                  )}
                </td>

                {/* Payment Method */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getMethodClass(
                      payment.paymentMethod
                    )}`}
                  >
                    {payment.paymentMethod}
                  </span>
                </td>

                {/* Transaction Reference */}
                <td className="px-5 py-4">
                  {payment.transactionRef ? (
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-gray-700">
                      {payment.transactionRef}
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      —
                    </span>
                  )}
                </td>

                {/* Amount */}
                <td className="whitespace-nowrap px-5 py-4 text-right font-semibold text-gray-900">
                  {formatAmount(
                    Number(payment.amount)
                  )}
                </td>
              </tr>
            ))}
          </tbody>

          {/* Total */}
          <tfoot className="border-t bg-slate-50">
            <tr>
              <td
                colSpan={4}
                className="px-5 py-4 text-right font-semibold text-gray-700"
              >
                Total Received
              </td>

              <td className="px-5 py-4 text-right font-bold text-gray-900">
                {formatAmount(
                  payments.reduce(
                    (total, payment) =>
                      total +
                      Number(payment.amount || 0),
                    0
                  )
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}