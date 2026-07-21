"use client";

import { InvoiceBatch } from "@/types/invoice";

interface Props {
  batches: InvoiceBatch[];

  value: string;

  onChange: (id: string) => void;
}

export default function BatchSelect({
  batches,
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5">

      <label className="mb-3 block font-medium">
        Batch
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border px-4 py-3"
      >
        <option value="">
          Select Batch
        </option>

        {batches.map((batch) => (
          <option
            key={batch.id}
            value={batch.id}
          >
            {batch.batchNo}
            {" | "}
            Qty:
            {" "}
            {batch.quantityAvailable}
          </option>
        ))}

      </select>

    </div>
  );
}