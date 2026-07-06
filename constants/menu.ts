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
} from "lucide-react";

export const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Medicines",
    href: "/dashboard/medicines",
    icon: Pill,
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: FolderTree,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Suppliers",
    href: "/dashboard/suppliers",
    icon: Truck,
  },
  {
    title: "Purchases",
    href: "/dashboard/purchases",
    icon: ShoppingCart,
  },
  {
    title: "Invoices",
    href: "/dashboard/invoices",
    icon: Receipt,
  },
  {
    title: "Inventory",
    href: "/dashboard/inventory",
    icon: Boxes,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];