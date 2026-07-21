"use client";

import { useEffect, useState } from "react";

import {
  searchMedicines,
} from "@/services/invoice.service";

import {
  InvoiceMedicine,
} from "@/types/invoice";

export function useInvoiceMedicines() {
  const [medicines, setMedicines] =
    useState<InvoiceMedicine[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data =
      await searchMedicines();

    setMedicines(data);
  }

  return medicines;
}