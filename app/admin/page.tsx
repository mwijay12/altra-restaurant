"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AltraAdmin } from "@/components/ui/altra-admin";
import { isSignedIn } from "@/lib/auth";

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
  const [allowed, setAllowed] = useState(false);

  // Demo gate: /admin requires a (demo) sign-in from /login.
  useEffect(() => {
    if (isSignedIn()) {
      setAllowed(true);
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (!allowed) {
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
    />
  );
}
