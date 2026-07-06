import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">

      <h2 className="font-semibold text-lg">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <Search className="cursor-pointer" />

        <Bell className="cursor-pointer" />

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          A
        </div>

      </div>
    </header>
  );
}