"use client";

import { useEffect, useState } from "react";
import { getMedicines } from "@/services/medicine.service";
import { getMedicineBatches } from "@/services/batch.service";
import { Batch } from "@/types/batch";
import { Medicine } from "@/types/medicine";
import { AdjustStockRequest } from "@/types/inventory";

interface Props {
  loading: boolean;
  onSubmit: (data: AdjustStockRequest) => void;
}

export default function AdjustStockForm({
  loading,
  onSubmit,
}: Props) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);

  const [medicineId, setMedicineId] = useState("");
  const [medicineBatchId, setMedicineBatchId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState("");

  useEffect(() => {
    loadMedicines();
  }, []);

  async function loadMedicines() {
    const data = await getMedicines();
    setMedicines(data);
  }

  async function loadBatches(id: string) {
    const data = await getMedicineBatches(id);
    setBatches(data);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      medicineBatchId,
      quantity,
      reason,
    });
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Medicine
        </label>

        <select
          value={medicineId}
          onChange={(e) => {
            setMedicineId(e.target.value);
            setMedicineBatchId("");
            loadBatches(e.target.value);
          }}
          className="w-full rounded-lg border p-3"
          required
        >
          <option value="">
            Select Medicine
          </option>

          {medicines.map((m) => (
            <option
              key={m.id}
              value={m.id}
            >
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Batch
        </label>

        <select
          value={medicineBatchId}
          onChange={(e) =>
            setMedicineBatchId(e.target.value)
          }
          className="w-full rounded-lg border p-3"
          required
        >
          <option value="">
            Select Batch
          </option>

          {batches.map((b) => (
            <option
              key={b.id}
              value={b.id}
            >
              {b.batchNo} ({b.quantityAvailable})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Quantity
        </label>

        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Reason
        </label>

        <input
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
          className="w-full rounded-lg border p-3"
          placeholder="Stock Adjustment"
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 text-white"
      >
        {loading ? "Saving..." : "Adjust Stock"}
      </button>
    </form>
  );
}