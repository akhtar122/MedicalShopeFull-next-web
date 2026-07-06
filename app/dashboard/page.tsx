"use client";

import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <h2 className="p-10">Loading...</h2>;

  if (error) return <h2 className="p-10">Unable to connect API</h2>;

  return (
    <div className="p-6 space-y-5">

      <pre className="rounded-lg bg-black p-5 text-white overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>

    </div>
  );
}