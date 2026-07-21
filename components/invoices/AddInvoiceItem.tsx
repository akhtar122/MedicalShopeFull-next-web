"use client";

import { useEffect, useState } from "react";

import MedicineSearch from "./MedicineSearch";
import BatchSelect from "./BatchSelect";

import { useInvoiceMedicines } from "@/hooks/useInvoiceMedicines";
import { useInvoiceBatches } from "@/hooks/useInvoiceBatches";

import {
  InvoiceBatch,
  InvoiceLine,
} from "@/types/invoice";

interface Props {
  items: InvoiceLine[];

  onAdd: (item: InvoiceLine) => void;
}

export default function AddInvoiceItem({
  items,
  onAdd,
}: Props) {
  const medicines =
    useInvoiceMedicines();

  const [medicineId, setMedicineId] =
    useState("");

  const batches =
    useInvoiceBatches(medicineId);

  const [batchId, setBatchId] =
    useState("");

  const [qty, setQty] =
    useState(1);

  useEffect(() => {
    if (batches.length > 0) {
      setBatchId(batches[0].id);
    }
  }, [batches]);

  function add() {
    const medicine =
      medicines.find(
        (m) => m.id === medicineId
      );

    const batch =
      batches.find(
        (b) => b.id === batchId
      );

    if (!medicine || !batch) return;

    if (qty <= 0) {
      alert("Invalid quantity");
      return;
    }

    if (qty > batch.quantityAvailable) {
      alert(
        `Only ${batch.quantityAvailable} available`
      );

      return;
    }

    const exists =
      items.find(
        (x) =>
          x.medicineBatchId ===
          batch.id
      );

    if (exists) {
      alert(
        "Batch already added. Edit quantity instead."
      );

      return;
    }

    onAdd({
      medicineId: medicine.id,

      medicineName: medicine.name,

      medicineBatchId: batch.id,

      batchNo: batch.batchNo,

      expiryDate:
        batch.expiryDate,

      quantity: qty,

      availableQuantity:
        batch.quantityAvailable,

      sellingPrice:
        batch.sellingPrice,

      gstRate:
        medicine.gstRate,

      lineTotal:
        qty *
        batch.sellingPrice *
        (1 + medicine.gstRate / 100),
    });

    setMedicineId("");

    setBatchId("");

    setQty(1);
  }

  return (
    <div className="rounded-xl border bg-white p-6">

      <h2 className="mb-6 text-lg font-semibold">
        Add Medicine
      </h2>

      <div className="grid gap-4 md:grid-cols-4">

        <MedicineSearch
          medicines={medicines}
          value={medicineId}
          onChange={setMedicineId}
        />

        <BatchSelect
          batches={batches}
          value={batchId}
          onChange={setBatchId}
        />

        <div>

          <label className="mb-2 block font-medium">
            Quantity
          </label>

          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) =>
              setQty(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full rounded-lg border px-4 py-3"
          />

        </div>

        <div className="flex items-end">

          <button
            onClick={add}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            Add Item
          </button>

        </div>

      </div>

    </div>
  );
}