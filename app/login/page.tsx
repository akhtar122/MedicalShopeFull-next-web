"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, isTokenExpired } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (token && !isTokenExpired()) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <LoginForm />
    </main>
  );
}