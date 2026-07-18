"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import PurchaseFilters from "@/components/purchases/PurchaseFilters";
import PurchaseTable from "@/components/purchases/PurchaseTable";

import { usePurchases } from "@/hooks/usePurchases";

import {
  deletePurchase,
} from "@/services/purchase.service";

export default function PurchasesPage() {

  const {
    purchases,
    loading,
    refresh,
  } = usePurchases();

  const [search, setSearch] =
    useState("");

  const filtered = useMemo(() => {

    return purchases.filter((purchase) =>

      purchase.purchaseNo
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      purchase.supplierName
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [purchases, search]);

  async function remove(id: string) {

    const ok = window.confirm(
      "Delete purchase?"
    );

    if (!ok) return;

    await deletePurchase(id);

    refresh();
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Purchases
          </h1>

          <p className="text-gray-500">
            Manage supplier purchases
          </p>

        </div>

        <Link
          href="/dashboard/purchases/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          <Plus size={18} />

          Add Purchase

        </Link>

      </div>

      <PurchaseFilters
        search={search}
        onSearchChange={setSearch}
      />

      <PurchaseTable
        purchases={filtered}
        loading={loading}
        onDelete={remove}
      />

    </div>
  );
}