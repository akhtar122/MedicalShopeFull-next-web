"use client";

import { useParams } from "next/navigation";
import { useBatches } from "@/hooks/useBatches";
import MedicineInfoCard from "@/components/batches/MedicineInfoCard";
import BatchTable from "@/components/batches/BatchTable";
import AddBatchDialog from "@/components/batches/BatchDialog";
import { useState } from "react";


export default function BatchPage() {
    const params = useParams();
    const [open, setOpen] = useState(false);
    const id = params.id as string;

    const {
        medicine,
        batches,
        loading,
        refresh,
    } = useBatches(id);

    if (loading)
        return <div>Loading...</div>;

    function loadBatches(): void {
        try {
            
            refresh();
            // close dialog if open
            setOpen(false);
        } catch (e) {
            // noop - keep UI stable on refresh errors
            console.error(e);
        }
    }

    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-2xl font-bold">
                    Batch Management
                </h1>

                <p className="text-gray-500">
                    {medicine.name}
                </p>

            </div>

            <div className="rounded-xl border bg-white p-6">

                <pre>
                    <MedicineInfoCard medicine={medicine} />
                </pre>

            </div>
            <div className="flex justify-end">

                <button
                    onClick={() => setOpen(true)}
                    className="rounded-lg bg-blue-600 px-5 py-3 text-white"
                >
                    + Add Batch
                </button>

            </div>
            <div className="rounded-xl border bg-white p-6">

                <pre>
                    <BatchTable batches={batches} />
                </pre>

            </div>
            <AddBatchDialog
                medicineId={id}
                open={open}
                onClose={() => setOpen(false)}
                onSaved={loadBatches}
            />

        </div>
    );
}