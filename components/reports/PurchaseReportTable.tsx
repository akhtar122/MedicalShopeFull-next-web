"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { PurchaseReportItem } from "@/types/report";

interface Props {
  purchases: PurchaseReportItem[];
}

export default function PurchaseReportTable({
  purchases,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="font-semibold">
          Purchase Report
        </h2>

      </div>

      <div className="overflow-x-auto">

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
                Supplier Invoice
              </th>

              <th className="text-left">
                Date
              </th>

              <th className="text-right">
                Grand Total
              </th>

              <th className="text-left">
                Created By
              </th>

              <th className="px-6 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {purchases.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >
                  No purchases found.
                </td>

              </tr>

            )}

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
                  {purchase.createdByName || "-"}
                </td>

                <td>

                  <div className="flex justify-center">

                    <Link
                      href={`/dashboard/purchases/${purchase.id}`}
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