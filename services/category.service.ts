import api from "@/lib/axios";
import { Category } from "@/types/category";

const BASE = "/api/categories";

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>(BASE);
  return response.data;
}