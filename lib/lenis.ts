import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function setLenis(lenis?: Lenis) {
  if (typeof window !== "undefined") {
    window.__lenis = lenis;
  }
}

export function getLenis() {
  return typeof window !== "undefined" ? window.__lenis : undefined;
}
