"use client";

import { useState } from "react";
import { X } from "lucide-react";

import AdjustStockForm from "./AdjustStockForm";
import { adjustStock } from "@/services/inventory.service";
import { AdjustStockRequest } from "@/types/inventory";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function AdjustStockDialog({
  open,
  onClose,
  onSaved,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  async function save(
    data: AdjustStockRequest
  ) {
    setLoading(true);

    try {
      await adjustStock(data);

      onSaved();

      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-xl bg-white p-6">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-xl font-semibold">
            Adjust Stock
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <AdjustStockForm
          loading={loading}
          onSubmit={save}
        />

      </div>

    </div>
  );
}