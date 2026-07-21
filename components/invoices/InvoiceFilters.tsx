"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;

  onSearchChange: (
    value: string
  ) => void;
}

export default function InvoiceFilters({
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-3 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search invoice..."
          className="w-full rounded-lg border py-3 pl-11 pr-4 outline-none focus:border-blue-500"
        />

      </div>

    </div>
  );
}