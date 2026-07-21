"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    getInvoice,
} from "@/services/invoice.service";

import {
    InvoiceDetails,
} from "@/types/invoice";

export function useInvoice(
    id: string
) {

    const [
        invoice,
        setInvoice,
    ] = useState<InvoiceDetails | null>(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    useEffect(() => {

        load();

    }, [id]);

    async function load() {

        setLoading(true);

        try {

            const data =
                await getInvoice(id);

            setInvoice(data);

        } finally {

            setLoading(false);

        }

    }

    return {

        invoice,

        loading,

    };

}