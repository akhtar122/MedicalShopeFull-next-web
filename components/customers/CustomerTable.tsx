"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  Customer,
} from "@/types/customer";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (
    customer: Customer
  ) => void;
  onDelete: (
    customer: Customer
  ) => void;
  deletingId?: string | null;
}

export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
  deletingId,
}: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-white p-10 text-center">
        <p className="font-medium">
          No customers found
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Add your first customer.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1100px] text-sm">

          <thead className="border-b bg-slate-50">

            <tr>

              <th className="px-5 py-4 text-left font-semibold">
                Customer
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Code
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Phone
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Email
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                GST
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Location
              </th>

              <th className="px-5 py-4 text-right font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {customers.map(
              (customer) => {

                const deleting =
                  deletingId ===
                  customer.id;

                return (
                  <tr
                    key={customer.id}
                    className="border-b last:border-b-0 hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">

                      <div className="font-medium text-gray-900">
                        {customer.name}
                      </div>

                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {customer.customerCode}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {customer.phone || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {customer.email || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {customer.gstNumber || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {[
                        customer.city,
                        customer.state,
                      ]
                        .filter(Boolean)
                        .join(", ") ||
                        "—"}
                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            onEdit(
                              customer
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
                              customer
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