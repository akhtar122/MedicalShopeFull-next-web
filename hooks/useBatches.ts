"use client";

import { useEffect, useState } from "react";
import { Batch } from "@/types/batch";
import {
  getMedicine,
  getMedicineBatches,
} from "@/services/batch.service";

export function useBatches(id: string) {
  const [medicine, setMedicine] = useState<any>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    try {
      const [med, list] = await Promise.all([
        getMedicine(id),
        getMedicineBatches(id),
      ]);

      setMedicine(med);
      setBatches(list);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) load();
  }, [id]);

  return {
    medicine,
    batches,
    loading,
    refresh: load,
  };
}