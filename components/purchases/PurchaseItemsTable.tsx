"use client";

import { Plus } from "lucide-react";
import { Medicine } from "@/types/medicine";
import { PurchaseItem } from "@/types/purchase";
import PurchaseItemRow from "./PurchaseItemRow";

interface Props {
  medicines: Medicine[];
  items: PurchaseItem[];
  onChange: (
    index: number,
    item: PurchaseItem
  ) => void;
  onAdd: () => void;
  onRemove: (
    index: number
  ) => void;
}

export default function PurchaseItemsTable({
  medicines,
  items,
  onChange,
  onAdd,
  onRemove,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-5">

        <h2 className="font-semibold">
          Purchase Items
        </h2>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          <Plus size={18} />
          Add Item
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

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
                Margin
              </th>

              <th className="p-3 text-right">
                Total
              </th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {items.map((item, index) => (
              <PurchaseItemRow
                key={index}
                index={index}
                item={item}
                medicines={medicines}
                onChange={onChange}
                onRemove={onRemove}
              />
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}