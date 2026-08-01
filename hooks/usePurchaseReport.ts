"use client";

import { useEffect, useState } from "react";

import { getPurchaseReport } from "@/services/report.service";

import { PurchaseReportItem } from "@/types/report";

export function usePurchaseReport() {
  const [
    purchases,
    setPurchases,
  ] = useState<PurchaseReportItem[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);

    try {
      const data =
        await getPurchaseReport();

      setPurchases(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    purchases,
    loading,
    refresh: load,
  };
}