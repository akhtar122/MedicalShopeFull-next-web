import api from "@/lib/axios";
import { InvoiceMedicine } from "@/types/invoice";
import {
  Invoice,
  InvoiceDetails,
} from "@/types/invoice";

export async function getInvoices(): Promise<Invoice[]> {
  const { data } =
    await api.get("/api/invoices");

  return data;
}

export async function getInvoice(
  id: string
): Promise<InvoiceDetails> {
  const { data } =
    await api.get(`/api/invoices/${id}`);

  return data;
}

export async function deleteInvoice(
  id: string
) {
  await api.delete(`/api/invoices/${id}`);
}
export async function searchMedicines(): Promise<
  InvoiceMedicine[]
> {
  const { data } = await api.get(
    "/api/medicines"
  );

  return data;
}