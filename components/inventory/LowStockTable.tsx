"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

import { LowStockItem } from "@/types/inventory";

interface Props {
  items: LowStockItem[];
}

const PAGE_SIZE = 10;

export default function LowStockTable({
  items,
}: Props) {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return items.filter((x) =>
      x.medicineName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
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
            Low Stock Medicines
          </h2>

          <p className="text-sm text-gray-500">
            Medicines below reorder level
          </p>

        </div>

        <input
          className="w-72 rounded-lg border px-3 py-2"
          placeholder="Search medicine..."
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
              Medicine
            </th>

            <th className="text-left">
              Batch
            </th>

            <th className="text-right">
              Available
            </th>

            <th className="text-right">
              Reorder
            </th>

            <th className="text-center">
              Expiry
            </th>

            <th className="text-center">
              Action
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
                No low stock medicines.
              </td>

            </tr>

          )}

          {paged.map((item) => {

            const expiry = new Date(item.expiryDate);

            const days = Math.ceil(
              (expiry.getTime() - Date.now()) /
                (1000 * 60 * 60 * 24)
            );

            return (

              <tr
                key={`${item.medicineId}-${item.batchNo}`}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-4 font-medium">
                  {item.medicineName}
                </td>

                <td>
                  {item.batchNo}
                </td>

                <td className="text-right font-semibold text-red-600">
                  {item.quantityAvailable}
                </td>

                <td className="text-right">
                  {item.reorderLevel}
                </td>

                <td className="text-center">

                  {days < 0 && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      Expired
                    </span>
                  )}

                  {days >= 0 &&
                    days <= 30 && (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                        {days} Days
                      </span>
                    )}

                  {days > 30 && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Good
                    </span>
                  )}

                </td>

                <td>

                  <div className="flex justify-center">

                    <Link
                      href={`/dashboard/medicines/${item.medicineId}/batches`}
                      className="rounded-lg p-2 hover:bg-slate-100"
                    >
                      <Eye
                        size={18}
                        className="text-blue-600"
                      />
                    </Link>

                  </div>

                </td>

              </tr>

            );
          })}

        </tbody>

      </table>

      <div className="flex items-center justify-between border-t p-4">

        <p className="text-sm text-gray-500">

          Showing {paged.length} of {filtered.length}

        </p>

        <div className="flex gap-2">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
            className="rounded border px-3 py-1 disabled:opacity-40"
          >
            Previous
          </button>

          <span className="px-3 py-1 text-sm">

            {page} / {totalPages}

          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage(page + 1)
            }
            className="rounded border px-3 py-1 disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}