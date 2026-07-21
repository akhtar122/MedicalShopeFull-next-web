"use client";

import { useEffect, useState } from "react";
import { Batch, CreateBatchRequest } from "@/types/batch";

interface Props {
  batch?: Batch | null;
  loading: boolean;
  onSubmit: (data: CreateBatchRequest) => Promise<void>;
}

export default function BatchForm({
  batch,
  loading,
  onSubmit,
}: Props) {
  const [form, setForm] =
    useState<CreateBatchRequest>({
      batchNo: batch?.batchNo ?? "",
      expiryDate: batch?.expiryDate?.substring(0, 10) ?? "",
      purchasePrice: batch?.purchasePrice ?? 0,
      sellingPrice: batch?.sellingPrice ?? 0,
      quantityReceived: batch?.quantityReceived ?? 0,
      quantityAvailable: batch?.quantityAvailable ?? 0,
    });

  useEffect(() => {
    if (!batch) return;

    setForm({
      batchNo: batch.batchNo,
      expiryDate: batch.expiryDate.substring(0, 10),
      purchasePrice: batch.purchasePrice,
      sellingPrice: batch.sellingPrice,
      quantityReceived: batch.quantityReceived,
      quantityAvailable: batch.quantityAvailable,
    });
  }, [batch]);

  function change(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        e.target.type === "number"
          ? Number(value)
          : value,
    }));
  }
 

  async function submit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await onSubmit(form);
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4"
    >
      <input
        name="batchNo" 
        placeholder="Batch No"
        className="w-full rounded border p-2"
        value={form.batchNo}
        onChange={change}
        readOnly
      />

      <input
        type="date"
        name="expiryDate"
        className="w-full rounded border p-2"
        value={form.expiryDate}
        onChange={change}
        readOnly
      />

      <input
        type="number"
        name="purchasePrice"
        placeholder="Purchase Price"
        className="w-full rounded border p-2"
        value={form.purchasePrice}
        onChange={change}
        readOnly
      />

      <input
        type="number"
        name="sellingPrice"
        placeholder="Selling Price"
        className="w-full rounded border p-2"
        value={form.sellingPrice}
        onChange={change}
        readOnly
      />

      <input
        type="number"
        name="quantityReceived"
        placeholder="Received Qty"
        className="w-full rounded border p-2"
        value={form.quantityReceived}
        onChange={change}
        readOnly
      />

      <input
        type="number"
        name="quantityAvailable"
        placeholder="Available Qty"
        className="w-full rounded border p-2"
        value={form.quantityAvailable}
        onChange={change}
        readOnly
      />

      {/* <button
        disabled={loading}
        className="w-full rounded bg-blue-600 p-3 text-white"
      >
        {loading ? "Saving..." : "Save Batch"}
      </button> */}
    </form>
  );
}