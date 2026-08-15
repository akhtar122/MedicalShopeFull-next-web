export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  paymentMethod: string;
  amount: number;
  transactionRef?: string | null;
  paymentDate: string;
  createdAt: string;
}

export interface CreatePaymentRequest {
  invoiceId: string;
  paymentMethod: string;
  amount: number;
  transactionRef?: string;
  paymentDate: string;
}