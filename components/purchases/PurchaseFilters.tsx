"use client";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function PurchaseFilters({
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4">

      <input
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        placeholder="Search purchase no, supplier..."
        className="w-full rounded-lg border p-3"
      />

    </div>
  );
}