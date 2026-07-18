"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import PurchaseForm from "@/components/purchases/PurchaseForm";

import { createPurchase } from "@/services/purchase.service";

export default function NewPurchasePage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function save(data: any) {
    setLoading(true);

    try {
      await createPurchase(data);

      router.push(
        "/dashboard/purchases"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          New Purchase
        </h1>

        <p className="text-gray-500">
          Create supplier purchase
        </p>

      </div>

      <PurchaseForm
        loading={loading}
        onSubmit={save}
      />

    </div>
  );
}