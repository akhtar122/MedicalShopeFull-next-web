"use client";

import { Invoice } from "@/types/invoice";
import { StoreSettings } from "@/types/settings";

interface Props {
  invoice: Invoice;
  settings: StoreSettings | null;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
}

export default function InvoiceDocument({
  invoice,
  settings,
}: Props) {
  return (
    <div
      id="invoice-document"
      className="mx-auto w-full max-w-4xl bg-white p-8 text-black shadow-sm print:max-w-none print:shadow-none"
    >
      {/* HEADER */}

      <div className="flex items-start justify-between border-b pb-6">

        <div className="flex items-start gap-4">

          {settings?.logoUrl && (
            <img
              src={settings.logoUrl}
              alt="Shop logo"
              className="h-20 w-20 object-contain"
            />
          )}

          <div>
            <h1 className="text-2xl font-bold">
              {settings?.shopName ||
                "Medical Store"}
            </h1>

            {settings?.gstNumber && (
              <p className="mt-1 text-sm">
                GSTIN: {settings.gstNumber}
              </p>
            )}

            {settings?.phone && (
              <p className="text-sm">
                Phone: {settings.phone}
              </p>
            )}

            {settings?.email && (
              <p className="text-sm">
                Email: {settings.email}
              </p>
            )}

            {settings?.address && (
              <p className="mt-1 max-w-md text-sm text-gray-600">
                {settings.address}
              </p>
            )}
          </div>

        </div>

        <div className="text-right">

          <h2 className="text-xl font-bold">
            TAX INVOICE
          </h2>

          <p className="mt-2 text-sm">
            Invoice No:
            <span className="ml-2 font-semibold">
              {invoice.invoiceNumber}
            </span>
          </p>

          <p className="text-sm">
            Date:
            <span className="ml-2">
              {formatDate(invoice.invoiceDate)}
            </span>
          </p>

          <p className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
            {invoice.paymentStatus}
          </p>

        </div>

      </div>

      {/* CUSTOMER */}

      <div className="mt-6 rounded-lg border bg-gray-50 p-4">

        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Bill To
        </p>

        <p className="mt-1 text-base font-semibold">
          {invoice.customerName ||
            "Walk-in Customer"}
        </p>

      </div>

      {/* ITEMS */}

      <div className="mt-6 overflow-hidden rounded-lg border">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-3 py-3 text-left text-xs font-semibold">
                #
              </th>

              <th className="px-3 py-3 text-left text-xs font-semibold">
                Medicine
              </th>

              <th className="px-3 py-3 text-left text-xs font-semibold">
                Batch
              </th>

              <th className="px-3 py-3 text-left text-xs font-semibold">
                Expiry
              </th>

              <th className="px-3 py-3 text-right text-xs font-semibold">
                Qty
              </th>

              <th className="px-3 py-3 text-right text-xs font-semibold">
                Price
              </th>

              <th className="px-3 py-3 text-right text-xs font-semibold">
                GST
              </th>

              <th className="px-3 py-3 text-right text-xs font-semibold">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {invoice.items.map(
              (item, index) => (
                <tr
                  key={`${item.medicineBatchId}-${index}`}
                  className="border-t"
                >

                  <td className="px-3 py-3 text-sm">
                    {index + 1}
                  </td>

                  <td className="px-3 py-3 text-sm font-medium">
                    {item.medicineName}
                  </td>

                  <td className="px-3 py-3 text-sm">
                    {item.batchNo}
                  </td>

                  <td className="px-3 py-3 text-sm">
                    {formatDate(
                      item.expiryDate
                    )}
                  </td>

                  <td className="px-3 py-3 text-right text-sm">
                    {item.quantity}
                  </td>

                  <td className="px-3 py-3 text-right text-sm">
                    {formatCurrency(
                      item.unitPrice
                    )}
                  </td>

                  <td className="px-3 py-3 text-right text-sm">
                    {item.gstRate}%
                  </td>

                  <td className="px-3 py-3 text-right text-sm font-medium">
                    {formatCurrency(
                      item.lineTotal
                    )}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* TOTALS */}

      <div className="mt-6 flex justify-end">

        <div className="w-full max-w-sm space-y-3">

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Subtotal
            </span>

            <span>
              {formatCurrency(
                invoice.subtotal
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              GST
            </span>

            <span>
              {formatCurrency(
                invoice.gstTotal
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Discount
            </span>

            <span>
              - {formatCurrency(
                invoice.discount
              )}
            </span>
          </div>

          <div className="border-t pt-3">

            <div className="flex justify-between text-lg font-bold">

              <span>
                Grand Total
              </span>

              <span>
                {formatCurrency(
                  invoice.grandTotal
                )}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* QR + FOOTER */}

      <div className="mt-10 flex items-end justify-between border-t pt-6">

        <div>

          <p className="text-sm font-medium">
            Thank you for your business!
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Please keep this invoice for your records.
          </p>

        </div>

        {settings?.qrCodeUrl && (
          <div className="text-center">

            <img
              src={settings.qrCodeUrl}
              alt="Payment QR code"
              className="h-28 w-28 object-contain"
            />

            <p className="mt-1 text-xs text-gray-500">
              Scan to Pay
            </p>

          </div>
        )}

      </div>

    </div>
  );
}