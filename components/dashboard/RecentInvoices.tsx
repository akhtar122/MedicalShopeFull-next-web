import { RecentInvoice } from "@/types/dashboard";

interface Props {
  invoices: RecentInvoice[];
}

export default function RecentInvoices({
  invoices,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border mt-8">
      <div className="border-b p-5">
        <h2 className="font-semibold text-lg">
          Recent Invoices
        </h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-4">
              Invoice
            </th>

            <th className="text-left p-4">
              Customer
            </th>

            <th className="text-right p-4">
              Amount
            </th>

            <th className="text-right p-4">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.invoiceNumber}
              className="border-t"
            >
              <td className="p-4">
                {invoice.invoiceNumber}
              </td>

              <td className="p-4">
                {invoice.customerName}
              </td>

              <td className="text-right p-4">
                ₹ {invoice.grandTotal.toFixed(2)}
              </td>

              <td className="text-right p-4">
                {new Date(
                  invoice.invoiceDate
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}