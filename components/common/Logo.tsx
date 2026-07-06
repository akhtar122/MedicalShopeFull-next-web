import { Pill } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 px-6 py-5">
      <div className="rounded-xl bg-blue-600 p-2 text-white">
        <Pill size={22} />
      </div>

      <div>
        <h1 className="font-bold text-lg">
          Medical ERP
        </h1>

        <p className="text-xs text-muted-foreground">
          Pharmacy Management
        </p>
      </div>
    </div>
  );
}