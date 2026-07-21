export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  invoiceDate: string;
  paymentStatus: string;
  grandTotal: number;
}

export interface InvoiceDetails {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  invoiceDate: string;
  subtotal: number;
  gstTotal: number;
  discount: number;
  grandTotal: number;
  paymentStatus: string;
  items: InvoiceItemDetails[];
}

export interface InvoiceItemDetails {

    medicineId: string;

    medicineName: string;

    medicineBatchId: string;

    batchNo: string;

    expiryDate: string;

    quantity: number;

    unitPrice: number;

    gstRate: number;

    lineTotal: number;
}

export interface InvoiceItem {
  medicineId: string;
  medicineName: string;

  batchNo: string;

  quantity: number;

  sellingPrice: number;

  gstRate: number;

  lineTotal: number;
}
export interface InvoiceItemRequest {
  medicineId: string;
  medicineBatchId: string;
  quantity: number;
}

export interface InvoiceMedicine {
  id: string;
  name: string;
  genericName: string;
  sellingPrice: number;
  gstRate: number;
  availableStock: number;
}
export interface InvoiceLine {
  medicineId: string;
  medicineName: string;

  medicineBatchId: string;
  batchNo: string;

  expiryDate: string;

  quantity: number;

  availableQuantity: number;

  sellingPrice: number;

  gstRate: number;

  lineTotal: number;
}

export interface CreateInvoiceRequest {
  customerId: string;

  discount: number;

  items: InvoiceItemRequest[];
}

export interface InvoiceBatch {
  id: string;
  batchNo: string;
  expiryDate: string;
  quantityAvailable: number;
  sellingPrice: number;
  purchasePrice: number;
}
export interface CreateInvoiceRequest {
  customerId: string;
  discount: number;
  items: {
    medicineId: string;
    medicineBatchId: string;
    quantity: number;
  }[];
}