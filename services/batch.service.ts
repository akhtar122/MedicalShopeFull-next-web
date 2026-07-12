import { getToken } from "@/lib/auth";
import api from "@/lib/axios";
import { Batch , CreateBatchRequest } from "@/types/batch";

const API = process.env.NEXT_PUBLIC_API_URL;

function headers() {
  return {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
}

export async function getMedicine(id: string) {
  const res = await fetch(`${API}/api/medicines/${id}`, {
    headers: headers(),
  });

  if (!res.ok)
    throw new Error("Unable to load medicine");

  return res.json();
}

export async function getMedicineBatches(id: string): Promise<Batch[]> {
  const res = await fetch(
    `${API}/api/medicines/${id}/batches`,
    {
      headers: headers(),
    }
  );

  if (!res.ok)
    throw new Error("Unable to load batches");

  return res.json();
}
export async function getBatches(
  medicineId: string
): Promise<Batch[]> {
  const { data } = await api.get(
    `/api/medicines/${medicineId}/batches`
  );

  return data;
}

export async function updateBatch(

    medicineId:string,

    batchId:string,

    request:CreateBatchRequest

){

    const {data}=await api.put(

        `/medicines/${medicineId}/batches/${batchId}`,

        request

    );

    return data;

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