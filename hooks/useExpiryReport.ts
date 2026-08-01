"use client";

import { useEffect, useState } from "react";

import { getExpiryReport } from "@/services/report.service";

import { ExpiryReportItem } from "@/types/report";

export function useExpiryReport() {

    const [
        items,
        setItems,
    ] = useState<ExpiryReportItem[]>([]);

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
                await getExpiryReport();

            setItems(data);

        }

        finally {

            setLoading(false);

        }

    }

    return {

        items,

        loading,

        refresh: load,

    };

}