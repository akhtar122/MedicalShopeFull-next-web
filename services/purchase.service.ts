import api from "@/lib/axios";

import {
  CreatePurchaseRequest,
} from "@/types/purchase";

export async function createPurchase(
  request: CreatePurchaseRequest
) {
  const { data } = await api.post(
    "/api/purchases",
    request
  );

  return data;
}

export async function getPurchases() {
  const { data } =
    await api.get("/api/purchases");

  return data;
}

export async function getPurchase(
  id: string
) {
  const { data } =
    await api.get(
      `/api/purchases/${id}`
    );

  return data;
}

export async function deletePurchase(
  id: string
) {
  await api.delete(
    `/api/purchases/${id}`
  );
}

export async function updatePurchase(
  id: string,
  request: CreatePurchaseRequest
) {
  const { data } =
    await api.put(
      `/api/purchases/${id}`,
      request
    );

  return data;
}