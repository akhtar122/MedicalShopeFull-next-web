"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

import SupplierDialog from "@/components/suppliers/SupplierDialog";

import SupplierTable from "@/components/suppliers/SupplierTable";

import {
  useSuppliers,
} from "@/hooks/useSuppliers";

import {
  Supplier,
  SupplierRequest,
} from "@/types/supplier";

export default function SuppliersPage() {
  const {
    suppliers,
    loading,
    saving,
    error,
    reload,
    addSupplier,
    editSupplier,
    removeSupplier,
  } = useSuppliers();

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);

  const [search, setSearch] =
    useState("");

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const filteredSuppliers =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return suppliers;
      }

      return suppliers.filter(
        (supplier) =>
          supplier.companyName
            ?.toLowerCase()
            .includes(query) ||
          supplier.supplierCode
            ?.toLowerCase()
            .includes(query) ||
          supplier.contactPerson
            ?.toLowerCase()
            .includes(query) ||
          supplier.phone
            ?.toLowerCase()
            .includes(query) ||
          supplier.email
            ?.toLowerCase()
            .includes(query) ||
          supplier.gstNumber
            ?.toLowerCase()
            .includes(query)
      );
    }, [suppliers, search]);

  function handleAdd() {
    setSelectedSupplier(null);
    setDialogOpen(true);
  }

  function handleEdit(
    supplier: Supplier
  ) {
    setSelectedSupplier(supplier);
    setDialogOpen(true);
  }

  async function handleSubmit(
    data: SupplierRequest
  ) {
    if (selectedSupplier) {
      await editSupplier(
        selectedSupplier.id,
        data
      );
    } else {
      await addSupplier(data);
    }

    setDialogOpen(false);
    setSelectedSupplier(null);
  }

  async function handleDelete(
    supplier: Supplier
  ) {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${supplier.companyName}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(
        supplier.id
      );

      await removeSupplier(
        supplier.id
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "Unable to delete supplier."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6 p-6">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Suppliers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage medicine suppliers.
          </p>
        </div>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={18} />

            Add Supplier
          </button>

        </div>

      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-2xl border bg-white p-4 shadow-sm">

        <div className="relative max-w-lg">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search company, code, contact, phone..."
            className="w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </div>

      <div className="grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Suppliers
          </p>

          <p className="mt-2 text-2xl font-bold">
            {suppliers.length}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Showing
          </p>

          <p className="mt-2 text-2xl font-bold">
            {filteredSuppliers.length}
          </p>
        </div>

      </div>

      {loading ? (
        <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
          Loading suppliers...
        </div>
      ) : (
        <SupplierTable
          suppliers={filteredSuppliers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}

      <SupplierDialog
        open={dialogOpen}
        loading={saving}
        supplier={selectedSupplier}
        onClose={() => {
          if (saving) return;

          setDialogOpen(false);
          setSelectedSupplier(null);
        }}
        onSubmit={handleSubmit}
      />

    </div>
  );
}