import { jwtDecode } from "jwt-decode";
import { LoginResponse } from "@/types/auth";

const LOGIN_TIME_KEY = "login_time";
const SESSION_TIMEOUT = 30 * 60 * 1000;

const TOKEN_KEY = "token";
const USER_KEY = "user";

interface JwtPayload {
  exp: number;
}

export function saveUser(data: LoginResponse) {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data));
  localStorage.setItem(LOGIN_TIME_KEY, Date.now().toString());
}

export function getToken() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(LOGIN_TIME_KEY);
}

export function isTokenExpired() {
  if (typeof window === "undefined") return true;

  const token = getToken();
  if (!token) return true;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp) {
      return decoded.exp * 1000 <= Date.now();
    }
  } catch {
    return true;
  }

  return true;
}