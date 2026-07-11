"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { useMedicines } from "@/hooks/useMedicines";
import { deleteMedicine } from "@/services/medicine.service";

import MedicineTable from "@/components/medicines/MedicineTable";
import MedicineFilters from "@/components/medicines/MedicineFilters";

export default function MedicinesPage() {
  const { medicines, loading, refresh } = useMedicines();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;

  const filteredMedicines = useMemo(() => {
    return medicines.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.genericName.toLowerCase().includes(search.toLowerCase()) ||
        m.medicineCode.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        status === "all"
          ? true
          : status === "active"
          ? m.isActive
          : !m.isActive;

      return matchSearch && matchStatus;
    });
  }, [medicines, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMedicines.length / PAGE_SIZE)
  );

  const pagedMedicines = filteredMedicines.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this medicine?")) return;

    await deleteMedicine(id);
    refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Medicines</h1>
          <p className="text-gray-500">Manage medicines</p>
        </div>

        <Link
          href="/dashboard/medicines/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Medicine
        </Link>
      </div>

      <MedicineFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <MedicineTable
        medicines={pagedMedicines}
        loading={loading}
        onDelete={handleDelete}
      />

      <div className="flex justify-end gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-3 py-2">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}