import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
// @ts-ignore: Navbar file may not be recognized as a module by the TS compiler
import Navbar from "@/components/layout/Navbar";

interface Props {
  children: ReactNode;
}

// function Sidebar() {
//   return <div className="w-64 bg-white shadow" />;
// }

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