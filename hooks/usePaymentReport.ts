"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getPayments } from "@/services/payment.service";
import { Payment } from "@/types/payment";

export function usePaymentReport() {
  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadPayments =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getPayments();

        setPayments(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load payment report."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  return {
    payments,
    loading,
    error,
    reload: loadPayments,
  };
}