"use client";

import { FormEvent, useEffect, useState } from "react";

import {
  SaveSettingsRequest,
  StoreSettings,
} from "@/types/settings";

interface Props {
  settings: StoreSettings | null;
  loading?: boolean;
  saving?: boolean;
  onSave: (
    data: SaveSettingsRequest
  ) => Promise<void>;
}

export default function StoreInformationForm({
  settings,
  loading = false,
  saving = false,
  onSave,
}: Props) {
  const [form, setForm] =
    useState<SaveSettingsRequest>({
      shopName: "",
      gstNumber: "",
      phone: "",
      email: "",
      address: "",
      invoicePrefix: "",
      logoUrl: "",
      qrCodeUrl: "",
    });

  useEffect(() => {
    if (!settings) return;

    setForm({
      shopName: settings.shopName ?? "",
      gstNumber: settings.gstNumber ?? "",
      phone: settings.phone ?? "",
      email: settings.email ?? "",
      address: settings.address ?? "",
      invoicePrefix:
        settings.invoicePrefix ?? "",
      logoUrl: settings.logoUrl ?? "",
      qrCodeUrl:
        settings.qrCodeUrl ?? "",
    });
  }, [settings]);

  function updateField(
    field: keyof SaveSettingsRequest,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await onSave(form);
  }

  if (loading) {
    return (
      <div className="space-y-4">

        <div className="h-12 animate-pulse rounded-lg bg-slate-200" />

        <div className="h-12 animate-pulse rounded-lg bg-slate-200" />

        <div className="h-12 animate-pulse rounded-lg bg-slate-200" />

        <div className="h-32 animate-pulse rounded-lg bg-slate-200" />

      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div className="grid gap-5 md:grid-cols-2">

        {/* Shop Name */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Shop Name
          </label>

          <input
            type="text"
            value={form.shopName}
            onChange={(event) =>
              updateField(
                "shopName",
                event.target.value
              )
            }
            required
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Sunrise Medical Store"
          />

        </div>

        {/* GST */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            GST Number
          </label>

          <input
            type="text"
            value={form.gstNumber}
            onChange={(event) =>
              updateField(
                "gstNumber",
                event.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-3 uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="27PQRS5678L9X2Z7"
          />

        </div>

        {/* Phone */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Phone
          </label>

          <input
            type="tel"
            value={form.phone}
            onChange={(event) =>
              updateField(
                "phone",
                event.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="+91-9123456780"
          />

        </div>

        {/* Email */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              updateField(
                "email",
                event.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="info@example.com"
          />

        </div>

        {/* Invoice Prefix */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Invoice Prefix
          </label>

          <input
            type="text"
            value={form.invoicePrefix}
            onChange={(event) =>
              updateField(
                "invoicePrefix",
                event.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-3 uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="SMS"
          />

          <p className="text-xs text-gray-500">
            Used when generating invoice numbers.
          </p>

        </div>

        {/* Address */}

        <div className="space-y-2 md:col-span-2">

          <label className="text-sm font-medium">
            Address
          </label>

          <textarea
            value={form.address}
            onChange={(event) =>
              updateField(
                "address",
                event.target.value
              )
            }
            rows={3}
            className="w-full resize-none rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Shop address"
          />

        </div>

        {/* Logo URL */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Logo URL
          </label>

          <input
            type="url"
            value={form.logoUrl}
            onChange={(event) =>
              updateField(
                "logoUrl",
                event.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="https://example.com/logo.png"
          />

        </div>

        {/* QR Code URL */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Payment QR Code URL
          </label>

          <input
            type="url"
            value={form.qrCodeUrl}
            onChange={(event) =>
              updateField(
                "qrCodeUrl",
                event.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="https://example.com/qrcode.png"
          />

        </div>

      </div>

      {/* Preview */}

      <div className="grid gap-5 md:grid-cols-2">

        {form.logoUrl && (
          <div className="rounded-xl border bg-slate-50 p-4">

            <p className="mb-3 text-sm font-medium">
              Logo Preview
            </p>

            <img
              src={form.logoUrl}
              alt="Shop logo"
              className="h-24 w-auto max-w-full object-contain"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />

          </div>
        )}

        {form.qrCodeUrl && (
          <div className="rounded-xl border bg-slate-50 p-4">

            <p className="mb-3 text-sm font-medium">
              QR Code Preview
            </p>

            <img
              src={form.qrCodeUrl}
              alt="Payment QR code"
              className="h-32 w-32 object-contain"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />

          </div>
        )}

      </div>

      {/* Save */}

      <div className="flex justify-end border-t pt-5">

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save Settings"}
        </button>

      </div>

    </form>
  );
}