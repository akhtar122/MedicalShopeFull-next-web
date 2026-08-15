"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  createPayment,
} from "@/services/payment.service";

interface Props {
  open: boolean;
  invoiceId: string;
  invoiceTotal: number;
  onClose: () => void;
  onSaved?: () => void;
}

const PAYMENT_METHODS = [
  "CASH",
  "UPI",
  "CARD",
  "BANK_TRANSFER",
  "OTHER",
];

export default function PaymentDialog({
  open,
  invoiceId,
  invoiceTotal,
  onClose,
  onSaved,
}: Props) {
  const [paymentMethod, setPaymentMethod] =
    useState("CASH");

  const [amount, setAmount] =
    useState("");

  const [transactionRef, setTransactionRef] =
    useState("");

  const [paymentDate, setPaymentDate] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    setPaymentMethod("CASH");

    setAmount(
      invoiceTotal.toFixed(2)
    );

    setTransactionRef("");

    setPaymentDate(
      new Date()
        .toISOString()
        .slice(0, 16)
    );

    setError(null);
  }, [open, invoiceTotal]);

  if (!open) {
    return null;
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError(null);

    const numericAmount =
      Number(amount);

    if (
      !numericAmount ||
      numericAmount <= 0
    ) {
      setError(
        "Please enter a valid payment amount."
      );

      return;
    }

    if (numericAmount > invoiceTotal) {
      setError(
        "Payment amount cannot exceed the invoice total."
      );

      return;
    }

    try {
      setSaving(true);

      await createPayment({
        invoiceId,
        paymentMethod,
        amount: numericAmount,
        transactionRef:
          transactionRef.trim() || undefined,
        paymentDate: new Date(
          paymentDate
        ).toISOString(),
      });

      onSaved?.();

      onClose();
    } catch (error) {
      console.error(error);

      setError(
        "Unable to save payment."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>
            <h2 className="text-lg font-semibold">
              Record Payment
            </h2>

            <p className="text-sm text-gray-500">
              Invoice total: ₹{" "}
              {invoiceTotal.toFixed(2)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* METHOD */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Payment Method
            </label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
            >
              {PAYMENT_METHODS.map(
                (method) => (
                  <option
                    key={method}
                    value={method}
                  >
                    {method.replace(
                      "_",
                      " "
                    )}
                  </option>
                )
              )}
            </select>

          </div>

          {/* AMOUNT */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Amount
            </label>

            <input
              type="number"
              min="0.01"
              max={invoiceTotal}
              step="0.01"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
              required
            />

          </div>

          {/* TRANSACTION REF */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Transaction Reference
              <span className="ml-1 text-gray-400">
                (optional)
              </span>
            </label>

            <input
              type="text"
              value={transactionRef}
              onChange={(e) =>
                setTransactionRef(
                  e.target.value
                )
              }
              placeholder="UPI ID / transaction number"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
            />

          </div>

          {/* DATE */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Payment Date
            </label>

            <input
              type="datetime-local"
              value={paymentDate}
              onChange={(e) =>
                setPaymentDate(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
              required
            />

          </div>

          {/* ERROR */}

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* BUTTONS */}

          <div className="flex justify-end gap-3 border-t pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Record Payment"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}