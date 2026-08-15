"use client";

import { useEffect, useState } from "react";

import {
  getSettings,
  updateSettings,
} from "@/services/settings.service";

import {
  StoreSettings,
  SaveSettingsRequest,
} from "@/types/settings";

export function useStoreSettings() {
  const [settings, setSettings] =
    useState<StoreSettings | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);
    setError(null);

    try {
      const data =
        await getSettings();

      setSettings(data);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load store settings."
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings(
    request: SaveSettingsRequest
  ) {
    setSaving(true);
    setError(null);

    try {
      const result =
        await updateSettings(request);

      setSettings(result);

      return result;
    } catch (error) {
      console.error(error);

      setError(
        "Unable to save store settings."
      );

      throw error;
    } finally {
      setSaving(false);
    }
  }

  return {
    settings,
    loading,
    saving,
    error,
    saveSettings,
    refresh: loadSettings,
  };
}