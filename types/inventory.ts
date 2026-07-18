export interface InventorySummary {
  totalStockValue: number;
  totalBatches: number;
  lowStockItems: number;
}

export interface LowStockItem {
  medicineId: string;
  medicineName: string;
  batchNo: string;
  quantityAvailable: number;
  reorderLevel: number;
  expiryDate: string;
}

export interface ExpiryItem {
  medicineName: string;
  batchNo: string;
  expiryDate: string;
  daysLeft: number;
  quantityAvailable: number;
}

export interface StockHistory {
  date: string;
  movementType: string;
  referenceType: string;
  quantity: number;
  balanceAfter: number;
  medicineName?: string;
  batchNo?: string;
}

export interface AdjustStockRequest {
  medicineBatchId: string;
  quantity: number;
  reason: string;
}