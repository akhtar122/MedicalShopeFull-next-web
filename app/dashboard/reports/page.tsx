"use client";

import {
  Package,
  ShoppingCart,
  Receipt,
  Clock,
  TriangleAlert,
} from "lucide-react";

import ReportCard from "@/components/reports/ReportCard";

export default function ReportsPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="text-gray-500">
          Generate and export business reports.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <ReportCard
          title="Sales Report"
          description="Invoices and revenue."
          href="/dashboard/reports/sales"
          icon={Receipt}
        />

        <ReportCard
          title="Purchase Report"
          description="Supplier purchases."
          href="/dashboard/reports/purchases"
          icon={ShoppingCart}
        />

        <ReportCard
          title="Inventory Report"
          description="Current stock."
          href="/dashboard/reports/inventory"
          icon={Package}
        />

        <ReportCard
          title="Expiry Report"
          description="Expiring medicines."
          href="/dashboard/reports/expiry"
          icon={TriangleAlert}
        />

        <ReportCard
          title="Stock History"
          description="All stock movements."
          href="/dashboard/reports/stock-history"
          icon={Clock}
        />

      </div>

    </div>
  );
}