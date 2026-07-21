"use client";

import { useParams } from "next/navigation";

import { useInvoice } from "@/hooks/useInvoice";

import InvoiceHeaderCard from "@/components/invoices/InvoiceHeaderCard";
import InvoiceItemsTable from "@/components/invoices/InvoiceItemsTable";
import InvoiceTotalsCard from "@/components/invoices/InvoiceTotalsCard";
import InvoiceActionBar from "@/components/invoices/InvoiceActionBar";

export default function InvoiceDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    invoice,
    loading,
  } = useInvoice(id);

  if (loading) {
    return (
      <div className="space-y-6">

        <div className="h-12 w-72 animate-pulse rounded bg-slate-200" />

        <div className="h-40 animate-pulse rounded-xl bg-slate-200" />

        <div className="h-96 animate-pulse rounded-xl bg-slate-200" />

      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">

        Invoice not found.

      </div>
    );
  }

  return (
    <div className="space-y-6">

      <InvoiceActionBar />

      <InvoiceHeaderCard
        invoice={invoice}
      />

      <InvoiceItemsTable
  items={invoice.items}
  readonly
/>

      <div className="flex justify-end">

        <InvoiceTotalsCard
          invoice={invoice}
        />

      </div>

    </div>
  );
}