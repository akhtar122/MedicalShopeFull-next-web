"use client";

import { PurchaseItem } from "@/types/purchase";

interface Props {
  items: PurchaseItem[];
}

export default function PurchaseItemsView({
  items,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <div className="border-b p-5">

        <h2 className="font-semibold">
          Purchase Items
        </h2>

      </div>

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="p-3 text-left">
              Medicine
            </th>

            <th className="p-3 text-left">
              Batch
            </th>

            <th className="p-3 text-left">
              Expiry
            </th>

            <th className="p-3 text-right">
              Qty
            </th>

            <th className="p-3 text-right">
              Purchase
            </th>

            <th className="p-3 text-right">
              Selling
            </th>

            <th className="p-3 text-right">
              Total
            </th>

          </tr>

        </thead>

        <tbody>

          {items.map((item, index) => (

            <tr
              key={index}
              className="border-t"
            >

              <td className="p-3">
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
                {item.quantity}
              </td>

              <td className="text-right">
                ₹ {item.purchasePrice.toFixed(2)}
              </td>

              <td className="text-right">
                ₹ {item.currentSellingPrice.toFixed(2)}
              </td>

              <td className="text-right font-semibold">
                ₹ {item.lineTotal.toFixed(2)}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}