import { ReactNode } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthGuard from "@/components/auth/AuthGuard";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}