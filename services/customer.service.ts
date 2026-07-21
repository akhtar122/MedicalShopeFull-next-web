import api from "@/lib/axios";
import { Customer } from "@/types/customer";
import { CreateInvoiceRequest } from "@/types/invoice";

export async function getCustomers(): Promise<Customer[]> {
  const { data } =
    await api.get("/api/customers");

  return data;
}
export async function createInvoice(
  request: CreateInvoiceRequest
) {
  const { data } = await api.post(
    "/api/invoices",
    request
  );

  return data;
}

