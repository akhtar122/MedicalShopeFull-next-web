import api from "@/lib/axios";

import {
  Supplier,
  SupplierRequest,
} from "@/types/supplier";

const BASE = "/api/suppliers";

export async function getSuppliers(): Promise<Supplier[]> {
  const response =
    await api.get<Supplier[]>(BASE);

  return response.data;
}

export async function getSupplierById(
  id: string
): Promise<Supplier> {
  const response =
    await api.get<Supplier>(
      `${BASE}/${id}`
    );

  return response.data;
}

export async function createSupplier(
  data: SupplierRequest
): Promise<Supplier> {
  const response =
    await api.post<Supplier>(
      BASE,
      data
    );

  return response.data;
}

export async function updateSupplier(
  id: string,
  data: SupplierRequest
): Promise<Supplier> {
  const response =
    await api.put<Supplier>(
      `${BASE}/${id}`,
      data
    );

  return response.data;
}

export async function deleteSupplier(
  id: string
): Promise<void> {
  await api.delete(
    `${BASE}/${id}`
  );
}