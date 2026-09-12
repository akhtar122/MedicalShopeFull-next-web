import api from "@/lib/axios";
import { Category , CreateCategoryRequest,} from "@/types/category";

const BASE = "/api/categories";

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>(BASE);
  return response.data;
}
export async function getCategoryById(
  id: string
): Promise<Category> {
  const response =
    await api.get<Category>(
      `${BASE}/${id}`
    );

  return response.data;
}

export async function createCategory(
  data: CreateCategoryRequest
): Promise<Category> {
  const response =
    await api.post<Category>(
      BASE,
      data
    );

  return response.data;
}

export async function updateCategory(
  id: string,
  data: CreateCategoryRequest
): Promise<Category> {
  const response =
    await api.put<Category>(
      `${BASE}/${id}`,
      data
    );

  return response.data;
}

export async function deleteCategory(
  id: string
): Promise<void> {
  await api.delete(
    `${BASE}/${id}`
  );
}