"use client";

import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { usePageTransition } from "./transition-context";

export interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
}

/**
 * <a>-based link that plays the orange curtain wipe before an internal
 * navigation. External URLs and modifier-clicks fall through to default
 * browser behaviour. Internal routes are prefetched on intent to keep the
 * short SVG wipe from waiting on a cold route.
 */
export function TransitionLink({ href, children, className, onClick, ariaLabel }: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();
  const router = useRouter();
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (!isInternal) {
    return (
      <a href={href} className={className} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  const prefetchPage = () => router.prefetch(href);

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (pathname !== href) {
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
      onPointerEnter={prefetchPage}
      onPointerDown={prefetchPage}
      onFocus={prefetchPage}
    >
      {children}
    </a>
  );
}
