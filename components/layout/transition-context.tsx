"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

/**
 * Client-side page transitions for the Next.js App Router.
 *
 * Barba.js targets classic multi-page sites and conflicts with the App
 * Router's client-side navigation, so we reproduce the same full-screen
 * orange curtain wipe with Framer Motion + router.push().
 */
const TransitionContext = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionContextProvider({
  children,
  navigate,
}: {
  children: ReactNode;
  navigate: (href: string) => void;
}) {
  const value = useMemo(() => ({ navigate }), [navigate]);
  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
}
