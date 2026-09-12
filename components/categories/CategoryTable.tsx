"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  Category,
} from "@/types/category";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (
    category: Category
  ) => void;
  onDelete: (
    category: Category
  ) => void;
  deletingId?: string | null;
}

function formatDate(
  date?: string | null
) {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "—";
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
  deletingId,
}: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-white p-10 text-center">
        <p className="font-medium text-gray-700">
          No categories found
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Add your first medicine category.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[800px] text-sm">

          <thead className="border-b bg-slate-50">

            <tr>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Category
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Description
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Created
              </th>

              <th className="px-5 py-4 text-right font-semibold text-gray-700">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {categories.map(
              (category) => {

                const deleting =
                  deletingId ===
                  category.id;

                return (
                  <tr
                    key={category.id}
                    className="border-b last:border-b-0 hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">

                      <div className="font-medium text-gray-900">
                        {category.name}
                      </div>

                    </td>

                    <td className="px-5 py-4 text-gray-600">

                      {category.description ||
                        "—"}

                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-500">

                      {formatDate(
                        category.createdAt
                      )}

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            onEdit(
                              category
                            )
                          }
                          disabled={deleting}
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                          title="Edit"
                        >
                          <Pencil
                            size={17}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onDelete(
                              category
                            )
                          }
                          disabled={deleting}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2
                            size={17}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              }
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}