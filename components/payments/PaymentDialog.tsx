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
  outstandingAmount: number;
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
  outstandingAmount,
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
      outstandingAmount.toFixed(2)
    );

    // Temporary reference.
    // Later we can make this proper UPI/UTR/card reference.
    setTransactionRef(
      `PAY-${Date.now()}`
    );

    const now = new Date();

    const localDateTime =
      new Date(
        now.getTime() -
          now.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

    setPaymentDate(localDateTime);

    setError(null);
  }, [
    open,
    outstandingAmount,
  ]);

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

    if (
      numericAmount >
      outstandingAmount
    ) {
      setError(
        `Payment cannot exceed the outstanding balance of ₹${outstandingAmount.toFixed(
          2
        )}.`
      );

      return;
    }

    if (!transactionRef.trim()) {
      setError(
        "Transaction reference is required."
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
          transactionRef.trim(),
        paymentDate:
          new Date(
            paymentDate
          ).toISOString(),
      });

      onSaved?.();

      onClose();
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message;

      setError(
        message ||
          "Unable to save payment."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>
            <h2 className="text-lg font-semibold">
              Record Payment
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Outstanding:{" "}
              <span className="font-semibold text-red-600">
                ₹
                {outstandingAmount.toFixed(
                  2
                )}
              </span>
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

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Invoice Summary */}

          <div className="rounded-xl bg-slate-50 p-4">

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Invoice Total
              </span>

              <span className="font-medium">
                ₹{invoiceTotal.toFixed(2)}
              </span>
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span className="text-gray-500">
                Outstanding
              </span>

              <span className="font-semibold text-red-600">
                ₹
                {outstandingAmount.toFixed(
                  2
                )}
              </span>
            </div>

          </div>

          {/* Payment Method */}

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

          {/* Amount */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Amount
            </label>

            <input
              type="number"
              min="0.01"
              max={outstandingAmount}
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

            <p className="mt-1 text-xs text-gray-500">
              Maximum: ₹
              {outstandingAmount.toFixed(
                2
              )}
            </p>
          </div>

          {/* Transaction Reference */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Transaction Reference
            </label>

            <input
              type="text"
              value={transactionRef}
              onChange={(e) =>
                setTransactionRef(
                  e.target.value
                )
              }
              placeholder="Enter transaction reference"
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
              required
            />

            <p className="mt-1 text-xs text-gray-500">
              Temporary reference can be used for now.
            </p>
          </div>

          {/* Payment Date */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Date & Time
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

          {/* Error */}

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Actions */}

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
              disabled={
                saving ||
                outstandingAmount <= 0
              }
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
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