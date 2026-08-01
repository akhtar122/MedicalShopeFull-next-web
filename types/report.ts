export interface SalesReportItem {

    id: string;

    invoiceNumber: string;

    customerName: string;

    invoiceDate: string;

    subtotal: number;

    gstTotal: number;

    discount: number;

    grandTotal: number;

    paymentStatus: string;

}

export interface SalesReportSummary {

    totalInvoices: number;

    totalRevenue: number;

    totalGST: number;

    totalDiscount: number;

}
export interface PurchaseReportItem {
  id: string;
  purchaseNo: string;
  supplierId: string;
  supplierName: string;
  supplierInvoiceNo: string;
  purchaseDate: string;
  grandTotal: number;
  createdByName: string;
}
export interface InventorySummary {

    totalStockValue: number;

    totalBatches: number;

    lowStockItems: number;

}

export interface LowStockReportItem {

    medicineId: string;

    medicineName: string;

    batchNo: string;

    quantityAvailable: number;

    reorderLevel: number;

    expiryDate: string;

}
export interface ExpiryReportItem {

    medicineName: string;

    batchNo: string;

    expiryDate: string;

    daysLeft: number;

    quantityAvailable: number;

}
export interface StockHistoryReportItem {

    date: string;

    movementType: string;

    referenceType: string;

    quantity: number;

    medicineName: string;

    balanceAfter: number;

    batchNo: string;

}