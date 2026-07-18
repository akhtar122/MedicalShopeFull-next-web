"use client";

import { useMemo, useState } from "react";

import { StockHistory } from "@/types/inventory";

interface Props {
  items: StockHistory[];
}

const PAGE_SIZE = 10;

export default function StockHistoryTable({
  items,
}: Props) {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return items.filter((x) => {
      const medicine =
        x.medicineName?.toLowerCase() ?? "";

      const batch =
        x.batchNo?.toLowerCase() ?? "";

      return (
        medicine.includes(search.toLowerCase()) ||
        batch.includes(search.toLowerCase())
      );
    });
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
            Stock Movement History
          </h2>

          <p className="text-sm text-gray-500">
            Complete inventory ledger
          </p>

        </div>

        <input
          className="w-72 rounded-lg border px-3 py-2"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

      </div>

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-3 text-left">
              Date
            </th>

            <th className="text-left">
              Medicine
            </th>

            <th className="text-left">
              Batch
            </th>

            <th className="text-center">
              Type
            </th>

            <th className="text-center">
              Reference
            </th>

            <th className="text-right">
              Quantity
            </th>

            <th className="text-right">
              Balance
            </th>

          </tr>

        </thead>

        <tbody>

          {paged.length === 0 && (

            <tr>

              <td
                colSpan={7}
                className="py-10 text-center text-gray-500"
              >
                No stock history found.
              </td>

            </tr>

          )}

          {paged.map((item, index) => (

            <tr
              key={index}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4">

                {new Date(item.date).toLocaleString()}

              </td>

              <td>

                {item.medicineName ?? "-"}

              </td>

              <td>

                {item.batchNo ?? "-"}

              </td>

              <td className="text-center">

                {item.movementType === "IN" ? (

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    IN
                  </span>

                ) : (

                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    OUT
                  </span>

                )}

              </td>

              <td className="text-center">

                {item.referenceType}

              </td>

              <td className="text-right font-semibold">

                {item.quantity}

              </td>

              <td className="text-right">

                {item.balanceAfter}

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