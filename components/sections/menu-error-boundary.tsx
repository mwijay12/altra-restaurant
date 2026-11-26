"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { MENU_KEY } from "@/lib/menu-store";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Keep a broken browser-only menu override from taking down the whole route. */
export class MenuErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Menu failed to render", error, info.componentStack);
  }

  private resetMenu = () => {
    try {
      window.localStorage.removeItem(MENU_KEY);
    } catch {
      // Reload with the bundled menu even if browser storage is unavailable.
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="mx-auto flex min-h-[65svh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Menu preview</p>
          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">We couldn’t load the menu.</h1>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Your saved demo menu may be out of date. Reset it to load Altra’s default dishes.
          </p>
          <button
            type="button"
            onClick={this.resetMenu}
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Reset menu and try again
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}
