import { usePermissions } from "@/hooks/usePermissions";
import {
  Home,
  Pill,
  FolderTree,
  Users,
  Truck,
  ShoppingCart,
  Receipt,
  Boxes,
  BarChart3,
  Settings,
  LayoutDashboard,
} from "lucide-react";
const permission = usePermissions();
export const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: "canViewDashboard",
  },
  {
    title: "Medicines",
    href: "/dashboard/medicines",
    icon: Pill,
    permission: "canViewMedicines",
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: FolderTree,
    permission: "canViewCategories",
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
    permission: "canViewCustomers",
  },
  {
    title: "Suppliers",
    href: "/dashboard/suppliers",
    icon: Truck,
    permission: "canViewSuppliers",
  },
  {
    title: "Purchases",
    href: "/dashboard/purchases",
    icon: ShoppingCart,
    permission: "canViewPurchases",
  },
  {
    title: "Invoices",
    href: "/dashboard/invoices",
    icon: Receipt,
    permission: "canViewInvoices",
  },
  {
    title: "Inventory",
    href: "/dashboard/inventory",
    icon: Boxes,
    permission: "canViewInventory",
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
    permission: "canViewReports",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    permission: "canViewSettings",
  },
] as const;