import axios from "@/lib/axios";
import {
  Medicine,
  CreateMedicineRequest,
  UpdateMedicineRequest,
} from "@/types/medicine";

const BASE = "/medicines";

export const getMedicines = async (): Promise<Medicine[]> => {
  const { data } = await axios.get(BASE);
  return data;
};

export const getMedicine = async (
  id: string
): Promise<Medicine> => {
  const { data } = await axios.get(`${BASE}/${id}`);
  return data;
};

export const createMedicine = async (
  request: CreateMedicineRequest
) => {
  const { data } = await axios.post(BASE, request);
  return data;
};

export const updateMedicine = async (
  id: string,
  request: UpdateMedicineRequest
) => {
  const { data } = await axios.put(`${BASE}/${id}`, request);
  return data;
};

export const deleteMedicine = async (
  id: string
) => {
  await axios.delete(`${BASE}/${id}`);
};