"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

import CategoryDialog from "@/components/categories/CategoryDialog";

import CategoryTable from "@/components/categories/CategoryTable";

import {
  useCategories,
} from "@/hooks/useCategories";

import {
  Category,
} from "@/types/category";

export default function CategoriesPage() {
  const {
    categories,
    loading,
    saving,
    deleting,
    error,
    reload,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategories();

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const [search, setSearch] =
    useState("");

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const filteredCategories =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return categories;
      }

      return categories.filter(
        (category) =>
          category.name
            .toLowerCase()
            .includes(query) ||
          category.description
            ?.toLowerCase()
            .includes(query)
      );
    }, [
      categories,
      search,
    ]);

  function handleAdd() {
    setSelectedCategory(null);
    setDialogOpen(true);
  }

  function handleEdit(
    category: Category
  ) {
    setSelectedCategory(category);
    setDialogOpen(true);
  }

  async function handleSubmit(
    data: {
      name: string;
      description: string;
    }
  ) {
    if (selectedCategory) {
      await editCategory(
        selectedCategory.id,
        data
      );
    } else {
      await addCategory(data);
    }

    setDialogOpen(false);
    setSelectedCategory(null);
  }

  async function handleDelete(
    category: Category
  ) {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${category.name}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(
        category.id
      );

      await removeCategory(
        category.id
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "Unable to delete category."
      );
    } finally {
      setDeletingId(null);
    }
  }

  function handleCloseDialog() {
    if (saving) {
      return;
    }

    setDialogOpen(false);
    setSelectedCategory(null);
  }

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Categories
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage medicine categories.
          </p>

        </div>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >

            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >

            <Plus size={18} />

            Add Category

          </button>

        </div>

      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Search */}

      <div className="rounded-2xl border bg-white p-4 shadow-sm">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search categories..."
            className="w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </div>

      {/* Summary */}

      <div className="grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Categories
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {categories.length}
          </p>

        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Showing
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {filteredCategories.length}
          </p>

        </div>

      </div>

      {/* Table */}

      {loading ? (

        <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
          Loading categories...
        </div>

      ) : (

        <CategoryTable
          categories={
            filteredCategories
          }
          onEdit={
            handleEdit
          }
          onDelete={
            handleDelete
          }
          deletingId={
            deletingId
          }
        />

      )}

      {/* Dialog */}

      <CategoryDialog
        open={dialogOpen}
        loading={saving}
        category={
          selectedCategory
        }
        onClose={
          handleCloseDialog
        }
        onSubmit={
          handleSubmit
        }
      />

    </div>
  );
}