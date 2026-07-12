"use client";

import { useState } from "react";
import { X } from "lucide-react";

import BatchForm from "./BatchForm";

import {
  createBatch,
  updateBatch,
} from "@/services/batch.service";

import {
  Batch,
  CreateBatchRequest,
} from "@/types/batch";

interface Props {
  medicineId: string;
  open: boolean;
  batch?: Batch | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function AddBatchDialog({
  medicineId,
  open,
  batch,
  onClose,
  onSaved,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

 async function save(data: CreateBatchRequest) {
  setLoading(true);

  try {
    if (batch) {
      await updateBatch(
        medicineId,
        batch.id,
        data
      );
    } else {
      await createBatch(
        medicineId,
        data
      );
    }

    onSaved();
    onClose();
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-xl bg-white p-6">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-xl font-semibold">
            <h2 className="text-xl font-semibold">
  {batch ? "Edit Batch" : "Add Batch"}
</h2>
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <BatchForm
  batch={batch}
  loading={loading}
  onSubmit={save}
/>

      </div>

    </div>
  );
}