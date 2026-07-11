import api from "@/lib/axios";

export async function getBatches(
  medicineId: string
) {
  const response = await api.get(
    `/medicines/${medicineId}/batches`
  );

  return response.data;
}

export async function createBatch(
  medicineId: string,
  data: any
) {
  await api.post(
    `/medicines/${medicineId}/batches`,
    data
  );
}