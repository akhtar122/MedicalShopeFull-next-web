"use client";

import { Search } from "lucide-react";
import { InvoiceMedicine } from "@/types/invoice";

interface Props {
  medicines: InvoiceMedicine[];

  value: string;

  onChange: (id: string) => void;
}

export default function MedicineSearch({
  medicines,
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5">

      <label className="mb-3 block font-medium">
        Medicine
      </label>

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-3 text-gray-400"
        />

        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full rounded-lg border py-3 pl-11 pr-4"
        >
          <option value="">
            Select Medicine
          </option>

          {medicines.map((medicine) => (
            <option
              key={medicine.id}
              value={medicine.id}
            >
              {medicine.name}
            </option>
          ))}

        </select>

      </div>

    </div>
  );
}