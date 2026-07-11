"use client";

import { getUser } from "@/lib/auth";
import { getPermissions } from "@/lib/permissions";

export function usePermissions() {
  return getPermissions();
}
//   const user = getUser();

//   const role = user?.role ?? "";

//   return {
//     role,

//     canViewDashboard:
//       getPermissions().canViewDashboard,

//     canViewReports:
//       Permissions.reports.includes(role as never),

//     canViewMedicines:
//       Permissions.medicines.includes(role as never),

//     canViewInventory:
//       Permissions.inventory.includes(role as never),

//     canViewInvoices:
//       Permissions.invoices.includes(role as never),

//     canViewPurchases:
//       Permissions.purchases.includes(role as never),

//     canViewCustomers:
//       Permissions.customers.includes(role as never),

//     canViewSuppliers:
//       Permissions.suppliers.includes(role as never),

//     canViewCategories:
//       Permissions.categories.includes(role as never),

//     canViewSettings:
//       Permissions.settings.includes(role as never),
//   };
// }