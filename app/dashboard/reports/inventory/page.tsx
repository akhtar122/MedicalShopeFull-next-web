"use client";

import ExportButtons from "@/components/reports/ExportButtons";
import InventoryReportTable from "@/components/reports/InventoryReportTable";
import SummaryCard from "@/components/reports/SummaryCard";
import { exportToExcel } from "@/lib/exportExcel";
import { exportToPdf } from "@/lib/exportPdf";
import { useInventoryReport } from "@/hooks/useInventoryReport";

export default function InventoryReportPage() {

    const {

        summary,

        items,

        loading,

    } = useInventoryReport();

    if (loading || !summary)

        return <div>Loading...</div>;

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Inventory Report

                </h1>

                <p className="text-gray-500">

                    Current inventory overview.

                </p>

            </div>

            <div className="flex justify-end">

                <ExportButtons
                    onExcel={() =>
                        exportToExcel(
                            items.map((x) => ({
                                Medicine: x.medicineName,
                                Batch: x.batchNo,
                                Available: x.quantityAvailable,
                                Reorder: x.reorderLevel,
                                Expiry: new Date(
                                    x.expiryDate
                                ).toLocaleDateString(),
                            })),
                            "InventoryReport"
                        )
                    }

                    onPdf={() =>
                        exportToPdf({
                            title: "Inventory Report",

                            fileName: "InventoryReport",

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
                                    header: "Available",
                                    dataKey: "Available",
                                },
                                {
                                    header: "Reorder Level",
                                    dataKey: "Reorder",
                                },
                                {
                                    header: "Expiry",
                                    dataKey: "Expiry",
                                },
                            ],

                            rows: items.map((x) => ({
                                Medicine: x.medicineName,
                                Batch: x.batchNo,
                                Available: x.quantityAvailable,
                                Reorder: x.reorderLevel,
                                Expiry: new Date(
                                    x.expiryDate
                                ).toLocaleDateString(),
                            })),
                        })
                    }
                />

            </div>

            <div className="grid gap-5 md:grid-cols-3">

                <SummaryCard

                    title="Stock Value"

                    value={`₹ ${summary.totalStockValue.toFixed(2)}`}

                />

                <SummaryCard

                    title="Total Batches"

                    value={summary.totalBatches.toString()}

                />

                <SummaryCard

                    title="Low Stock"

                    value={summary.lowStockItems.toString()}

                />

            </div>

            <InventoryReportTable

                items={items}

            />

        </div>

    );

}