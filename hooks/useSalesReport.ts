"use client";

import { useEffect, useState } from "react";

import { getSalesReport } from "@/services/report.service";

import { SalesReportItem } from "@/types/report";

export function useSalesReport() {

    const [

        invoices,

        setInvoices,

    ] = useState<SalesReportItem[]>([]);

    const [

        loading,

        setLoading,

    ] = useState(true);

    useEffect(() => {

        load();

    }, []);

    async function load() {

        setLoading(true);

        try {

            const data =

                await getSalesReport();

            setInvoices(data);

        }

        finally {

            setLoading(false);

        }

    }

    return {

        invoices,

        loading,

        refresh: load,

    };

}