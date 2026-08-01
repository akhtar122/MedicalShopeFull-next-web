"use client";

import { useMemo, useState } from "react";

import { useSalesReport } from "@/hooks/useSalesReport";
import { exportToExcel } from "@/lib/exportExcel";
import { exportToPdf } from "@/lib/exportPdf";
import SummaryCard from "@/components/reports/SummaryCard";
import SalesReportTable from "@/components/reports/SalesReportTable";
import ReportFilter from "@/components/reports/ReportFilter";
import ExportButtons from "@/components/reports/ExportButtons";

export default function SalesReportPage() {
    const { invoices, loading } = useSalesReport();

    const [search, setSearch] = useState("");

    const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");

    const filteredInvoices = useMemo(() => {
        return invoices.filter((invoice) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                invoice.invoiceNumber.toLowerCase().includes(searchText) ||
                invoice.customerName.toLowerCase().includes(searchText) ||
                invoice.paymentStatus.toLowerCase().includes(searchText);

            const invoiceDate = new Date(invoice.invoiceDate);

            const fromValid =
                !fromDate || invoiceDate >= new Date(fromDate);

            const endDate = toDate
                ? new Date(`${toDate}T23:59:59`)
                : null;

            const toValid =
                !endDate || invoiceDate <= endDate;

            return matchesSearch && fromValid && toValid;
        });
    }, [invoices, search, fromDate, toDate]);

    const totalInvoices = filteredInvoices.length;

    const totalRevenue = filteredInvoices.reduce(
        (sum, item) => sum + item.grandTotal,
        0
    );

    const totalGST = filteredInvoices.reduce(
        (sum, item) => sum + item.gstTotal,
        0
    );

    const totalDiscount = filteredInvoices.reduce(
        (sum, item) => sum + item.discount,
        0
    );

    if (loading) {
        return (
            <div className="space-y-6">

                <div className="h-12 w-64 animate-pulse rounded bg-slate-200" />

                <div className="grid gap-4 md:grid-cols-4">

                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-32 animate-pulse rounded-xl bg-slate-200"
                        />
                    ))}

                </div>

                <div className="h-96 animate-pulse rounded-xl bg-slate-200" />

            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Sales Report

                </h1>

                <p className="text-gray-500">

                    View sales summary and invoices.

                </p>

            </div>

            <ReportFilter
                fromDate={fromDate}
                toDate={toDate}
                search={search}
                onFromDateChange={setFromDate}
                onToDateChange={setToDate}
                onSearchChange={setSearch}
                onReset={() => {
                    setSearch("");
                    setFromDate("");
                    setToDate("");
                }}
            />

            <div className="flex justify-end">

                <ExportButtons
                    onExcel={() =>
                        exportToExcel(
                            filteredInvoices.map((x) => ({
                                Invoice: x.invoiceNumber,
                                Customer: x.customerName,
                                Date: new Date(
                                    x.invoiceDate
                                ).toLocaleDateString(),
                                Status: x.paymentStatus,
                                Subtotal: x.subtotal,
                                GST: x.gstTotal,
                                Discount: x.discount,
                                GrandTotal: x.grandTotal,
                            })),
                            "SalesReport"
                        )
                    }

                    onPdf={() =>
                        exportToPdf({
                            title: "Sales Report",

                            fileName: "SalesReport",

                            columns: [
                                {
                                    header: "Invoice",
                                    dataKey: "Invoice",
                                },
                                {
                                    header: "Customer",
                                    dataKey: "Customer",
                                },
                                {
                                    header: "Date",
                                    dataKey: "Date",
                                },
                                {
                                    header: "Status",
                                    dataKey: "Status",
                                },
                                {
                                    header: "Subtotal",
                                    dataKey: "Subtotal",
                                },
                                {
                                    header: "GST",
                                    dataKey: "GST",
                                },
                                {
                                    header: "Discount",
                                    dataKey: "Discount",
                                },
                                {
                                    header: "Grand Total",
                                    dataKey: "GrandTotal",
                                },
                            ],

                            rows: filteredInvoices.map((x) => ({
                                Invoice: x.invoiceNumber,
                                Customer: x.customerName,
                                Date: new Date(
                                    x.invoiceDate
                                ).toLocaleDateString(),
                                Status: x.paymentStatus,
                                Subtotal: x.subtotal.toFixed(2),
                                GST: x.gstTotal.toFixed(2),
                                Discount: x.discount.toFixed(2),
                                GrandTotal: x.grandTotal.toFixed(2),
                            })),
                        })
                    }
                />

            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <SummaryCard
                    title="Invoices"
                    value={totalInvoices.toString()}
                />

                <SummaryCard
                    title="Revenue"
                    value={`₹ ${totalRevenue.toFixed(2)}`}
                />

                <SummaryCard
                    title="GST"
                    value={`₹ ${totalGST.toFixed(2)}`}
                />

                <SummaryCard
                    title="Discount"
                    value={`₹ ${totalDiscount.toFixed(2)}`}
                />

            </div>

            <SalesReportTable
                invoices={filteredInvoices}
            />

        </div>
    );
}