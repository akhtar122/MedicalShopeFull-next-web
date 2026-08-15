export interface StoreSettings {
  id: string;
  shopName: string;
  gstNumber: string;
  phone: string;
  email: string;
  address: string;
  invoicePrefix: string;
  logoUrl: string;
  qrCodeUrl: string;
}

export interface SaveSettingsRequest {
  shopName: string;
  gstNumber: string;
  phone: string;
  email: string;
  address: string;
  invoicePrefix: string;
  logoUrl: string;
  qrCodeUrl: string;
}