import { LoginRequest, LoginResponse } from "@/types/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const url = API_BASE.endsWith("/api")
    ? `${API_BASE}/auth/login`
    : `${API_BASE}/api/auth/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error(text || "Login failed");
  }

  return response.json() as Promise<LoginResponse>;
};