"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { Purchase } from "@/types/purchase";

interface Props {
  purchases: Purchase[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function PurchaseTable({
  purchases,
  loading,
  onDelete,
}: Props) {
  if (loading)
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        Loading...
      </div>
    );

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-3 text-left">
              Purchase No
            </th>

            <th className="text-left">
              Supplier
            </th>

            <th className="text-left">
              Invoice
            </th>

            <th className="text-left">
              Date
            </th>

            <th className="text-right">
              Total
            </th>

            <th className="text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {purchases.map((purchase) => (

            <tr
              key={purchase.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {purchase.purchaseNo}
              </td>

              <td>
                {purchase.supplierName}
              </td>

              <td>
                {purchase.supplierInvoiceNo}
              </td>

              <td>
                {new Date(
                  purchase.purchaseDate
                ).toLocaleDateString()}
              </td>

              <td className="text-right font-semibold">
                ₹ {purchase.grandTotal.toFixed(2)}
              </td>

              <td>

                <div className="flex justify-center gap-3">

                  <Link
                    href={`/dashboard/purchases/${purchase.id}`}
                  >
                    <Eye
                      size={18}
                      className="text-green-600"
                    />
                  </Link>

                  <Link
                    href={`/dashboard/purchases/${purchase.id}/edit`}
                  >
                    <Pencil
                      size={18}
                      className="text-blue-600"
                    />
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(purchase.id)
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