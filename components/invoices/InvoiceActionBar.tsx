"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";

export default function InvoiceActionBar() {

    const router = useRouter();

    return (

        <div className="flex justify-between">

            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 rounded-lg border px-5 py-3"
            >
                <ArrowLeft size={18} />

                Back

            </button>

            <button
                onClick={() => window.print()}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white"
            >
                <Printer size={18} />

                Print

            </button>

        </div>

    );

}