import api from "@/lib/axios";

import {
  Payment,
  CreatePaymentRequest,
} from "@/types/payment";

export async function createPayment(
  request: CreatePaymentRequest
): Promise<Payment> {
  const { data } =
    await api.post<Payment>(
      "/api/payments",
      request
    );

  return data;
}