"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../common/Logo";
import { menu } from "@/constants/menu";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-72 border-r bg-white flex-col">

      <Logo />

      <nav className="flex-1 px-4 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              )}
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}