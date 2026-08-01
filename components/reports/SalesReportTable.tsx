"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { SalesReportItem } from "@/types/report";

interface Props {
  invoices: SalesReportItem[];
}

export default function SalesReportTable({
  invoices,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="font-semibold">
          Sales Report
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Invoice No
              </th>

              <th className="py-3 text-left text-sm font-semibold">
                Customer
              </th>

              <th className="py-3 text-left text-sm font-semibold">
                Date
              </th>

              <th className="py-3 text-center text-sm font-semibold">
                Status
              </th>

              <th className="py-3 text-right text-sm font-semibold">
                Subtotal
              </th>

              <th className="py-3 text-right text-sm font-semibold">
                GST
              </th>

              <th className="py-3 text-right text-sm font-semibold">
                Discount
              </th>

              <th className="py-3 text-right text-sm font-semibold">
                Grand Total
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {invoices.length === 0 && (

              <tr>

                <td
                  colSpan={9}
                  className="py-12 text-center text-gray-500"
                >
                  No invoices found.
                </td>

              </tr>

            )}

            {invoices.map((invoice) => (

              <tr
                key={invoice.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-4 font-medium">
                  {invoice.invoiceNumber}
                </td>

                <td>
                  {invoice.customerName}
                </td>

                <td>
                  {new Date(
                    invoice.invoiceDate
                  ).toLocaleDateString()}
                </td>

                <td className="text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      invoice.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : invoice.paymentStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {invoice.paymentStatus}
                  </span>

                </td>

                <td className="text-right">
                  ₹ {invoice.subtotal.toFixed(2)}
                </td>

                <td className="text-right">
                  ₹ {invoice.gstTotal.toFixed(2)}
                </td>

                <td className="text-right">
                  ₹ {invoice.discount.toFixed(2)}
                </td>

                <td className="text-right font-semibold">
                  ₹ {invoice.grandTotal.toFixed(2)}
                </td>

                <td>

                  <div className="flex justify-center">

                    <Link
                      href={`/dashboard/invoices/${invoice.id}`}
                    >
                      <Eye
                        size={18}
                        className="text-blue-600 hover:text-blue-800"
                      />
                    </Link>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}