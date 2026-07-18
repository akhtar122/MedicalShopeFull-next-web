"use client";

import { PurchaseDetails } from "@/types/purchase";

interface Props {
  purchase: PurchaseDetails;
}

export default function PurchaseInfoCard({
  purchase,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold">
        Purchase Information
      </h2>

      <div className="grid grid-cols-2 gap-5">

        <div>

          <label className="text-sm text-gray-500">
            Purchase No
          </label>

          <p className="font-semibold">
            {purchase.purchaseNo}
          </p>

        </div>

        <div>

          <label className="text-sm text-gray-500">
            Supplier
          </label>

          <p className="font-semibold">
            {purchase.supplierName}
          </p>

        </div>

        <div>

          <label className="text-sm text-gray-500">
            Supplier Invoice
          </label>

          <p className="font-semibold">
            {purchase.supplierInvoiceNo}
          </p>

        </div>

        <div>

          <label className="text-sm text-gray-500">
            Purchase Date
          </label>

          <p className="font-semibold">
            {new Date(
              purchase.purchaseDate
            ).toLocaleDateString()}
          </p>

        </div>

      </div>

    </div>
  );
}