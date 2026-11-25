/* ─────────────────────────────────────────────────────────────
   Altra · demo auth (localStorage)
   Swap for a real provider (NextAuth / Supabase / Firebase) later.
   ───────────────────────────────────────────────────────────── */

export const AUTH_KEY = "altra-admin-auth";

export interface DemoSession {
  email: string;
  at: number;
}

export function markSignedIn(email: string) {
  try {
    const session: DemoSession = { email, at: Date.now() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  } catch {
    /* private mode */
  }
}

export function getSession(): DemoSession | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as DemoSession) : null;
  } catch {
    return null;
  }
}

export function isSignedIn(): boolean {
  return getSession() !== null;
}

export function signOut() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {
    /* private mode */
  }
}
