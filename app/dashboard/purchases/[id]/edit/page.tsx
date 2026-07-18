"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import PurchaseForm from "@/components/purchases/PurchaseForm";

import {
  getPurchase,
  updatePurchase,
} from "@/services/purchase.service";

import {
  CreatePurchaseRequest,
  PurchaseDetails,
} from "@/types/purchase";

export default function EditPurchasePage() {
  const params = useParams();

  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [initial, setInitial] =
    useState<CreatePurchaseRequest>();

  useEffect(() => {
    loadPurchase();
  }, []);

  async function loadPurchase() {
    const purchase: PurchaseDetails =
      await getPurchase(id);

    setInitial({
  supplierId: purchase.supplierId,
  supplierInvoiceNo:
    purchase.supplierInvoiceNo,
  purchaseDate: purchase.purchaseDate.substring(0, 10),
  items: purchase.items,
});

    setLoading(false);
  }

  async function save(
    request: CreatePurchaseRequest
  ) {
    setSaving(true);

    try {
      await updatePurchase(
        id,
        request
      );

      router.push(
        "/dashboard/purchases"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Edit Purchase
        </h1>

        <p className="text-gray-500">
          Update purchase information
        </p>

      </div>

      {initial && (
        <PurchaseForm
          initial={initial}
          loading={saving}
          onSubmit={save}
        />
      )}

    </div>
  );
}