import api from "@/lib/axios";

import {
  Payment,
  PaymentSummary,
  CreatePaymentRequest,
   OutstandingPayment,
} from "@/types/payment";

export async function getPayments(): Promise<Payment[]> {
  const { data } = await api.get<Payment[]>(
    "/api/payments"
  );

  return data;
}

export async function createPayment(
  request: CreatePaymentRequest
): Promise<Payment> {
  const { data } = await api.post<Payment>(
    "/api/payments",
    request
  );

  return data;
}

export async function getInvoicePayments(
  invoiceId: string
): Promise<PaymentSummary> {
  const { data } =
    await api.get<PaymentSummary>(
      `/api/payments/invoice/${invoiceId}`
    );

  return data;
}
export async function getOutstandingPayments(): Promise<
  OutstandingPayment[]
> {
  const { data } =
    await api.get<OutstandingPayment[]>(
      "/api/payments/outstanding"
    );

  return data;
}