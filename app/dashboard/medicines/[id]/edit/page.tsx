"use client";

import { useParams } from "next/navigation";
import MedicineForm from "@/components/medicines/MedicineForm";

export default function EditMedicinePage() {
  const params = useParams();

  return (
    <MedicineForm
      medicineId={params.id as string}
    />
  );
}