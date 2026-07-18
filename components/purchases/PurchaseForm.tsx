"use client";

import { useMemo, useState } from "react";

import PurchaseHeaderCard from "./PurchaseHeaderCard";
import PurchaseItemsTable from "./PurchaseItemsTable";
import PurchaseSummary from "./PurchaseSummary";

import { useSuppliers } from "@/hooks/useSuppliers";
import { useMedicines } from "@/hooks/useMedicines";
import { useRouter } from "next/navigation";

import {
  CreatePurchaseRequest,
  PurchaseItem,
} from "@/types/purchase";
import { Box, Button } from "@mui/material";


interface Props {
  loading?: boolean;

  initial?: CreatePurchaseRequest;

  onSubmit: (
    request: CreatePurchaseRequest
  ) => Promise<void>;
}

export default function PurchaseForm({
  loading = false,
  initial,
  onSubmit,
}: Props) {
  const suppliers = useSuppliers();
  const router = useRouter();

  const { medicines } = useMedicines();

  const [supplierId, setSupplierId] = useState(
    initial?.supplierId ?? ""
  );

  const [supplierInvoiceNo, setSupplierInvoiceNo] =
    useState(
      initial?.supplierInvoiceNo ?? ""
    );

  const [purchaseDate, setPurchaseDate] =
  useState(
    ((initial as any)?.purchaseDate) ??
      new Date()
        .toISOString()
        .substring(0, 10)
  );

  const [items, setItems] =
    useState<PurchaseItem[]>(
      initial?.items ?? [
        {
          medicineId: "",

          medicineName: "",

          batchNo: "",

          expiryDate: "",

          quantity: 1,

          purchasePrice: 0,

          currentSellingPrice: 0,

          lineTotal: 0,
        },
      ]
    );

  function addItem() {
    setItems([
      ...items,
      {
        medicineId: "",

        medicineName: "",

        batchNo: "",

        expiryDate: "",

        quantity: 1,

        purchasePrice: 0,

        currentSellingPrice: 0,

        lineTotal: 0,
      },
    ]);
  }

  function removeItem(index: number) {
    setItems(
      items.filter((_, i) => i !== index)
    );
  }

  function updateItem(
    index: number,
    item: PurchaseItem
  ) {
    const copy = [...items];

    copy[index] = item;

    setItems(copy);
  }

  const grandTotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + item.lineTotal,
        0
      ),
    [items]
  );

  async function submit() {
    if (!supplierId) {
      alert("Select supplier");
      return;
    }

    if (items.length === 0) {
      alert("Add at least one item");
      return;
    }

    await onSubmit({
  supplierId,
  supplierInvoiceNo,
  purchaseDate,
  items,
})
  }

  return (
    <div className="space-y-6">

      <PurchaseHeaderCard
        suppliers={suppliers}
        supplierId={supplierId}
        supplierInvoiceNo={
          supplierInvoiceNo
        }
        purchaseDate={purchaseDate}
        onSupplierChange={setSupplierId}
        onInvoiceChange={
          setSupplierInvoiceNo
        }
        onDateChange={setPurchaseDate}
      />

      <PurchaseItemsTable
        medicines={medicines}
        items={items}
        onAdd={addItem}
        onRemove={removeItem}
        onChange={updateItem}
      />

      <PurchaseSummary
        totalItems={items.length}
        grandTotal={grandTotal}
      />
      <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() =>
            router.push("/dashboard/purchases")
          }
        >
          Cancel
        </Button>

        <button
          onClick={submit}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Purchase"}
        </button>
      </Box>
    </div>
  );
}