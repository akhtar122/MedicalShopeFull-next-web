"use client";

import { useMemo, useState } from "react";

import ReportFilter from "@/components/reports/ReportFilter";
import ExportButtons from "@/components/reports/ExportButtons";
import SummaryCard from "@/components/reports/SummaryCard";
import { exportToExcel } from "@/lib/exportExcel";
import { exportToPdf } from "@/lib/exportPdf";
import PurchaseReportTable from "@/components/reports/PurchaseReportTable";

import { usePurchaseReport } from "@/hooks/usePurchaseReport";

export default function PurchaseReportPage() {
  const {
    purchases,
    loading,
  } = usePurchaseReport();

  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const filtered = useMemo(() => {
    const endDate = toDate
      ? new Date(`${toDate}T23:59:59`)
      : null;

    return purchases.filter((purchase) => {
      const text = search.toLowerCase();

      const matches =
        purchase.purchaseNo
          .toLowerCase()
          .includes(text) ||
        purchase.supplierName
          .toLowerCase()
          .includes(text) ||
        purchase.supplierInvoiceNo
          .toLowerCase()
          .includes(text);

      const purchaseDate = new Date(
        purchase.purchaseDate
      );

      const fromValid =
        !fromDate ||
        purchaseDate >= new Date(fromDate);

      const toValid =
        !endDate ||
        purchaseDate <= endDate;

      return matches && fromValid && toValid;
    });
  }, [
    purchases,
    search,
    fromDate,
    toDate,
  ]);

  const totalPurchases =
    filtered.length;

  const totalAmount =
    filtered.reduce(
      (sum, x) => sum + x.grandTotal,
      0
    );

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Purchase Report
        </h1>

        <p className="text-gray-500">
          View all purchase transactions.
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
              filtered.map((x) => ({
                PurchaseNo: x.purchaseNo,
                Supplier: x.supplierName,
                Invoice: x.supplierInvoiceNo,
                Date: new Date(
                  x.purchaseDate
                ).toLocaleDateString(),
                Total: x.grandTotal,
              })),
              "PurchaseReport"
            )
          }

          onPdf={() =>
            exportToPdf({
              title: "Purchase Report",

              fileName: "PurchaseReport",

              columns: [
                {
                  header: "Purchase No",
                  dataKey: "PurchaseNo",
                },
                {
                  header: "Supplier",
                  dataKey: "Supplier",
                },
                {
                  header: "Supplier Invoice",
                  dataKey: "Invoice",
                },
                {
                  header: "Date",
                  dataKey: "Date",
                },
                {
                  header: "Grand Total",
                  dataKey: "Total",
                },
              ],

              rows: filtered.map((x) => ({
                PurchaseNo: x.purchaseNo,
                Supplier: x.supplierName,
                Invoice: x.supplierInvoiceNo,
                Date: new Date(
                  x.purchaseDate
                ).toLocaleDateString(),
                Total: x.grandTotal.toFixed(2),
              })),
            })
          }
        />

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <SummaryCard
          title="Total Purchases"
          value={totalPurchases.toString()}
        />

        <SummaryCard
          title="Purchase Amount"
          value={`₹ ${totalAmount.toFixed(2)}`}
        />

      </div>

      <PurchaseReportTable
        purchases={filtered}
      />

    </div>
  );
}