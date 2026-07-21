"use client";

interface Props {
  loading: boolean;
  disabled: boolean;
  onSave: () => void;
}

export default function SaveInvoiceBar({
  loading,
  disabled,
  onSave,
}: Props) {
  return (
    <div className="sticky bottom-0 rounded-xl border bg-white p-5 shadow-lg">

      <div className="flex justify-end">

        <button
          disabled={loading || disabled}
          onClick={onSave}
          className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading
            ? "Saving..."
            : "Save Invoice"}
        </button>

      </div>

    </div>
  );
}