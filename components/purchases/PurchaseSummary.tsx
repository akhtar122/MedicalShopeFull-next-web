"use client";

interface Props {
  totalItems: number;

  grandTotal: number;
}

export default function PurchaseSummary({
  totalItems,
  grandTotal,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-lg font-semibold">
        Purchase Summary
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">

          <span>Total Items</span>

          <span>{totalItems}</span>

        </div>

        <div className="flex justify-between text-xl font-bold">

          <span>Grand Total</span>

          <span>
            ₹ {grandTotal.toFixed(2)}
          </span>

        </div>

      </div>

    </div>
  );
}