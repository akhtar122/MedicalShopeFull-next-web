"use client";

import { LowStockReportItem } from "@/types/report";

interface Props {

    items: LowStockReportItem[];

}

export default function InventoryReportTable({

    items,

}: Props) {

    return (

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

            <div className="border-b px-6 py-4">

                <h2 className="font-semibold">

                    Low Stock Medicines

                </h2>

            </div>

            <div className="overflow-x-auto">

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

                            <th className="text-left">

                                Expiry

                            </th>

                            <th className="px-6 text-center">

                                Status

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {items.length === 0 && (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="py-10 text-center text-gray-500"
                                >

                                    No low stock medicines.

                                </td>

                            </tr>

                        )}

                        {items.map(item => (

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

                                <td className="text-right">

                                    {item.quantityAvailable}

                                </td>

                                <td className="text-right">

                                    {item.reorderLevel}

                                </td>

                                <td>

                                    {new Date(

                                        item.expiryDate

                                    ).toLocaleDateString()}

                                </td>

                                <td>

                                    <div className="flex justify-center">

                                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">

                                            Low Stock

                                        </span>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}