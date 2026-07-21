"use client";

import { useEffect, useState } from "react";

import {
  InvoiceBatch,
} from "@/types/invoice";

import {
  getInvoiceBatches,
} from "@/services/batch.service";

export function useInvoiceBatches(
  medicineId: string
) {
  const [batches, setBatches] =
    useState<InvoiceBatch[]>([]);

  useEffect(() => {
    if (!medicineId) {
      setBatches([]);
      return;
    }

    load();
  }, [medicineId]);

  async function load() {
    const data =
      await getInvoiceBatches(
        medicineId
      );

    setBatches(data);
  }

  return batches;
}