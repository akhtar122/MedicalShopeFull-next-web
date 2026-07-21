import api from "@/lib/axios";
import { InvoiceBatch } from "@/types/invoice";
import { Batch, CreateBatchRequest } from "@/types/batch";

export async function getMedicine(id: string) {
  const { data } = await api.get(`/api/medicines/${id}`);
  return data;
}

export async function getMedicineBatches(
  id: string
): Promise<Batch[]> {
  const { data } = await api.get(
    `/api/medicines/${id}/batches`
  );

  return data;
}

export async function getBatches(
  medicineId: string
): Promise<Batch[]> {
  const { data } = await api.get(
    `/api/medicines/${medicineId}/batches`
  );

  return data;
}
export async function getInvoiceBatches(
  medicineId: string
): Promise<InvoiceBatch[]> {
  const { data } = await api.get(
    `/api/inventory/medicine/${medicineId}/batches`
  );

  return data.sort(
    (a: InvoiceBatch, b: InvoiceBatch) =>
      new Date(a.expiryDate).getTime() -
      new Date(b.expiryDate).getTime()
  );
}

export async function createBatch(
  medicineId: string,
  request: CreateBatchRequest
) {
  const { data } = await api.post(
    `/api/medicines/${medicineId}/batches`,
    request
  );

  return data;
}

export async function updateBatch(
  medicineId: string,
  batchId: string,
  request: CreateBatchRequest
) {
  const { data } = await api.put(
    `/api/medicines/${medicineId}/batches/${batchId}`,
    request
  );

  return data;
}

export async function deleteBatch(
  medicineId: string,
  batchId: string
) {
  await api.delete(
    `/api/medicines/${medicineId}/batches/${batchId}`
  );
}