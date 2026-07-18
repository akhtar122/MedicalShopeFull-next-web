"use client";

import {
  IndianRupee,
  Boxes,
  TriangleAlert,
} from "lucide-react";

import { InventorySummary as Summary } from "@/types/inventory";

interface Props {
  summary: Summary;
}

export default function InventorySummary({
  summary,
}: Props) {
  const cards = [
    {
      title: "Stock Value",
      value: `₹ ${summary.totalStockValue.toFixed(2)}`,
      icon: IndianRupee,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Batches",
      value: summary.totalBatches,
      icon: Boxes,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Low Stock",
      value: summary.lowStockItems,
      icon: TriangleAlert,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-full p-3 ${card.color}`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}