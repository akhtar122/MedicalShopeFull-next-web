"use client";

import { useEffect, useState } from "react";

import { getBatches } from "@/services/batch.service";

import { Batch } from "@/types/batch";

export function useBatches(
  medicineId: string
) {

  const [batches, setBatches] =
    useState<Batch[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function load() {

    setLoading(true);

    const data =
      await getBatches(medicineId);

    setBatches(data);

    setLoading(false);

  }

  useEffect(() => {

    load();

  }, [medicineId]);

  return {

    batches,

    loading,

    refresh: load,

  };

}