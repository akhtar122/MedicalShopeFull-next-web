"use client";

import { useEffect, useState } from "react";

import { getStockHistoryReport } from "@/services/report.service";
import { StockHistoryReportItem } from "@/types/report";

export function useStockHistoryReport() {
  const [items, setItems] = useState<StockHistoryReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);

    try {
      const data = await getStockHistoryReport();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    items,
    loading,
    refresh: load,
  };
}