"use client";

interface Props {
  fromDate: string;
  toDate: string;
  search: string;

  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  onSearchChange: (value: string) => void;

  onReset: () => void;
}

export default function ReportFilter({
  fromDate,
  toDate,
  search,
  onFromDateChange,
  onToDateChange,
  onSearchChange,
  onReset,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5">

      <div className="grid gap-4 md:grid-cols-4">

        <div>

          <label className="mb-1 block text-sm font-medium">

            From Date

          </label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) =>
              onFromDateChange(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />

        </div>

        <div>

          <label className="mb-1 block text-sm font-medium">

            To Date

          </label>

          <input
            type="date"
            value={toDate}
            onChange={(e) =>
              onToDateChange(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />

        </div>

        <div>

          <label className="mb-1 block text-sm font-medium">

            Search

          </label>

          <input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search..."
            className="w-full rounded-lg border px-3 py-2"
          />

        </div>

        <div className="flex items-end">

          <button
            onClick={onReset}
            className="w-full rounded-lg border px-4 py-2"
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
}