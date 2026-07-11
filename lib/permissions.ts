import { getUser } from "@/lib/auth";

export interface Permission {
  canViewDashboard: boolean;
  canViewCategories: boolean;
  canViewCustomers: boolean;
  canViewMedicines: boolean;
  canViewPurchases: boolean;
  canViewSuppliers: boolean;
  canViewInvoices: boolean;
  canViewInventory: boolean;
  canViewReports: boolean;
  canViewSettings: boolean;
}

export function getPermissions(): Permission {
  const user = getUser();

  if (!user) {
    return {
      canViewDashboard: false,
      canViewCategories: false,
      canViewCustomers: false,
      canViewMedicines: false,
      canViewPurchases: false,
      canViewSuppliers: false,
      canViewInvoices: false,
      canViewInventory: false,
      canViewReports: false,
      canViewSettings: false,
    };
  }

  const role = user.role.toLowerCase();

  return {
    // Accountant + Admin
    canViewDashboard:
      role === "admin" || role === "accountant",

    canViewReports:
      role === "admin" || role === "accountant",

    // Staff + Admin
    canViewCategories:
      role === "admin" || role === "staff",

    canViewCustomers:
      role === "admin" || role === "staff",

    canViewMedicines:
      role === "admin" || role === "staff",

    canViewPurchases:
      role === "admin" || role === "staff",

    canViewSuppliers:
      role === "admin" || role === "staff",

    canViewInvoices:
      role === "admin" || role === "staff",

    canViewInventory:
      role === "admin" || role ==="staff",

    canViewSettings:
      role === "admin" || role === "staff",
  };
}