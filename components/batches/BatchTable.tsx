"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Batch } from "@/types/batch";

interface Props {
  batches: Batch[];
}

export default function BatchTable({
  batches,
}: Props) {
    function onEdit(batch: Batch): void {
      // Emit a custom event so parent components or pages can handle editing the batch.
      // Detail contains the full batch object.
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("edit-batch", { detail: batch }));
      }
    }

    function onDelete(id: string): void {
      // Emit a custom event so parent components or pages can handle deleting the batch.
      // Detail contains the batch id.
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("delete-batch", { detail: { id } }));
      }
    }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="font-semibold">
          Batch List
        </h2>

      </div>

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-3 text-left text-sm">
              Batch No
            </th>

            <th className="text-left text-sm">
              Expiry
            </th>

            <th className="text-right text-sm">
              Purchase
            </th>

            <th className="text-right text-sm">
              Selling
            </th>

            <th className="text-right text-sm">
              Available
            </th>

            <th className="text-center text-sm">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {batches.length === 0 && (

            <tr>

              <td
                colSpan={6}
                className="py-10 text-center text-gray-500"
              >
                No batches found.
              </td>

            </tr>

          )}

          {batches.map(batch => (

            <tr
              key={batch.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {batch.batchNo}
              </td>

              <td>
                {new Date(
                  batch.expiryDate
                ).toLocaleDateString()}
              </td>

              <td className="text-right">
                ₹ {batch.purchasePrice}
              </td>

              <td className="text-right">
                ₹ {batch.sellingPrice}
              </td>

              <td className="text-right font-semibold">
                {batch.quantityAvailable}
              </td>

              <td>

                <div className="flex justify-center gap-3">

                  <button
                   onClick={() => onEdit(batch)}
                  >                      
                    <Pencil
                      size={18}
                      className="text-blue-600 hover:text-blue-800"
                    />

                  </button>

                  <button
                  onClick={() => onDelete(batch.id)}>

                    <Trash2
                      size={18}
                      className="text-red-600 hover:text-red-800"
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