"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { useInvoices } from "@/hooks/useInvoices";
import { deleteInvoice } from "@/services/invoice.service";

import InvoiceFilters from "@/components/invoices/InvoiceFilters";
import InvoiceTable from "@/components/invoices/InvoiceTable";

export default function InvoicePage() {
  const {
    invoices,
    loading,
    refresh,
  } = useInvoices();

  const [search, setSearch] =
    useState("");

  const filteredInvoices =
    useMemo(() => {
      return invoices.filter((invoice) => {
        const value =
          search.toLowerCase();

        return (
          invoice.invoiceNumber
            .toLowerCase()
            .includes(value) ||
          invoice.customerName
            .toLowerCase()
            .includes(value)
        );
      });
    }, [invoices, search]);

  async function handleDelete(
    id: string
  ) {
    const ok = window.confirm(
      "Delete this invoice?"
    );

    if (!ok) return;

    await deleteInvoice(id);

    refresh();
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Invoices
          </h1>

          <p className="text-gray-500">
            Manage sales invoices
          </p>

        </div>

        <Link
          href="/dashboard/invoices/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={18} />

          New Invoice

        </Link>

      </div>

      <InvoiceFilters
        search={search}
        onSearchChange={
          setSearch
        }
      />

      <InvoiceTable
        invoices={
          filteredInvoices
        }
        onDelete={
          handleDelete
        }
      />

      {loading && (
        <p>Loading...</p>
      )}

    </div>
  );
}