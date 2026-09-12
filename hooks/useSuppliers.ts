"use client";

import { useCallback,  useEffect,  useState,} from "react";

import { Supplier,  SupplierRequest,} from "@/types/supplier";

import { createSupplier,  deleteSupplier,  getSupplierById,  getSuppliers,  updateSupplier,} from "@/services/supplier.service";

export function useSuppliers() {
  const [suppliers, setSuppliers] =
    useState<Supplier[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const loadSuppliers =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getSuppliers();

        setSuppliers(data);
      } catch (error) {
        console.error(
          "Failed to load suppliers:",
          error
        );

        setError(
          "Unable to load suppliers."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadSuppliers();
  }, [loadSuppliers]);

  async function addSupplier(
    data: SupplierRequest
  ) {
    try {
      setSaving(true);

      const supplier =
        await createSupplier(data);

      setSuppliers((current) => [
        supplier,
        ...current,
      ]);

      return supplier;
    } catch (error) {
      console.error(
        "Failed to create supplier:",
        error
      );

      throw error;
    } finally {
      setSaving(false);
    }
  }

  async function getSupplier(
    id: string
  ) {
    return await getSupplierById(id);
  }

  async function editSupplier(
    id: string,
    data: SupplierRequest
  ) {
    try {
      setSaving(true);

      const supplier =
        await updateSupplier(
          id,
          data
        );

      setSuppliers((current) =>
        current.map((item) =>
          item.id === id
            ? supplier
            : item
        )
      );

      return supplier;
    } catch (error) {
      console.error(
        "Failed to update supplier:",
        error
      );

      throw error;
    } finally {
      setSaving(false);
    }
  }

  async function removeSupplier(
    id: string
  ) {
    try {
      await deleteSupplier(id);

      setSuppliers((current) =>
        current.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete supplier:",
        error
      );

      throw error;
    }
  }

  return {
    suppliers,
    loading,
    saving,
    error,
    reload: loadSuppliers,
    addSupplier,
    getSupplier,
    editSupplier,
    removeSupplier,
  };
}