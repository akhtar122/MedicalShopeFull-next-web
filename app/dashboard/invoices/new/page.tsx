"use client";

import { useState } from "react";

import InvoiceHeader from "@/components/invoices/InvoiceHeader";
import CustomerSelect from "@/components/invoices/CustomerSelect";
import AddInvoiceItem
  from "@/components/invoices/AddInvoiceItem";
import InvoiceSummary from "@/components/invoices/InvoiceSummary";
import { useRouter } from "next/navigation";

import SaveInvoiceBar from "@/components/invoices/SaveInvoiceBar";

// import { createInvoice } from "@/services/invoice.service";
import { createInvoice } from "@/services/customer.service";

import { CreateInvoiceRequest } from "@/types/invoice";

import { InvoiceLine }
  from "@/types/invoice";

import { useCustomers } from "@/hooks/useCustomers";
import InvoiceItemsTable from "@/components/invoices/InvoiceItemsTable";

export default function NewInvoicePage() {
  const { customers } =
    useCustomers();
  const router = useRouter();

  const [saving, setSaving] =
    useState(false);

  const [customerId, setCustomerId] =
    useState("");

  const [invoiceDate, setInvoiceDate] =
    useState(
      new Date()
        .toISOString()
        .substring(0, 10)
    );

  const [discount, setDiscount] =
    useState(0);
  const [items, setItems] =
    useState<InvoiceLine[]>([]);

  const subtotal =
    items.reduce(
      (sum, x) =>
        sum +
        x.quantity *
        x.sellingPrice,
      0
    );

  const gst =
    items.reduce(
      (sum, x) =>
        sum +
        x.quantity *
        x.sellingPrice *
        x.gstRate /
        100,
      0
    );

  const grandTotal =
    subtotal +
    gst -
    discount;

  function addItem(
    item: InvoiceLine
  ) {
    setItems((prev) => [
      ...prev,
      item,
    ]);
  }
  async function saveInvoice() {

    if (!customerId) {

      alert("Select customer");

      return;

    }

    if (items.length === 0) {

      alert("Add at least one medicine");

      return;

    }

    const request: CreateInvoiceRequest = {

      customerId,

      discount,

      items: items.map(x => ({

        medicineId: x.medicineId,

        medicineBatchId:
          x.medicineBatchId,

        quantity: x.quantity,

      })),

    };

    try {

      setSaving(true);

      await createInvoice(request);

      alert("Invoice saved successfully.");

      router.push("/dashboard/invoices");

    } catch {

      alert("Unable to save invoice.");

    } finally {

      setSaving(false);

    }

  }
  function removeItem(
    batchId: string
  ) {
    setItems(prev => prev.filter(x => x.medicineBatchId !== batchId));
  }
  function updateQuantity(

    batchId: string,

    qty: number

  ) {

    setItems(prev =>

      prev.map(item => {

        if (item.medicineBatchId !== batchId)

          return item;

        if (qty > item.availableQuantity) {

          alert(

            `Only ${item.availableQuantity} available`

          );

          return item;

        }

        const lineTotal =

          qty *

          item.sellingPrice *

          (1 + item.gstRate / 100);

        return {

          ...item,

          quantity: qty,

          lineTotal,

        };

      })

    );

  }

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          New Invoice
        </h1>

        <p className="text-gray-500">
          Create sales invoice
        </p>

      </div>

      <InvoiceHeader
        invoiceDate={invoiceDate}
        paymentMethod={paymentMethod}
        onDateChange={setInvoiceDate}
        onPaymentChange={setPaymentMethod}
      >
        <CustomerSelect
          customers={customers}
          value={customerId}
          onChange={setCustomerId}
        />
      </InvoiceHeader>
      <AddInvoiceItem
        items={items}
        onAdd={addItem}
      />
      <InvoiceItemsTable
        items={items}
        onQuantityChange={updateQuantity}
        onRemove={removeItem}
      />
      <InvoiceSummary
        subtotal={subtotal}
        gst={gst}
        discount={discount}
        grandTotal={grandTotal}
        onDiscountChange={setDiscount}
      />
      <SaveInvoiceBar
        loading={saving}
        disabled={items.length === 0}
        onSave={saveInvoice}

      />

    </div>
  );
}