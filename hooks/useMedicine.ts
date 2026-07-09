"use client";

import { useEffect, useState } from "react";
import { Medicine } from "@/types/medicine";
import * as service from "@/services/medicine.service";

export function useMedicine(id: string) {
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    service
      .getMedicine(id)
      .then(setMedicine)
      .finally(() => setLoading(false));
  }, [id]);

  return {
    medicine,
    loading,
  };
}