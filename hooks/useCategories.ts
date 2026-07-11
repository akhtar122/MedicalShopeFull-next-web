"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { getCategories } from "@/services/category.service";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await getCategories();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    categories,
    loading,
    refresh: load,
  };
}