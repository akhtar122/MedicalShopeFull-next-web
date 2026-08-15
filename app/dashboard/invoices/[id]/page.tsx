"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PaymentDialog from "@/components/payments/PaymentDialog";
import {
  ArrowLeft,
  Printer,
  CreditCard
} from "lucide-react";

import InvoiceDocument from "@/components/invoices/InvoiceDocument";

import { getInvoice, } from "@/services/invoice.service";
import { getSettings, } from "@/services/settings.service";

import { Invoice, } from "@/types/invoice";

import { StoreSettings, } from "@/types/settings";

export default function InvoiceDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const [paymentOpen, setPaymentOpen] = useState(false);

  const [settings, setSettings] = useState<StoreSettings | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      const [
        invoiceData,
        settingsData,
      ] = await Promise.all([
        getInvoice(id),
        getSettings(),
      ]);

      setInvoice(invoiceData);
      setSettings(settingsData);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load invoice."
      );
    } finally {
      setLoading(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-gray-500">
          Loading invoice...
        </div>

      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="space-y-4">

        <button
          onClick={() =>
            router.push(
              "/dashboard/invoices"
            )
          }
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Invoices
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error ||
            "Invoice not found."}
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* ACTION BAR */}

      <div className="flex items-center justify-between print:hidden">

        <button
          onClick={() =>
            router.push(
              "/dashboard/invoices"
            )
          }
          className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <ArrowLeft size={17} />

          Back
        </button>

        <div className="flex items-center gap-3">

          {invoice.paymentStatus !== "PAID" && (
            <button
              onClick={() =>
                setPaymentOpen(true)
              }
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
            >
              <CreditCard size={17} />

              Record Payment
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Printer size={17} />

            Print / Save PDF
          </button>

        </div>

      </div>

      {/* INVOICE */}

      <InvoiceDocument
        invoice={invoice}
        settings={settings}
      />
      <PaymentDialog
        open={paymentOpen}
        invoiceId={invoice.id}
        invoiceTotal={invoice.grandTotal}
        onClose={() =>
          setPaymentOpen(false)
        }
        onSaved={loadData}
      />
    </div>
  );
}