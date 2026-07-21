"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { PurchaseDetails } from "@/types/purchase";
import { getPurchase } from "@/services/purchase.service";

import PurchaseInfoCard from "@/components/purchases/PurchaseInfoCard";
import PurchaseItemsView from "@/components/purchases/PurchaseItemsView";
import PurchaseDetailsSummary from "@/components/purchases/PurchaseDetailsSummary";

export default function PurchaseDetailsPage() {

  const params = useParams();

  const id = params.id as string;

  const [purchase, setPurchase] =
    useState<PurchaseDetails>();

  useEffect(() => {

    getPurchase(id).then(setPurchase);

  }, [id]);

  if (!purchase)
    return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">

          Purchase Details

        </h1>

        <p className="text-gray-500">

          {purchase.purchaseNo}

        </p>

      </div>

      <PurchaseInfoCard
        purchase={purchase}
      />

      <PurchaseItemsView
        items={purchase.items}
      />

      <PurchaseDetailsSummary
        totalItems={
          purchase.items.length
        }
        grandTotal={
          purchase.grandTotal
        }
      />

    </div>
  );
}