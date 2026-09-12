"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getOutstandingPayments,
} from "@/services/payment.service";

import {
  OutstandingPayment,
} from "@/types/payment";

export function useOutstandingPayments() {
  const [
    payments,
    setPayments,
  ] = useState<OutstandingPayment[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const loadOutstandingPayments =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getOutstandingPayments();

        setPayments(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load outstanding payments."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadOutstandingPayments();
  }, [loadOutstandingPayments]);

  return {
    payments,
    loading,
    error,
    reload: loadOutstandingPayments,
  };
}