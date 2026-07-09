"use client";

import { useEffect, useState } from "react";
import { Medicine } from "@/types/medicine";
import * as service from "@/services/medicine.service";

export function useMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMedicines = async () => {
    try {
      const data = await service.getMedicines();
      setMedicines(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  return {
    medicines,
    loading,
    refresh: loadMedicines,
  };
}