interface Props {
  subtotal: number;

  gst: number;

  discount: number;

  grandTotal: number;

  onDiscountChange: (
    value: number
  ) => void;
}

export default function InvoiceSummary({
  subtotal,
  gst,
  discount,
  grandTotal,
  onDiscountChange,
}: Props) {
  return (
    <div className="ml-auto w-full max-w-md rounded-xl border bg-white p-6">

      <div className="space-y-4">

        <div className="flex justify-between">

          <span>Subtotal</span>

          <span>
            ₹ {subtotal.toFixed(2)}
          </span>

        </div>

        <div className="flex justify-between">

          <span>GST</span>

          <span>
            ₹ {gst.toFixed(2)}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span>Discount</span>

          <input
            type="number"
            min={0}
            value={discount}
            onChange={(e) =>
              onDiscountChange(
                Number(
                  e.target.value
                )
              )
            }
            className="w-28 rounded border px-3 py-2 text-right"
          />

        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">

          <span>Total</span>

          <span>
            ₹ {grandTotal.toFixed(2)}
          </span>

        </div>

      </div>

    </div>
  );
}