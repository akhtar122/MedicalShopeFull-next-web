"use client";

import { useEffect, useState,} from "react";

import {

    getInventorySummary,

    getInventoryLowStock,

} from "@/services/report.service";

import {

    InventorySummary,

    LowStockReportItem,

} from "@/types/report";

export function useInventoryReport() {

    const [

        summary,

        setSummary,

    ] = useState<InventorySummary | null>(null);

    const [

        items,

        setItems,

    ] = useState<LowStockReportItem[]>([]);

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

            const [

                summaryData,

                lowStock,

            ] = await Promise.all([

                getInventorySummary(),

                getInventoryLowStock(),

            ]);

            setSummary(summaryData);

            setItems(lowStock);

        }

        finally {

            setLoading(false);

        }

    }

    return {

        summary,

        items,

        loading,

        refresh: load,

    };

}