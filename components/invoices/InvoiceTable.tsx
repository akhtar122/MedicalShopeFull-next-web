"use client";

import Link from "next/link";

import {
  Eye,
  Printer,
  Trash2,
} from "lucide-react";

import { Invoice } from "@/types/invoice";

interface Props {
  invoices: Invoice[];

  onDelete: (
    id: string
  ) => void;
}

export default function InvoiceTable({
  invoices,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left">
              Invoice
            </th>

            <th>Customer</th>

            <th>Date</th>

            <th>Total</th>

            <th>Payment Status</th>

            <th className="text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {invoices.map((invoice) => (

            <tr
              key={invoice.id}
              className="border-t"
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

              <td>
                ₹ {invoice.grandTotal.toFixed(2)}
              </td>
              <td>
                {invoice.paymentStatus}
              </td>

              <td>

                <div className="flex justify-center gap-4">

                  <Link
                    href={`/dashboard/invoices/${invoice.id}`}
                  >
                    <Eye
                      size={18}
                      className="text-blue-600"
                    />
                  </Link>

                  <button>
                    <Printer
                      size={18}
                      className="text-green-600"
                    />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(invoice.id)
                    }
                  >
                    <Trash2
                      size={18}
                      className="text-red-600"
                    />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}