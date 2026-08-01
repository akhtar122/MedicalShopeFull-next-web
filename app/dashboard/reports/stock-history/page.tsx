"use client";

import { useMemo, useState } from "react";

import ReportFilter from "@/components/reports/ReportFilter";
import ExportButtons from "@/components/reports/ExportButtons";
import StockHistoryReportTable from "@/components/reports/StockHistoryReportTable";
import { exportToExcel } from "@/lib/exportExcel";
import { exportToPdf } from "@/lib/exportPdf";

import { useStockHistoryReport } from "../../../../hooks/useStockHistoryReport";

export default function StockHistoryReportPage() {
  const {
    items,
    loading,
  } = useStockHistoryReport();

  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const filteredItems = useMemo(() => {
    const endDate = toDate
      ? new Date(`${toDate}T23:59:59`)
      : null;

    return items.filter((item) => {
      const text = search.toLowerCase();

      const matches =
        item.medicineName
          .toLowerCase()
          .includes(text) ||
        item.batchNo
          .toLowerCase()
          .includes(text) ||
        item.referenceType
          .toLowerCase()
          .includes(text) ||
        item.movementType
          .toLowerCase()
          .includes(text);

      const historyDate = new Date(item.date);

      const fromValid =
        !fromDate ||
        historyDate >= new Date(fromDate);

      const toValid =
        !endDate ||
        historyDate <= endDate;

      return (
        matches &&
        fromValid &&
        toValid
      );
    });
  }, [
    items,
    search,
    fromDate,
    toDate,
  ]);

  if (loading) {
    return (
      <div className="space-y-6">

        <div className="h-10 w-60 animate-pulse rounded bg-slate-200" />

        <div className="h-28 animate-pulse rounded-xl bg-slate-200" />

        <div className="h-96 animate-pulse rounded-xl bg-slate-200" />

      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Stock History Report
        </h1>

        <p className="text-gray-500">
          View complete stock movement history.
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
              filteredItems.map((x) => ({
                Date: new Date(
                  x.date
                ).toLocaleString(),
                Medicine: x.medicineName,
                Batch: x.batchNo,
                Movement: x.movementType,
                Reference: x.referenceType,
                Quantity: x.quantity,
                Balance: x.balanceAfter,
              })),
              "StockHistory"
            )
          }

          onPdf={() =>
            exportToPdf({
              title: "Stock History Report",

              fileName: "StockHistory",

              columns: [
                {
                  header: "Date",
                  dataKey: "Date",
                },
                {
                  header: "Medicine",
                  dataKey: "Medicine",
                },
                {
                  header: "Batch",
                  dataKey: "Batch",
                },
                {
                  header: "Movement",
                  dataKey: "Movement",
                },
                {
                  header: "Reference",
                  dataKey: "Reference",
                },
                {
                  header: "Quantity",
                  dataKey: "Quantity",
                },
                {
                  header: "Balance",
                  dataKey: "Balance",
                },
              ],

              rows: filteredItems.map((x) => ({
                Date: new Date(
                  x.date
                ).toLocaleString(),
                Medicine: x.medicineName,
                Batch: x.batchNo,
                Movement: x.movementType,
                Reference: x.referenceType,
                Quantity: x.quantity,
                Balance: x.balanceAfter,
              })),
            })
          }
        />

      </div>

      <StockHistoryReportTable
        items={filteredItems}
      />

    </div>
  );
}