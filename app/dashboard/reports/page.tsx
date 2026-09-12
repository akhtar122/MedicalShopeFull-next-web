"use client";

import Link from "next/link";
import {
  BarChart3,
  ShoppingCart,
  Package,
  Clock3,
  History,
  ArrowRight,
} from "lucide-react";

const reports = [
  {
    title: "Sales Report",
    description: "View invoices, revenue, GST and discounts.",
    href: "/dashboard/reports/sales",
    icon: BarChart3,
  },
  {
    title: "Purchase Report",
    description: "View supplier purchases and purchase amounts.",
    href: "/dashboard/reports/purchases",
    icon: ShoppingCart,
  },
  {
    title: "Inventory Report",
    description: "View stock value, batches and low-stock medicines.",
    href: "/dashboard/reports/inventory",
    icon: Package,
  },
  {
    title: "Expiry Report",
    description: "View medicines that are expired or expiring soon.",
    href: "/dashboard/reports/expiry",
    icon: Clock3,
  },
  {
    title: "Stock History",
    description: "View all stock movements and balances.",
    href: "/dashboard/reports/stock-history",
    icon: History,
  },
  {
  title: "Payment Report",
  description: "View payment transactions and collections",
  href: "/dashboard/reports/payments",
  icon: BarChart3,
}
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="mt-1 text-gray-500">
          View sales, purchases, inventory and stock reports.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <Link
              key={report.href}
              href={report.href}
              className="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
                  <Icon
                    size={22}
                    className="text-blue-600"
                  />
                </div>

                <ArrowRight
                  size={18}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />

              </div>

              <h2 className="mt-5 text-lg font-semibold">
                {report.title}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {report.description}
              </p>

              <div className="mt-5 text-sm font-medium text-blue-600">
                Open Report
              </div>

            </Link>
          );
        })}

      </div>

    </div>
  );
}