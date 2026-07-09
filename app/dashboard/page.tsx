"use client";

import DashboardCards from "@/components/dashboard/DashboardCards";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { data, loading } = useDashboard();

  if (loading)
    return <div>Loading...</div>;

  if (!data)
    return <div>Unable to connect API</div>;

  return (
    <div className="space-y-8">
      <DashboardCards data={data} />

      <RecentInvoices
        invoices={data.recentInvoices}
      />
    </div>
  );
}