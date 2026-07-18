"use client";

import { useEffect, useState } from "react";

import {
    getInventorySummary,
    getLowStock,
    getExpiry,
    getStockHistory,
} from "@/services/inventory.service";

export function useInventory() {

    const [summary, setSummary] = useState<any>();

    const [lowStock, setLowStock] = useState<any[]>([]);

    const [expiry, setExpiry] = useState<any[]>([]);

    const [history, setHistory] = useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    async function load() {

        setLoading(true);

        try {

            const [

                summary,

                low,

                expiry,

                history,

            ] = await Promise.all([

                getInventorySummary(),

                getLowStock(),

                getExpiry(),

                getStockHistory(),

            ]);

            setSummary(summary);

            setLowStock(low);

            setExpiry(expiry);

            setHistory(history);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        load();

    }, []);

    return {

        summary,

        lowStock,

        expiry,

        history,

        loading,

        refresh: load,

    };

}