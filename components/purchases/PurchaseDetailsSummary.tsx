"use client";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
interface Props {
  totalItems: number;
  grandTotal: number;
}

export default function PurchaseDetailsSummary({
  totalItems,
  grandTotal,
}: Props) {
     const router = useRouter();
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex justify-between">

        <span>Total Items</span>

        <span>{totalItems}</span>

      </div>

      <div className="mt-4 flex justify-between text-xl font-bold">

        <span>Grand Total</span>

        <span>
          ₹ {grandTotal.toFixed(2)}
        </span>

      </div>

      <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/purchases")}
        >
          Cancel
        </Button>
      </Box>

    </div>
  );
}