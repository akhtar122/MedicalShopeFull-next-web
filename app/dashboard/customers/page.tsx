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

import CustomerDialog from "@/components/customers/CustomerDialog";

import CustomerTable from "@/components/customers/CustomerTable";

import {
  useCustomers,
} from "@/hooks/useCustomers";

import {
  Customer,
  CustomerRequest,
} from "@/types/customer";

export default function CustomersPage() {
  const {
    customers,
    loading,
    saving,
    error,
    reload,
    addCustomer,
    editCustomer,
    removeCustomer,
  } = useCustomers();

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [search, setSearch] =
    useState("");

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const filteredCustomers =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return customers;
      }

      return customers.filter(
        (customer) =>
          customer.name
            ?.toLowerCase()
            .includes(query) ||
          customer.customerCode
            ?.toLowerCase()
            .includes(query) ||
          customer.phone
            ?.toLowerCase()
            .includes(query) ||
          customer.email
            ?.toLowerCase()
            .includes(query) ||
          customer.gstNumber
            ?.toLowerCase()
            .includes(query)
      );
    }, [
      customers,
      search,
    ]);

  function handleAdd() {
    setSelectedCustomer(null);
    setDialogOpen(true);
  }

  function handleEdit(
    customer: Customer
  ) {
    setSelectedCustomer(customer);
    setDialogOpen(true);
  }

  async function handleSubmit(
    data: CustomerRequest
  ) {
    if (selectedCustomer) {
      await editCustomer(
        selectedCustomer.id,
        data
      );
    } else {
      await addCustomer(data);
    }

    setDialogOpen(false);
    setSelectedCustomer(null);
  }

  async function handleDelete(
    customer: Customer
  ) {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${customer.name}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(
        customer.id
      );

      await removeCustomer(
        customer.id
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "Unable to delete customer."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Customers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your customers and their information.
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

            Add Customer

          </button>

        </div>

      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Search */}

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
            placeholder="Search by name, code, phone, email or GST..."
            className="w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </div>

      {/* Summary */}

      <div className="grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Customers
          </p>

          <p className="mt-2 text-2xl font-bold">
            {customers.length}
          </p>

        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Showing
          </p>

          <p className="mt-2 text-2xl font-bold">
            {filteredCustomers.length}
          </p>

        </div>

      </div>

      {/* Table */}

      {loading ? (

        <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
          Loading customers...
        </div>

      ) : (

        <CustomerTable
          customers={
            filteredCustomers
          }
          onEdit={
            handleEdit
          }
          onDelete={
            handleDelete
          }
          deletingId={
            deletingId
          }
        />

      )}

      {/* Dialog */}

      <CustomerDialog
        open={dialogOpen}
        loading={saving}
        customer={
          selectedCustomer
        }
        onClose={() => {
          setDialogOpen(false);
          setSelectedCustomer(null);
        }}
        onSubmit={
          handleSubmit
        }
      />

    </div>
  );
}