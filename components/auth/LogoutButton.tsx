"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-red-600 transition hover:bg-red-50"
    >
      <LogOut size={18} />
      <span className="hidden md:block">Logout</span>
    </button>
  );
}