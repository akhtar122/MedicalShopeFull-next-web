"use client";

import { Trash2 } from "lucide-react";
import { InvoiceItemDetails, InvoiceLine } from "@/types/invoice";

interface Props {

  items: InvoiceItemDetails[] | InvoiceLine[];

  readonly?: boolean;

  onQuantityChange?: (
    batchId: string,
    qty: number
  ) => void;

  onRemove?: (
    batchId: string
  ) => void;
}

export default function InvoiceItemsTable({
  items,
  onQuantityChange,
  onRemove,
  readonly
}: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
        No medicines added.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-4 py-3 text-left">
              Medicine
            </th>

            <th className="text-left">
              Batch
            </th>

            <th className="text-left">
              Expiry
            </th>

            <th className="text-right">
              Available
            </th>

            <th className="text-right">
              Qty
            </th>

            <th className="text-right">
              Price
            </th>

            <th className="text-right">
              GST
            </th>

            <th className="text-right">
              Total
            </th>

            <th className="text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {items.map(item => {
            const availableQuantity =
              "availableQuantity" in item
                ? item.availableQuantity
                : undefined;

            const sellingPrice =
              "sellingPrice" in item
                ? item.sellingPrice
                : undefined;

            return (
              <tr
                key={item.medicineBatchId}
                className="border-t"
              >

                <td className="px-4 py-4 font-medium">
                  {item.medicineName}
                </td>

                <td>
                  {item.batchNo}
                </td>

                <td>
                  {new Date(
                    item.expiryDate
                  ).toLocaleDateString()}
                </td>

                <td className="text-right">
                  {availableQuantity ?? "-"}
                </td>

                <td className="text-right">

                  {readonly ? (

                    item.quantity

                  ) : (

                    <input
                      type="number"
                      min={1}
                      max={availableQuantity}
                      value={item.quantity}
                    onChange={(e) =>
                      onQuantityChange?.(
                        item.medicineBatchId,
                        Number(e.target.value)
                      )
                    }
                    className="w-20 rounded border px-2 py-1 text-right"
                  />

                )}

              </td>

              <td className="text-right">
                {sellingPrice !== undefined
                  ? `₹ ${sellingPrice.toFixed(2)}`
                  : "-"}
              </td>

              <td className="text-right">
                {item.gstRate}%
              </td>

              <td className="text-right font-semibold">
                ₹ {item.lineTotal.toFixed(2)}
              </td>

              <td>

                <div className="flex justify-center">

                  {!readonly && (

                    <button
                      onClick={() =>
                        onRemove?.(
                          item.medicineBatchId
                        )
                      }
                    >
                      <Trash2
                        size={18}
                        className="text-red-600"
                      />
                    </button>

                  )}

                </div>

              </td>

            </tr>

          )})}

        </tbody>

      </table>

    </div>
  );
}