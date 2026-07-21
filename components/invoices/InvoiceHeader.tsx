"use client";

interface Props {
  invoiceDate: string;
  paymentMethod: string;

  onDateChange: (value: string) => void;

  onPaymentChange: (value: string) => void;

  children: React.ReactNode;
}

export default function InvoiceHeader({
  invoiceDate,
  paymentMethod,
  onDateChange,
  onPaymentChange,
  children,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6">

      <div className="grid gap-6 md:grid-cols-3">

        <div>

          <label className="mb-2 block font-medium">
            Customer
          </label>

          {children}

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Invoice Date
          </label>

          <input
            type="date"
            value={invoiceDate}
            onChange={(e) =>
              onDateChange(e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Payment
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              onPaymentChange(e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3"
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>

        </div>

      </div>

    </div>
  );
}