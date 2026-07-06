import api from "@/lib/axios";
import { DashboardResponse } from "@/types/dashboard";

export const getDashboard = async () => {
  const response = await api.get<DashboardResponse>("/dashboard");

  return response.data;
};