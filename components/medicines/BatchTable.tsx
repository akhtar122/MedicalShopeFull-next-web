"use client";

import { useBatches } from "@/hooks/useBatches";

interface Props {
  medicineId: string;
}

export default function BatchTable({
  medicineId,
}: Props) {

  const {
    batches,
    loading,
  } = useBatches(medicineId);

  if (loading)
    return <p>Loading batches...</p>;

  return (
    <div className="rounded-xl border bg-white">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="p-3 text-left">
              Batch
            </th>

            <th>
              Expiry
            </th>

            <th>
              Purchase
            </th>

            <th>
              Selling
            </th>

            <th>
              Available
            </th>

          </tr>

        </thead>

        <tbody>

          {batches.map(batch => (

            <tr
              key={batch.id}
              className="border-b"
            >

              <td className="p-3">
                {batch.batchNo}
              </td>

              <td>
                {new Date(
                  batch.expiryDate
                ).toLocaleDateString()}
              </td>

              <td>
                ₹ {batch.purchasePrice}
              </td>

              <td>
                ₹ {batch.sellingPrice}
              </td>

              <td>
                {batch.quantityAvailable}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}