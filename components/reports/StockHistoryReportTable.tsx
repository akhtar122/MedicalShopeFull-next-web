"use client";

import { StockHistoryReportItem } from "@/types/report";

interface Props {
  items: StockHistoryReportItem[];
}

export default function StockHistoryReportTable({
  items,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="font-semibold">
          Stock Movement History
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Date
              </th>

              <th className="py-3 text-left text-sm font-semibold">
                Medicine
              </th>

              <th className="py-3 text-left text-sm font-semibold">
                Batch
              </th>

              <th className="py-3 text-center text-sm font-semibold">
                Movement
              </th>

              <th className="py-3 text-left text-sm font-semibold">
                Reference
              </th>

              <th className="py-3 text-right text-sm font-semibold">
                Quantity
              </th>

              <th className="px-6 py-3 text-right text-sm font-semibold">
                Balance
              </th>

            </tr>

          </thead>

          <tbody>

            {items.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="py-12 text-center text-gray-500"
                >
                  No stock history found.
                </td>

              </tr>

            )}

            {items.map((item, index) => (

              <tr
                key={`${item.batchNo}-${item.date}-${index}`}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-4">
                  {new Date(item.date).toLocaleString()}
                </td>

                <td className="font-medium">
                  {item.medicineName}
                </td>

                <td>
                  {item.batchNo}
                </td>

                <td className="text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.movementType === "IN"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.movementType}
                  </span>

                </td>

                <td>
                  {item.referenceType}
                </td>

                <td className="text-right font-semibold">
                  {item.quantity}
                </td>

                <td className="px-6 text-right font-semibold">
                  {item.balanceAfter}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}