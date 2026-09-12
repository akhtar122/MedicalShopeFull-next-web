"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Loader2,
  X,
} from "lucide-react";

import {
  Customer,
  CustomerRequest,
} from "@/types/customer";

interface CustomerDialogProps {
  open: boolean;
  loading?: boolean;
  customer?: Customer | null;
  onClose: () => void;
  onSubmit: (
    data: CustomerRequest
  ) => Promise<void>;
}

export default function CustomerDialog({
  open,
  loading = false,
  customer,
  onClose,
  onSubmit,
}: CustomerDialogProps) {
  const [form, setForm] =
    useState<CustomerRequest>({
      name: "",
      phone: "",
      email: "",
      gstNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

  const [error, setError] =
    useState("");

  const isEdit =
    Boolean(customer);

  useEffect(() => {
    if (!open) return;

    if (customer) {
      setForm({
        name: customer.name || "",
        phone: customer.phone || "",
        email: customer.email || "",
        gstNumber:
          customer.gstNumber || "",
        address:
          customer.address || "",
        city: customer.city || "",
        state: customer.state || "",
        pincode:
          customer.pincode || "",
      });
    } else {
      setForm({
        name: "",
        phone: "",
        email: "",
        gstNumber: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
    }

    setError("");
  }, [open, customer]);

  if (!open) return null;

  function updateField(
    field: keyof CustomerRequest,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError(
        "Customer name is required."
      );
      return;
    }

    if (!form.phone.trim()) {
      setError(
        "Phone number is required."
      );
      return;
    }

    try {
      await onSubmit({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        gstNumber:
          form.gstNumber.trim(),
        address:
          form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode:
          form.pincode.trim(),
      });
    } catch (error) {
      console.error(error);

      setError(
        isEdit
          ? "Unable to update customer."
          : "Unable to create customer."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4">

          <div>
            <h2 className="text-lg font-semibold">
              {isEdit
                ? "Edit Customer"
                : "Add Customer"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {isEdit
                ? "Update customer information."
                : "Add a new customer."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Customer Name *
              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
                disabled={loading}
                placeholder="Bilal Ahmad"
                className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone *
              </label>

              <input
                value={form.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    e.target.value
                  )
                }
                disabled={loading}
                placeholder="9568974589"
                className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  updateField(
                    "email",
                    e.target.value
                  )
                }
                disabled={loading}
                placeholder="customer@example.com"
                className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                GST Number
              </label>

              <input
                value={form.gstNumber}
                onChange={(e) =>
                  updateField(
                    "gstNumber",
                    e.target.value
                  )
                }
                disabled={loading}
                placeholder="IND291"
                className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Pincode
              </label>

              <input
                value={form.pincode}
                onChange={(e) =>
                  updateField(
                    "pincode",
                    e.target.value
                  )
                }
                disabled={loading}
                placeholder="700001"
                className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Address
              </label>

              <textarea
                value={form.address}
                onChange={(e) =>
                  updateField(
                    "address",
                    e.target.value
                  )
                }
                disabled={loading}
                rows={3}
                placeholder="Customer address"
                className="w-full resize-none rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                City
              </label>

              <input
                value={form.city}
                onChange={(e) =>
                  updateField(
                    "city",
                    e.target.value
                  )
                }
                disabled={loading}
                placeholder="Kolkata"
                className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                State
              </label>

              <input
                value={form.state}
                onChange={(e) =>
                  updateField(
                    "state",
                    e.target.value
                  )
                }
                disabled={loading}
                placeholder="WB"
                className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 border-t pt-5">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border px-5 py-2.5 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >

              {loading && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {loading
                ? "Saving..."
                : isEdit
                  ? "Update Customer"
                  : "Save Customer"}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
}