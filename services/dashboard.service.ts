import api from "@/lib/axios";
import { DashboardResponse } from "@/types/dashboard";

export const getDashboard = async () => {
  const res = await api.get<DashboardResponse>("/api/dashboard");
  return res.data;
};