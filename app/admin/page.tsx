"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AltraAdmin } from "@/components/ui/altra-admin";
import {
  AUTH_CHANGED_EVENT,
  getSession,
  signOut,
  touchSession,
  type DemoSession,
} from "@/lib/auth";

const settings = { workspaceName: "ALTRA", panelFrost: 12 };

/** Syncs the admin palette with the site theme (html.dark / data-theme). */
function useWorkspaceTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    const preferred = matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      if (html.classList.contains("dark") || html.dataset.theme === "dark") setDark(true);
      else if (html.classList.contains("light") || html.dataset.theme === "light") setDark(false);
      else setDark(preferred.matches);
    };
    const changes = new MutationObserver(update);
    changes.observe(html, { attributes: true, attributeFilter: ["class", "data-theme"] });
    preferred.addEventListener("change", update);
    update();
    return () => { changes.disconnect(); preferred.removeEventListener("change", update); };
  }, []);
  return dark;
}

export default function AdminPage() {
  const dark = useWorkspaceTheme();
  const router = useRouter();
  const [session, setSession] = useState<DemoSession | null>(null);
  const lastActivityCheck = useRef(0);

  const checkSession = useCallback(() => {
    const current = getSession();
    if (!current) {
      setSession(null);
      router.replace("/login");
      return;
    }
    setSession(current);
  }, [router]);

  useEffect(() => {
    checkSession();
    const activity = () => {
      const now = Date.now();
      if (now - lastActivityCheck.current < 15_000) return;
      lastActivityCheck.current = now;
      const current = touchSession(now);
      if (!current) {
        setSession(null);
        router.replace("/login");
      }
    };
    const timer = window.setInterval(checkSession, 15_000);
    const activityEvents: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "touchstart", "scroll"];
    activityEvents.forEach((event) => window.addEventListener(event, activity, { passive: true }));
    window.addEventListener(AUTH_CHANGED_EVENT, checkSession);
    window.addEventListener("storage", checkSession);
    return () => {
      window.clearInterval(timer);
      activityEvents.forEach((event) => window.removeEventListener(event, activity));
      window.removeEventListener(AUTH_CHANGED_EVENT, checkSession);
      window.removeEventListener("storage", checkSession);
    };
  }, [checkSession, router]);

  const handleLogout = () => {
    signOut();
    router.replace("/login");
  };

  if (!session) {
    return (
      <div className="grid min-h-svh place-items-center bg-background text-muted-foreground">
        <p className="text-sm">Checking sign-in…</p>
      </div>
    );
  }

  return (
    <AltraAdmin
      workspaceName={settings.workspaceName}
      panelFrost={settings.panelFrost}
      initialTheme={dark ? "dark" : "light"}
      role={session.role}
      userEmail={session.email}
      onLogout={handleLogout}
    />
  );
}
