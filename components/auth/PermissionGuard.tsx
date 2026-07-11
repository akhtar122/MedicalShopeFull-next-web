"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "@/lib/auth";

interface Props {
  roles: string[];
  children: React.ReactNode;
}

export default function PermissionGuard({
  roles,
  children,
}: Props) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!roles.includes(user.role)) {
      router.replace("/dashboard");
    }
  }, [roles, router]);

  return <>{children}</>;
}