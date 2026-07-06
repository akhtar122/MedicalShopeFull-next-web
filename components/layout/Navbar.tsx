"use client";

import { Bell, Search } from "lucide-react";
import { getUser } from "@/lib/auth";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  const user = getUser();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">

      <h2 className="text-lg font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <Search className="cursor-pointer" />

        <Bell className="cursor-pointer" />

        <div className="hidden text-right md:block">
          <p className="text-sm font-semibold">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500 capitalize">
            {user?.role}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <LogoutButton />

      </div>

    </header>
  );
}