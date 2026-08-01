"use client";

import { ExpiryReportItem } from "@/types/report";

interface Props {

    items: ExpiryReportItem[];

}

export default function ExpiryReportTable({

    items,

}: Props) {

    return (

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

            <div className="border-b px-6 py-4">

                <h2 className="font-semibold">

                    Expiring Medicines

                </h2>

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

                        <th className="text-left">

                            Expiry

                        </th>

                        <th className="text-right">

                            Days Left

                        </th>

                        <th className="text-right">

                            Quantity

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
                                No expiring medicines.
                            </td>

                        </tr>

                    )}

                    {items.map(item => (

                        <tr
                            key={`${item.batchNo}-${item.expiryDate}`}
                            className="border-t hover:bg-slate-50"
                        >

                            <td className="px-6 py-4">

                                {item.medicineName}

                            </td>

                            <td>

                                {item.batchNo}

                            </td>

                            <td>

                                {new Date(item.expiryDate).toLocaleDateString()}

                            </td>

                            <td className="text-right">

                                {item.daysLeft}

                            </td>

                            <td className="text-right">

                                {item.quantityAvailable}

                            </td>

                            <td>

                                <div className="flex justify-center">

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            item.daysLeft <= 0
                                                ? "bg-red-100 text-red-700"
                                                : item.daysLeft <= 30
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        {item.daysLeft <= 0
                                            ? "Expired"
                                            : item.daysLeft <= 30
                                            ? "Expiring Soon"
                                            : "Good"}
                                    </span>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}