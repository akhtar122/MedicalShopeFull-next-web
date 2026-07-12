"use client";

import { useState } from "react";
import { CreateBatchRequest } from "@/types/batch";

interface Props {
  loading: boolean;
  onSubmit: (data: CreateBatchRequest) => Promise<void>;
}

export default function BatchForm({
  loading,
  onSubmit,
}: Props) {
  const [form, setForm] =
    useState<CreateBatchRequest>({
      batchNo: "",
      expiryDate: "",
      purchasePrice: 0,
      sellingPrice: 0,
      quantityReceived: 0,
      quantityAvailable: 0,
    });

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
        onChange={change}
      />

      <input
        type="date"
        name="expiryDate"
        className="w-full rounded border p-2"
        onChange={change}
      />

      <input
        type="number"
        name="purchasePrice"
        placeholder="Purchase Price"
        className="w-full rounded border p-2"
        onChange={change}
      />

      <input
        type="number"
        name="sellingPrice"
        placeholder="Selling Price"
        className="w-full rounded border p-2"
        onChange={change}
      />

      <input
        type="number"
        name="quantityReceived"
        placeholder="Received Qty"
        className="w-full rounded border p-2"
        onChange={change}
      />

      <input
        type="number"
        name="quantityAvailable"
        placeholder="Available Qty"
        className="w-full rounded border p-2"
        onChange={change}
      />

      <button
        disabled={loading}
        className="w-full rounded bg-blue-600 p-3 text-white"
      >
        {loading ? "Saving..." : "Save Batch"}
      </button>
    </form>
  );
}