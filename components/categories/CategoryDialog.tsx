"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Loader2,
  X,
} from "lucide-react";

import {
  Category,
  CreateCategoryRequest,
} from "@/types/category";

interface CategoryDialogProps {
  open: boolean;
  loading?: boolean;
  category?: Category | null;
  onClose: () => void;
  onSubmit: (
    data: CreateCategoryRequest
  ) => Promise<void>;
}

export default function CategoryDialog({
  open,
  loading = false,
  category,
  onClose,
  onSubmit,
}: CategoryDialogProps) {
  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [error, setError] =
    useState("");

  const isEdit =
    Boolean(category);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (category) {
      setName(category.name);
      setDescription(
        category.description || ""
      );
    } else {
      setName("");
      setDescription("");
    }

    setError("");
  }, [open, category]);

  if (!open) {
    return null;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const trimmedName =
      name.trim();

    const trimmedDescription =
      description.trim();

    if (!trimmedName) {
      setError(
        "Category name is required."
      );

      return;
    }

    try {
      await onSubmit({
        name: trimmedName,
        description:
          trimmedDescription,
      });
    } catch (error) {
      console.error(error);

      setError(
        isEdit
          ? "Unable to update category."
          : "Unable to create category."
      );
    }
  }

  function handleClose() {
    if (loading) {
      return;
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {isEdit
                ? "Edit Category"
                : "Add Category"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {isEdit
                ? "Update category information."
                : "Create a new medicine category."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              placeholder="e.g. Antidiabetic"
              disabled={loading}
              className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Used to control blood sugar levels"
              rows={4}
              disabled={loading}
              className="w-full resize-none rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />

          </div>

          <div className="flex justify-end gap-3 border-t pt-5">

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >

              {loading && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {loading
                ? "Saving..."
                : isEdit
                  ? "Update Category"
                  : "Save Category"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}