"use client";

import { useCallback,  useEffect,  useState,} from "react";

import { Customer,  CustomerRequest,} from "@/types/customer";

import { createCustomer, deleteCustomer, getCustomerById, getCustomers, updateCustomer,} from "@/services/customer.service";

export function useCustomers() {
  const [customers, setCustomers] =   useState<Customer[]>([]);

  const [loading, setLoading] =  useState(true);

  const [saving, setSaving] =  useState(false);

  const [deleting, setDeleting] =  useState(false);

  const [error, setError] =  useState<string | null>(null);

  const loadCustomers =  useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getCustomers();

        setCustomers(data);
      } catch (error) {
        console.error(
          "Failed to load customers:",
          error
        );

        setError(
          "Unable to load customers."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const addCustomer = async (
    data: CustomerRequest
  ) => {
    try {
      setSaving(true);
      setError(null);

      const customer =
        await createCustomer(data);

      setCustomers((current) => [
        customer,
        ...current,
      ]);

      return customer;
    } catch (error) {
      console.error(
        "Failed to create customer:",
        error
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  const getCustomer = async (
    id: string
  ) => {
    return await getCustomerById(id);
  };

  const editCustomer = async (
    id: string,
    data: CustomerRequest
  ) => {
    try {
      setSaving(true);
      setError(null);

      const updated =
        await updateCustomer(
          id,
          data
        );

      setCustomers((current) =>
        current.map((customer) =>
          customer.id === id
            ? updated
            : customer
        )
      );

      return updated;
    } catch (error) {
      console.error(
        "Failed to update customer:",
        error
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  const removeCustomer = async (
    id: string
  ) => {
    try {
      setDeleting(true);
      setError(null);

      await deleteCustomer(id);

      setCustomers((current) =>
        current.filter(
          (customer) =>
            customer.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete customer:",
        error
      );

      throw error;
    } finally {
      setDeleting(false);
    }
  };

  return {
    customers,
    loading,
    saving,
    deleting,
    error,
    reload: loadCustomers,
    addCustomer,
    getCustomer,
    editCustomer,
    removeCustomer,
  };
}