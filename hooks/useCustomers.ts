"use client";

import { useEffect, useState } from "react";

import { Customer } from "@/types/customer";

import { getCustomers } from "@/services/customer.service";

export function useCustomers() {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function load() {
    try {
      setLoading(true);

      const data =
        await getCustomers();

      setCustomers(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    customers,
    loading,
  };
}