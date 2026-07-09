export interface RecentInvoice {
  invoiceNumber: string;
  customerName: string;
  grandTotal: number;
  invoiceDate: string;
}

export interface DashboardResponse {
  todaySales: number;
  todayInvoices: number;
  totalRevenue: number;
  totalCustomers: number;
  lowStockCount: number;
  currentStockValue: number;
  recentInvoices: RecentInvoice[];
}