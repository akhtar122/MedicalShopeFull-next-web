"use client";

import { useEffect, useState } from "react";

import { getMedicineById } from "@/services/medicine.service";
import { Medicine } from "@/types/medicine";

import BatchTable from "./BatchTable";
import AddBatchDialog from "./AddBatchDialog";

interface Props {
  medicineId: string;
}

export default function MedicineDetails({
  medicineId,
}: Props) {

  const [medicine, setMedicine] =
    useState<Medicine | null>(null);

  async function load() {
    const data =
      await getMedicineById(medicineId);

    setMedicine(data);
  }

  useEffect(() => {
    load();
  }, []);

  if (!medicine)
    return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      <div className="rounded-xl border bg-white p-6">

        <h1 className="mb-5 text-2xl font-bold">
          {medicine.name}
        </h1>

        <div className="grid gap-5 md:grid-cols-3">

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
            title="Generic"
            value={medicine.genericName}
          />

          <Info
            title="Barcode"
            value={medicine.barcode}
          />

          <Info
            title="GST"
            value={`${medicine.gstRate}%`}
          />

          <Info
            title="Purchase"
            value={`₹ ${medicine.purchasePrice}`}
          />

          <Info
            title="Selling"
            value={`₹ ${medicine.sellingPrice}`}
          />

          <Info
            title="Available Stock"
            value={medicine.availableStock}
          />

        </div>

      </div>

      <div className="flex justify-end">

        <AddBatchDialog
          medicineId={medicineId}
          onSuccess={load}
        />

      </div>

      <BatchTable medicineId={medicineId} />

    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: any;
}) {

  return (
    <div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="font-semibold">
        {value}
      </p>

    </div>
  );
}