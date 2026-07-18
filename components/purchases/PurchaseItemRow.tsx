"use client";

import { Trash2 } from "lucide-react";
import { PurchaseItem } from "@/types/purchase";
import { Medicine } from "@/types/medicine";

interface Props {
  index: number;
  item: PurchaseItem;
  medicines: Medicine[];
  onChange: (index: number, item: PurchaseItem) => void;
  onRemove: (index: number) => void;
}

export default function PurchaseItemRow({
  index,
  item,
  medicines,
  onChange,
  onRemove,
}: Props) {
  function update<K extends keyof PurchaseItem>(
    field: K,
    value: PurchaseItem[K]
  ) {
    const updated = {
      ...item,
      [field]: value,
    };

    updated.lineTotal =
      Number(updated.quantity) *
      Number(updated.purchasePrice);

    onChange(index, updated);
  }

  function medicineChanged(id: string) {
    const medicine = medicines.find(
      (m) => m.id === id
    );

    if (!medicine) return;

    onChange(index, {
      ...item,
      medicineId: medicine.id,
      medicineName: medicine.name,
      purchasePrice: medicine.purchasePrice,
      currentSellingPrice:
        medicine.sellingPrice,
      lineTotal:
        medicine.purchasePrice *
        item.quantity,
    });
  }

  const margin =
    item.currentSellingPrice -
    item.purchasePrice;

  return (
    <tr className="border-t">

      <td className="p-2">

        <select
          value={item.medicineId}
          onChange={(e) =>
            medicineChanged(
              e.target.value
            )
          }
          className="w-52 rounded border p-2"
        >
          <option value="">
            Select
          </option>

          {medicines.map((medicine) => (
            <option
              key={medicine.id}
              value={medicine.id}
            >
              {medicine.name}
            </option>
          ))}

        </select>

      </td>

      <td className="p-2">

        <input
          value={item.batchNo}
          onChange={(e) =>
            update(
              "batchNo",
              e.target.value
            )
          }
          className="w-32 rounded border p-2"
        />

      </td>

      <td className="p-2">

        <input
          type="date"
          value={item.expiryDate}
          onChange={(e) =>
            update(
              "expiryDate",
              e.target.value
            )
          }
          className="rounded border p-2"
        />

      </td>

      <td className="p-2">

        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) =>
            update(
              "quantity",
              Number(e.target.value)
            )
          }
          className="w-20 rounded border p-2 text-right"
        />

      </td>

      <td className="p-2">

        <input
          type="number"
          step="0.01"
          value={item.purchasePrice}
          onChange={(e) =>
            update(
              "purchasePrice",
              Number(e.target.value)
            )
          }
          className="w-24 rounded border p-2 text-right"
        />

      </td>

      <td className="p-2 text-right">
        ₹ {item.currentSellingPrice.toFixed(2)}
      </td>

      <td className="p-2 text-right">

        <span
          className={
            margin >= 0
              ? "font-semibold text-green-600"
              : "font-semibold text-red-600"
          }
        >
          ₹ {margin.toFixed(2)}
        </span>

      </td>

      <td className="p-2 text-right font-semibold">

        ₹ {item.lineTotal.toFixed(2)}

      </td>

      <td className="p-2 text-center">

        <button
          onClick={() =>
            onRemove(index)
          }
        >
          <Trash2
            size={18}
            className="text-red-600"
          />
        </button>

      </td>

    </tr>
  );
}