"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { saveUser } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();

  const { mutate, isPending } = useLogin();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(
      {
        email,
        password,
      },
      {
        onSuccess(data) {
          saveUser(data);

          router.replace("/dashboard");
        },

        onError() {
          alert("Invalid Email or Password");
        },
      }
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
    >
      <h1 className="mb-8 text-center text-3xl font-bold">
        Medical ERP
      </h1>

      <div className="mb-5">
        <label className="mb-2 block">Email</label>

        <input
          className="w-full rounded-lg border p-3 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      </div>

      <div className="mb-8">
        <label className="mb-2 block">Password</label>

        <input
          type="password"
          className="w-full rounded-lg border p-3 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </div>

      <button
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white"
      >
        {isPending ? "Please wait..." : "Login"}
      </button>
    </form>
  );
}