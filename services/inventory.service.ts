import api from "@/lib/axios";

import {
  InventorySummary,
  LowStockItem,
  ExpiryItem,
  StockHistory,
  AdjustStockRequest,
} from "@/types/inventory";

export async function getInventorySummary(): Promise<InventorySummary> {
  const { data } = await api.get("/api/inventory/current-stock");
  return data;
}

export async function getLowStock(): Promise<LowStockItem[]> {
  const { data } = await api.get("/api/inventory/low-stock");
  return data;
}

export async function getExpiry(days = 30): Promise<ExpiryItem[]> {
  const { data } = await api.get(
    `/api/inventory/expiry?daysAhead=${days}`
  );

  return data;
}

export async function getStockHistory(): Promise<StockHistory[]> {
  const { data } = await api.get("/api/inventory/stock-history");
  return data;
}

export async function getBatchHistory(
  medicineBatchId: string
): Promise<StockHistory[]> {
  const { data } = await api.get(
    `/api/inventory/stock-history?medicineBatchId=${medicineBatchId}`
  );

  return data;
}
export async function adjustStock(
    request: AdjustStockRequest
) {
    const { data } = await api.post(
        "/api/inventory/adjust-stock",
        request
    );

    return data;
}


export async function getMedicineBatches(
  medicineId: string
) {
  const { data } = await api.get(
    `/api/inventory/medicine/${medicineId}/batches`
  );

  return data;
}