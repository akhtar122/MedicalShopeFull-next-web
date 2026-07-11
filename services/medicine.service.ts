import api from "@/lib/axios";
import {
  Medicine,
  CreateMedicineRequest,
  UpdateMedicineRequest,
} from "@/types/medicine";

const BASE = "/api/medicines";

export const getMedicines = async (): Promise<Medicine[]> => {
  const { data } = await api.get<Medicine[]>(BASE);
  return data;
};

export const getMedicine = async (
  id: string
): Promise<Medicine> => {
  const { data } = await api.get<Medicine>(`${BASE}/${id}`);
  return data;
};

export const createMedicine = async (
  request: CreateMedicineRequest
) => {
  const { data } = await api.post(BASE, request);
  return data;
};

export async function getMedicineById(id: string) {
  const response = await api.get<Medicine>(`${BASE}/${id}`);
  return response.data;
}

export const updateMedicine = async (
  id: string,
  request: UpdateMedicineRequest
) => {
  const { data } = await api.put(`${BASE}/${id}`, request);
  return data;
};

export const deleteMedicine = async (
  id: string
) => {
  await api.delete(`${BASE}/${id}`);
};