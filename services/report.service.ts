import api from "@/lib/axios";

import {
    PurchaseReportItem,
    SalesReportItem,
    InventorySummary,
    LowStockReportItem,
    ExpiryReportItem,
    StockHistoryReportItem
} from "@/types/report";

export async function getSalesReport() {

    const { data } = await api.get<SalesReportItem[]>(

        "/api/invoices"

    );

    return data;

}
export async function getPurchaseReport() {
    const { data } = await api.get<PurchaseReportItem[]>(
        "/api/purchases"
    );

    return data;
}
export async function getInventorySummary() {

    const { data } =
        await api.get<InventorySummary>(

            "/api/inventory/current-stock"

        );

    return data;

}

export async function getInventoryLowStock() {

    const { data } =
        await api.get<LowStockReportItem[]>(

            "/api/inventory/low-stock"

        );

    return data;

}
export async function getExpiryReport(
    daysAhead = 30
) {
    const { data } =
        await api.get<ExpiryReportItem[]>(
            `/api/inventory/expiry?daysAhead=${daysAhead}`
        );

    return data;
}

export async function getStockHistoryReport() {

    const { data } =
        await api.get<StockHistoryReportItem[]>(

            "/api/inventory/stock-history"

        );

    return data;

}