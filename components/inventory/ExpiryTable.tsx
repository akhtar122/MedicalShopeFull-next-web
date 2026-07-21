"use client";

import { useMemo, useState } from "react";

import { ExpiryItem } from "@/types/inventory";

interface Props {
  items: ExpiryItem[];
}

const PAGE_SIZE = 10;

export default function ExpiryTable({
  items,
}: Props) {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return items
      .filter((x) =>
        x.medicineName
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, [items, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const paged = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-5">

        <div>

          <h2 className="font-semibold">
            Expiring Medicines
          </h2>

          <p className="text-sm text-gray-500">
            Medicines expiring soon
          </p>

        </div>

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search medicine..."
          className="w-72 rounded-lg border px-3 py-2"
        />

      </div>

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-3 text-left">
              Medicine
            </th>

            <th className="text-left">
              Batch
            </th>

            <th className="text-center">
              Expiry Date
            </th>

            <th className="text-center">
              Days Left
            </th>

            <th className="text-right">
              Quantity
            </th>

            <th className="text-center">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {paged.length === 0 && (

            <tr>

              <td
                colSpan={6}
                className="py-10 text-center text-gray-500"
              >
                No expiring medicines.
              </td>

            </tr>

          )}

          {paged.map((item) => (

            <tr
              key={`${item.batchNo}-${item.expiryDate}`}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {item.medicineName}
              </td>

              <td>
                {item.batchNo}
              </td>

              <td className="text-center">
                {new Date(
                  item.expiryDate
                ).toLocaleDateString()}
              </td>

              <td className="text-center font-semibold">

                {item.daysLeft}

              </td>

              <td className="text-right">

                {item.quantityAvailable}

              </td>

              <td className="text-center">

                {item.daysLeft < 0 && (

                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Expired
                  </span>

                )}

                {item.daysLeft >= 0 &&
                  item.daysLeft <= 30 && (

                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                    Expiring Soon
                  </span>

                )}

                {item.daysLeft > 30 && (

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Good
                  </span>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="flex items-center justify-between border-t p-4">

        <p className="text-sm text-gray-500">

          Showing {paged.length} of {filtered.length}

        </p>

        <div className="flex gap-2">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded border px-3 py-1 disabled:opacity-40"
          >
            Previous
          </button>

          <span className="px-3 py-1">

            {page} / {totalPages}

          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded border px-3 py-1 disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}