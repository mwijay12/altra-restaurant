/*
 * Altra admin demo session. This client-only gate is for the prototype UI,
 * not a substitute for server-verified authentication/authorization.
 */

export const AUTH_KEY = "altra-admin-auth";
export const AUTH_CHANGED_EVENT = "altra-auth-changed";
export const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes inactive
export const MAX_SESSION_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours absolute
const ACTIVITY_WRITE_INTERVAL_MS = 60 * 1000;

export type DemoRole = "owner" | "editor" | "viewer";
export type AdminView = "command" | "trends" | "metrics" | "operations" | "menu";

export interface DemoSession {
  email: string;
  role: DemoRole;
  createdAt: number;
  lastActivityAt: number;
}

export const roleLabels: Record<DemoRole, string> = {
  owner: "Owner",
  editor: "Menu editor",
  viewer: "Read only",
};

const rolePermissions: Record<DemoRole, AdminView[]> = {
  owner: ["command", "trends", "metrics", "operations", "menu"],
  editor: ["command", "operations", "menu"],
  viewer: ["command", "trends", "metrics"],
};

export function roleForEmail(email: string): DemoRole {
  const normalized = email.trim().toLowerCase();
  if (normalized === "owner@altra.tz" || normalized === "chef@altra.tz") return "owner";
  if (normalized === "editor@altra.tz") return "editor";
  return "viewer";
}

export function canAccessView(role: DemoRole, view: AdminView): boolean {
  return rolePermissions[role].includes(view);
}

function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AUTH_CHANGED_EVENT));
  }
}

function clearSession() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }
}

export function markSignedIn(email: string, role = roleForEmail(email)) {
  const now = Date.now();
  const session: DemoSession = {
    email: email.trim().toLowerCase(),
    role,
    createdAt: now,
    lastActivityAt: now,
  };
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }
  notifyAuthChanged();
  return session;
}

export function getSession(): DemoSession | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<DemoSession> & { at?: number };
    const now = Date.now();
    const createdAt = Number(value.createdAt ?? value.at ?? now);
    const lastActivityAt = Number(value.lastActivityAt ?? value.at ?? createdAt);
    if (
      !value.email ||
      !Number.isFinite(createdAt) ||
      !Number.isFinite(lastActivityAt) ||
      now - lastActivityAt >= IDLE_TIMEOUT_MS ||
      now - createdAt >= MAX_SESSION_AGE_MS
    ) {
      clearSession();
      notifyAuthChanged();
      return null;
    }
    const role: DemoRole = value.role === "owner" || value.role === "editor" || value.role === "viewer"
      ? value.role
      : roleForEmail(value.email);
    return { email: value.email, role, createdAt, lastActivityAt };
  } catch {
    clearSession();
    return null;
  }
}

export function isSignedIn(): boolean {
  return getSession() !== null;
}

/** Refresh the inactivity deadline, throttled to avoid a localStorage write per event. */
export function touchSession(now = Date.now()): DemoSession | null {
  const session = getSession();
  if (!session) return null;
  if (now - session.lastActivityAt < ACTIVITY_WRITE_INTERVAL_MS) return session;
  const refreshed = { ...session, lastActivityAt: now };
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(refreshed));
  } catch {
    // Keep the in-memory experience usable when storage is blocked.
  }
  return refreshed;
}

export function signOut() {
  clearSession();
  notifyAuthChanged();
}
