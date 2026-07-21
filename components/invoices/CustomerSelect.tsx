"use client";

import { Customer } from "@/types/customer";

interface Props {
  customers: Customer[];

  value: string;

  onChange: (value: string) => void;
}

export default function CustomerSelect({
  customers,
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-lg border px-4 py-3"
    >
      <option value="">
        Select Customer
      </option>

      {customers.map((customer) => (
        <option
          key={customer.id}
          value={customer.id}
        >
          {customer.name}
        </option>
      ))}
    </select>
  );
}