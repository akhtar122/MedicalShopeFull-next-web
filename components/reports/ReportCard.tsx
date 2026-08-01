"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export default function ReportCard({
  title,
  description,
  href,
  icon: Icon,
}: Props) {
  return (
    <Link
      href={href}
      className="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        <Icon size={28} />
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
    </Link>
  );
}