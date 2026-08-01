"use client";

import ExportButtons from "@/components/reports/ExportButtons";
import ExpiryReportTable from "@/components/reports/ExpiryReportTable";
import { exportToExcel } from "@/lib/exportExcel";
import { exportToPdf } from "@/lib/exportPdf";
import { useExpiryReport } from "@/hooks/useExpiryReport";

export default function ExpiryReportPage() {

    const {

        items,

        loading,

    } = useExpiryReport();

    if (loading)

        return <div>Loading...</div>;

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Expiry Report

                </h1>

                <p className="text-gray-500">

                    Medicines expiring soon.

                </p>

            </div>

            <div className="flex justify-end">

                <ExportButtons
                    onExcel={() =>
                        exportToExcel(
                            items.map((x) => ({
                                Medicine: x.medicineName,
                                Batch: x.batchNo,
                                Expiry: new Date(
                                    x.expiryDate
                                ).toLocaleDateString(),
                                DaysLeft: x.daysLeft,
                                Quantity: x.quantityAvailable,
                            })),
                            "ExpiryReport"
                        )
                    }

                    onPdf={() =>
                        exportToPdf({
                            title: "Expiry Report",

                            fileName: "ExpiryReport",

                            columns: [
                                {
                                    header: "Medicine",
                                    dataKey: "Medicine",
                                },
                                {
                                    header: "Batch",
                                    dataKey: "Batch",
                                },
                                {
                                    header: "Expiry",
                                    dataKey: "Expiry",
                                },
                                {
                                    header: "Days Left",
                                    dataKey: "DaysLeft",
                                },
                                {
                                    header: "Quantity",
                                    dataKey: "Quantity",
                                },
                            ],

                            rows: items.map((x) => ({
                                Medicine: x.medicineName,
                                Batch: x.batchNo,
                                Expiry: new Date(
                                    x.expiryDate
                                ).toLocaleDateString(),
                                DaysLeft: x.daysLeft,
                                Quantity: x.quantityAvailable,
                            })),
                        })
                    }
                />

            </div>

            <ExpiryReportTable
                items={items}
            />

        </div>

    );

}