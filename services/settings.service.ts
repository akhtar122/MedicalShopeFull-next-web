import api from "@/lib/axios";

import {
  StoreSettings,
  SaveSettingsRequest,
} from "@/types/settings";

export async function getSettings(): Promise<StoreSettings> {
  const { data } =
    await api.get<StoreSettings>(
      "/api/settings"
    );

  return data;
}

export async function updateSettings(
  request: SaveSettingsRequest
): Promise<StoreSettings> {
  const { data } =
    await api.post<StoreSettings>(
      "/api/settings/update",
      request
    );

  return data;
}