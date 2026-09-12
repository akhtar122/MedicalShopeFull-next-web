"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PaymentDialog from "@/components/payments/PaymentDialog";
import {
  getInvoicePayments,
} from "@/services/payment.service";
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
import { PaymentSummary } from "@/types/payment";

export default function InvoiceDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(null);

  const [settings, setSettings] = useState<StoreSettings | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  loadData();
}, [id]);

async function loadPaymentSummary(
  invoiceId: string
) {
  try {
    const data =
      await getInvoicePayments(
        invoiceId
      );

    setPaymentSummary(data);
  } catch (error) {
    console.error(
      "Failed to load payment summary:",
      error
    );
  }
}

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

    await loadPaymentSummary(id);

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
      {paymentSummary && (
        <PaymentDialog
          open={paymentOpen}
          invoiceId={invoice.id}
          invoiceTotal={paymentSummary.invoiceTotal}
          outstandingAmount={paymentSummary.outstandingAmount}
          onClose={() => setPaymentOpen(false)}
          onSaved={async () => {
            await loadPaymentSummary(invoice.id);
          }}
        />
      )}

      {paymentSummary && (
        <div className="mt-6 rounded-2xl border bg-white p-6">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold">
                Payment Summary
              </h2>

              <p className="text-sm text-gray-500">
                Payment history for this invoice
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentSummary.paymentStatus ===
                "PAID"
                ? "bg-green-100 text-green-700"
                : paymentSummary.paymentStatus ===
                  "PARTIAL"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {paymentSummary.paymentStatus}
            </span>

          </div>

          {/* Summary */}

          <div className="mt-5 grid gap-4 md:grid-cols-3">

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-gray-500">
                Invoice Total
              </p>

              <p className="mt-1 text-xl font-bold">
                ₹
                {paymentSummary.invoiceTotal.toFixed(
                  2
                )}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-500">
                Total Paid
              </p>

              <p className="mt-1 text-xl font-bold text-green-700">
                ₹
                {paymentSummary.totalPaid.toFixed(
                  2
                )}
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-sm text-gray-500">
                Outstanding
              </p>

              <p className="mt-1 text-xl font-bold text-red-600">
                ₹
                {paymentSummary.outstandingAmount.toFixed(
                  2
                )}
              </p>
            </div>

          </div>

          {/* Payment History */}

          <div className="mt-6">

            <div className="mb-3 flex items-center justify-between">

              <h3 className="font-semibold">
                Payment History
              </h3>

              {paymentSummary &&
                paymentSummary.outstandingAmount > 0 && (
                  <button
                    onClick={() => setPaymentOpen(true)}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    + Record Payment
                  </button>
                )}

            </div>

            {paymentSummary.payments.length ===
              0 ? (
              <div className="rounded-xl border border-dashed p-6 text-center text-sm text-gray-500">
                No payments recorded.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border">

                <table className="w-full text-sm">

                  <thead className="bg-slate-50">

                    <tr>
                      <th className="px-4 py-3 text-left">
                        Date
                      </th>

                      <th className="px-4 py-3 text-left">
                        Method
                      </th>

                      <th className="px-4 py-3 text-left">
                        Transaction Ref
                      </th>

                      <th className="px-4 py-3 text-right">
                        Amount
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {paymentSummary.payments.map(
                      (payment) => (
                        <tr
                          key={payment.id}
                          className="border-t"
                        >

                          <td className="px-4 py-3">
                            {new Date(
                              payment.paymentDate
                            ).toLocaleString()}
                          </td>

                          <td className="px-4 py-3">
                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                              {payment.paymentMethod}
                            </span>
                          </td>

                          <td className="px-4 py-3 font-mono text-xs">
                            {payment.transactionRef ||
                              "—"}
                          </td>

                          <td className="px-4 py-3 text-right font-semibold">
                            ₹
                            {payment.amount.toFixed(
                              2
                            )}
                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}