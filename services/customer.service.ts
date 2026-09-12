// import axios from "axios";
import api from "@/lib/axios";

import {
  Customer,
  CustomerRequest,
} from "@/types/customer";
const BASE = "/api/customers";


export async function getCustomers(): Promise<
  Customer[]
> {
  const response =
    await api.get<Customer[]>(
      BASE
    );

  return response.data;
}

export async function getCustomerById(
  id: string
): Promise<Customer> {
  const response =
    await api.get<Customer>(
      `${BASE}/${id}`
    );

  return response.data;
}

export async function createCustomer(
  data: CustomerRequest
): Promise<Customer> {
  const response =
    await api.post<Customer>(
      BASE,
      data
    );

  return response.data;
}

export async function updateCustomer(
  id: string,
  data: CustomerRequest
): Promise<Customer> {
  const response =
    await api.put<Customer>(
      `${BASE}/${id}`,
      data
    );

  return response.data;
}

export async function deleteCustomer(
  id: string
): Promise<void> {
  await api.delete(
    `${BASE}/${id}`
  );
}