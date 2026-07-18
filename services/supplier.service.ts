import api from "@/lib/axios";

export async function getSuppliers() {
  const { data } = await api.get("/api/suppliers");

  return data;
}