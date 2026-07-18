"use client";

import { useEffect, useState } from "react";
import { getPurchases } from "@/services/purchase.service";
import { Purchase } from "@/types/purchase";

export function usePurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);

      const data = await getPurchases();

      setPurchases(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    purchases,
    loading,
    refresh: load,
  };
}