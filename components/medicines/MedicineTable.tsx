"use client";

import Link from "next/link";
import {
    Pencil,
    Trash2,
    Package,
    Search,
} from "lucide-react";

import { Medicine } from "@/types/medicine";
import { formatCurrency } from "@/lib/format";

interface Props {
    medicines: Medicine[];
    loading: boolean;
    onDelete: (id: string) => void;
}

export default function MedicineTable({
    medicines,
    loading,
    onDelete,
}: Props) {
    if (loading) {
        return (
            <div className="rounded-xl border bg-white p-10 text-center">
                Loading medicines...
            </div>
        );
    }

    if (!medicines.length) {
        return (
            <div className="rounded-xl border bg-white p-10 text-center">
                No medicines found.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr className="text-left text-sm text-gray-600">
                        <th className="p-4">Code</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Purchase</th>
                        <th>Selling</th>
                        <th>Status</th>
                        <th className="w-40">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {medicines.map((m) => (
                        <tr
                            key={m.id}
                            className="border-t hover:bg-gray-50"
                        >
                            <td className="p-4 font-medium">
                                {m.medicineCode}
                            </td>

                            <td>
                                <div className="font-medium">
                                    {m.name}
                                </div>

                                <div className="text-sm text-gray-500">
                                    {m.genericName}
                                </div>
                            </td>

                            <td>{m.categoryName}</td>

                            <td>
                                <span
                                    className={`font-semibold ${m.availableStock <= m.reorderLevel
                                        ? "text-red-600"
                                        : "text-green-600"
                                        }`}
                                >

                                    {m.availableStock}

                                </span>
                                {m.availableStock <= m.reorderLevel && (

                                    <div className="text-xs text-red-500">

                                        Low Stock

                                    </div>

                                )}
                            </td>

                            <td>
                                {formatCurrency(m.purchasePrice)}
                            </td>

                            <td>
                                {formatCurrency(m.sellingPrice)}
                            </td>

                            <td>
                                {m.isActive ? (
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                                        Active
                                    </span>
                                ) : (
                                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
                                        Inactive
                                    </span>
                                )}
                            </td>

                            <td>
                                <div className="flex gap-3">

                                    <Link
                                        href={`/dashboard/medicines/${m.id}/edit`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Pencil size={18} />
                                    </Link>

                                    <Link
                                        href={`/dashboard/medicines/${m.id}/batches`}
                                        className="text-indigo-600 hover:text-indigo-800"
                                    >
                                        <Package size={18} />
                                    </Link>                                    

                                    <button
                                        onClick={() => onDelete(m.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}