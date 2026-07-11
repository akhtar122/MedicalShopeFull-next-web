"use client";

import MedicineForm from "@/components/medicines/MedicineForm";

interface Props {
  params: {
    id: string;
  };
}

export default function EditMedicinePage({ params }: Props) {
  return (
    <MedicineForm
      medicineId={params.id}
    />
  );
}