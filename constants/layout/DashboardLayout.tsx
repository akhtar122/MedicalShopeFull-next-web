import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1">

        <Navbar />

        <div className="p-6">
          {children}
        </div>

      </main>

    </div>
  );
}