"use client";

import { useEffect, useState } from "react";

import {
  getInvoices,
} from "@/services/invoice.service";

import { Invoice } from "@/types/invoice";

export function useInvoices() {
  const [loading, setLoading] =
    useState(true);

  const [invoices, setInvoices] =
    useState<Invoice[]>([]);

  async function load() {
    try {
      setLoading(true);

      const data =
        await getInvoices();

      setInvoices(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    invoices,
    loading,
    refresh: load,
  };
}