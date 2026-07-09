"use client";

import { useEffect, useState } from "react";
import { DashboardResponse } from "@/types/dashboard";
import { getDashboard } from "@/services/dashboard.service";

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    loading,
  };
}