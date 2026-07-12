interface Props {
  medicine: any;
}

export default function MedicineInfoCard({ medicine }: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold">
            {medicine.name}
          </h2>

          <p className="text-sm text-gray-500">
            {medicine.genericName}
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 px-4 py-2">
          <p className="text-xs text-gray-500">
            Current Stock
          </p>

          <p className="text-2xl font-bold text-blue-600">
            {medicine.availableStock}
          </p>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        <Info
          title="Medicine Code"
          value={medicine.medicineCode}
        />

        <Info
          title="Category"
          value={medicine.categoryName}
        />

        <Info
          title="Manufacturer"
          value={medicine.manufacturer}
        />

        <Info
          title="Barcode"
          value={medicine.barcode}
        />

        <Info
          title="Purchase Price"
          value={`₹${medicine.purchasePrice}`}
        />

        <Info
          title="Selling Price"
          value={`₹${medicine.sellingPrice}`}
        />

        <Info
          title="GST"
          value={`${medicine.gstRate}%`}
        />

        <Info
          title="Reorder Level"
          value={medicine.reorderLevel}
        />

      </div>

    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div>

      <p className="text-xs uppercase tracking-wide text-gray-500">
        {title}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>

    </div>
  );
}