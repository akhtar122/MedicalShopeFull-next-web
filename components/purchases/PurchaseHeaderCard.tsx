"use client";

interface Supplier {
  id: string;
  companyName: string;
}

interface Props {
  suppliers: Supplier[];

  supplierId: string;

  supplierInvoiceNo: string;

  purchaseDate: string;

  onSupplierChange: (value: string) => void;

  onInvoiceChange: (value: string) => void;

  onDateChange: (value: string) => void;
}

export default function PurchaseHeaderCard({
  suppliers,
  supplierId,
  supplierInvoiceNo,
  purchaseDate,
  onSupplierChange,
  onInvoiceChange,
  onDateChange,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold">
        Supplier Information
      </h2>

      <div className="grid grid-cols-3 gap-5">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Supplier
          </label>

          <select
            value={supplierId}
            onChange={(e) =>
              onSupplierChange(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="">
              Select Supplier
            </option>

            {suppliers.map((supplier) => (
              <option
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.companyName}
              </option>
            ))}

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Supplier Invoice
          </label>

          <input
            value={supplierInvoiceNo}
            onChange={(e) =>
              onInvoiceChange(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Purchase Date
          </label>

          <input
            type="date"
            value={purchaseDate}
            onChange={(e) =>
              onDateChange(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

      </div>

    </div>
  );
}