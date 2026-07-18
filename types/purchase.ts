export interface Purchase {
  id: string;
  purchaseNo: string;
  supplierId: string;
  supplierName: string;
  supplierInvoiceNo: string;
  purchaseDate: string;
  grandTotal: number;
  createdByName: string;
}

export interface PurchaseItem {
  medicineId: string;
  medicineName?: string;

  batchNo: string;
  expiryDate: string;

  quantity: number;

  purchasePrice: number;

  currentSellingPrice: number;

  lineTotal: number;
}

export interface PurchaseDetails extends Purchase {
  items: PurchaseItem[];
}

export interface CreatePurchaseRequest {
  supplierId: string;

  supplierInvoiceNo: string;

  purchaseDate: string;

  items: PurchaseItem[];
}