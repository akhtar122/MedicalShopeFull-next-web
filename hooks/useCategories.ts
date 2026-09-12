"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Category,
  CreateCategoryRequest,
} from "@/types/category";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "@/services/category.service";

export function useCategories() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const loadCategories =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getCategories();

        setCategories(data);
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error
        );

        setError(
          "Unable to load categories."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const addCategory = async (
    data: CreateCategoryRequest
  ) => {
    try {
      setSaving(true);
      setError(null);

      const newCategory =
        await createCategory(data);

      setCategories((current) => [
        newCategory,
        ...current,
      ]);

      return newCategory;
    } catch (error) {
      console.error(
        "Failed to create category:",
        error
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  const getCategory = async (
    id: string
  ) => {
    return await getCategoryById(id);
  };

  const editCategory = async (
    id: string,
    data: CreateCategoryRequest
  ) => {
    try {
      setSaving(true);
      setError(null);

      const updatedCategory =
        await updateCategory(
          id,
          data
        );

      setCategories((current) =>
        current.map((category) => {
          if (category.id !== id) {
            return category;
          }

          return {
            ...category,
            ...updatedCategory,
            createdAt:
              updatedCategory.createdAt ??
              category.createdAt,
            description:
              updatedCategory.description ??
              category.description,
          };
        })
      );

      return updatedCategory;
    } catch (error) {
      console.error(
        "Failed to update category:",
        error
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  const removeCategory = async (
    id: string
  ) => {
    try {
      setDeleting(true);
      setError(null);

      await deleteCategory(id);

      setCategories((current) =>
        current.filter(
          (category) =>
            category.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete category:",
        error
      );

      throw error;
    } finally {
      setDeleting(false);
    }
  };

  return {
    categories,
    loading,
    saving,
    deleting,
    error,

    reload:
      loadCategories,

    addCategory,

    getCategory,

    editCategory,

    removeCategory,
  };
}