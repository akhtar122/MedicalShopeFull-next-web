"use client";

import { useState } from "react";

import InventorySummary from "@/components/inventory/InventorySummary";
import InventoryTabs from "@/components/inventory/InventoryTabs";

import LowStockTable from "@/components/inventory/LowStockTable";
import ExpiryTable from "@/components/inventory/ExpiryTable";
import StockHistoryTable from "@/components/inventory/StockHistoryTable";
import AdjustStockButton from "@/components/inventory/AdjustStockButton";
import AdjustStockDialog from "@/components/inventory/AdjustStockDialog";

import { useInventory } from "@/hooks/useInventory";

export default function InventoryPage() {

    const {

        summary,

        lowStock,

        expiry,

        history,

        loading,

        refresh: refreshInventory,

    } = useInventory();
    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [tab, setTab] =
        useState("low");

    if (loading || !summary)
        return <div>Loading...</div>;

    function refresh(): void {
        refreshInventory();
    }

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-2xl font-bold">
                    Inventory
                </h1>

                <p className="text-gray-500">
                    Inventory Management
                </p>

            </div>

            <InventorySummary
                summary={summary}
            />

            <InventoryTabs
                value={tab}
                onChange={setTab}
            />
            <div className="flex justify-end">

                <AdjustStockButton
                    onClick={() => setDialogOpen(true)}
                />

            </div>
            {tab === "low" && (

                <LowStockTable
                    items={lowStock}
                />

            )}

            {tab === "expiry" && (

                <ExpiryTable
                    items={expiry}
                />

            )}

            {tab === "history" && (

                <StockHistoryTable
                    items={history}
                />

            )}
<AdjustStockDialog
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
  onSaved={refresh}
/>
        </div>

    );

}