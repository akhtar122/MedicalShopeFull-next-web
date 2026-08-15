"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

import StoreInformationForm from "@/components/settings/StoreInformationForm";

import { useStoreSettings } from "@/hooks/useStoreSettings";

import { SaveSettingsRequest } from "@/types/settings";

export default function SettingsPage() {
  const {
    settings,
    loading,
    saving,
    error,
    saveSettings,
  } = useStoreSettings();

  const [success, setSuccess] =
    useState(false);

  async function handleSave(
    data: SaveSettingsRequest
  ) {
    setSuccess(false);

    try {
      await saveSettings(data);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch {
      setSuccess(false);
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-1 text-gray-500">
          Manage your medical shop information.
        </p>

      </div>

      {/* Success */}

      {success && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

          <CheckCircle2 size={18} />

          Store settings saved successfully.

        </div>
      )}

      {/* Error */}

      {error && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

          <AlertCircle size={18} />

          {error}

        </div>
      )}

      {/* Store Information */}

      <div className="rounded-xl border bg-white shadow-sm">

        <div className="border-b px-6 py-5">

          <h2 className="text-lg font-semibold">
            Store Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            This information will be used throughout the application and on invoices.
          </p>

        </div>

        <div className="p-6">

          <StoreInformationForm
            settings={settings}
            loading={loading}
            saving={saving}
            onSave={handleSave}
          />

        </div>

      </div>

    </div>
  );
}