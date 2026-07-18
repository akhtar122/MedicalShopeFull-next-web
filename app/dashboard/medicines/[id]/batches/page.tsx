"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { Batch } from "@/types/batch";

import { useBatches } from "@/hooks/useBatches";

import MedicineInfoCard from "@/components/batches/MedicineInfoCard";
import BatchTable from "@/components/batches/BatchTable";
import BatchDialog from "@/components/batches/BatchDialog";

import { deleteBatch } from "@/services/batch.service";

export default function BatchPage() {
  const params = useParams();
  const medicineId = params.id as string;

  const {
    medicine,
    batches,
    loading,
    refresh,
  } = useBatches(medicineId);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedBatch, setSelectedBatch] =
    useState<Batch | null>(null);

  if (loading)
    return (
      <div className="p-8">
        Loading...
      </div>
    );

  async function handleDelete(
    batchId: string
  ) {
    const ok = window.confirm(
      "Delete this batch?"
    );

    if (!ok) return;

    await deleteBatch(
      medicineId,
      batchId
    );

    refresh();
  }

  function handleEdit(batch: Batch) {
    setSelectedBatch(batch);
    setDialogOpen(true);
  }

  function handleAdd() {
    setSelectedBatch(null);
    setDialogOpen(true);
  }

  function handleSaved() {
    setDialogOpen(false);
    refresh();
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Batch Management
        </h1>

        <p className="text-gray-500">
          {medicine.name}
        </p>
      </div>

      <MedicineInfoCard medicine={medicine} />

      <div className="flex justify-end">

        <button
          onClick={handleAdd}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          + Add Batch
        </button>

      </div>

      <BatchTable
        batches={batches}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BatchDialog
        medicineId={medicineId}
        batch={selectedBatch}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSaved={handleSaved}
      />

    </div>
  );
}