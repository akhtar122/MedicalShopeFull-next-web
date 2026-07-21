"use client";

import { Pencil, Trash2 } from "lucide-react";

import { Batch } from "@/types/batch";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
  batches: Batch[];
  onEdit: (batch: Batch) => void;
  onDelete: (id: string) => void;
}

export default function BatchTable({
  batches,
  onEdit,
  onDelete,
}: Props) {
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

          {batches.map((batch) => {

            const expiry = new Date(batch.expiryDate);

            const today = new Date();

            const diff = Math.ceil(
              (expiry.getTime() - today.getTime()) /
                (1000 * 60 * 60 * 24)
            );

            return (

              <tr
                key={batch.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-4 font-medium">
                  {batch.batchNo}
                </td>

                <td>

                  <div className="flex flex-col gap-1">

                    <span>
                      {expiry.toLocaleDateString()}
                    </span>

                    {diff < 0 && (
                      <StatusBadge
                        color="red"
                        text="Expired"
                      />
                    )}

                    {diff >= 0 && diff <= 30 && (
                      <StatusBadge
                        color="orange"
                        text="Expiring Soon"
                      />
                    )}

                    {diff > 30 && (
                      <StatusBadge
                        color="green"
                        text="Good"
                      />
                    )}

                  </div>

                </td>

                <td className="text-right">
                  ₹ {batch.purchasePrice.toFixed(2)}
                </td>

                <td className="text-right">
                  ₹ {batch.sellingPrice.toFixed(2)}
                </td>

                <td className="text-right font-semibold">
                  {batch.quantityAvailable}
                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(batch)}
                      className="rounded p-1 hover:bg-slate-100"
                    >
                      <Pencil
                        size={18}
                        className="text-blue-600"
                      />
                    </button>

                    <button
                      onClick={() => onDelete(batch.id)}
                      className="rounded p-1 hover:bg-slate-100"
                    >
                      <Trash2
                        size={18}
                        className="text-red-600"
                      />
                    </button>

                  </div>

                </td>

              </tr>

            );
          })}

        </tbody>

      </table>

    </div>
  );
}