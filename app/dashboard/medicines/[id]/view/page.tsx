"use client";

import MedicineDetails from "@/components/medicines/MedicineDetails";

interface Props {
  params: {
    id: string;
  };
}

export default function MedicineViewPage({ params }: Props) {
  return (
    <MedicineDetails
      medicineId={params.id}
    />
  );
}