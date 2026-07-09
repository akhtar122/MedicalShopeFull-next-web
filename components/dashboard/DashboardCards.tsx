import { DashboardResponse } from "@/types/dashboard";
import StatCard from "./StatCard";

interface Props {
  data: DashboardResponse;
}

export default function DashboardCards({
  data,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Today's Sales"
        value={`₹ ${data.todaySales.toFixed(2)}`}
      />

      <StatCard
        title="Today's Invoices"
        value={data.todayInvoices}
      />

      <StatCard
        title="Total Revenue"
        value={`₹ ${data.totalRevenue.toFixed(2)}`}
      />

      <StatCard
        title="Customers"
        value={data.totalCustomers}
      />

      <StatCard
        title="Low Stock Medicines"
        value={data.lowStockCount}
      />

      <StatCard
        title="Current Stock Value"
        value={`₹ ${data.currentStockValue.toFixed(2)}`}
      />
    </div>
  );
}