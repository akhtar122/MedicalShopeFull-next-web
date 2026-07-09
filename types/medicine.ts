export interface Medicine {
  id: string;
  medicineCode: string;
  isActive: boolean;
  createdAt: string;

  categoryId: string;
  categoryName: string;

  availableStock: number;

  name: string;
  genericName: string;
  manufacturer: string;

  barcode: string;
  hsnCode: string;

  gstRate: number;
  purchasePrice: number;
  sellingPrice: number;

  reorderLevel: number;
}

export interface CreateMedicineRequest {
  categoryId: string;
  name: string;
  genericName: string;
  manufacturer: string;
  barcode: string;
  hsnCode: string;
  gstRate: number;
  purchasePrice: number;
  sellingPrice: number;
  reorderLevel: number;
}

export interface UpdateMedicineRequest
  extends CreateMedicineRequest {}

export interface MedicineFilters {
  search?: string;
  categoryId?: string;
  active?: boolean;
}