export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber?: string;
  paymentMethod: string;
  amount: number;
  transactionRef: string | null;
  paymentDate: string;
  createdAt: string;
}

export interface PaymentSummary {
  invoiceId: string;
  invoiceNumber: string;
  invoiceTotal: number;
  totalPaid: number;
  outstandingAmount: number;
  paymentStatus: "PENDING" | "PARTIAL" | "PAID";
  payments: Payment[];
}

export interface CreatePaymentRequest {
  invoiceId: string;
  paymentMethod: string;
  amount: number;
  transactionRef: string;
  paymentDate: string;
}
export interface OutstandingPayment {
  invoiceId: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  invoiceTotal: number;
  totalPaid: number;
  outstandingAmount: number;
  paymentStatus: "PENDING" | "PARTIAL";
  invoiceDate: string;
}