"use client";

import { usePathname } from "next/navigation";
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
 * browser behaviour. Renders a plain <a> so Next.js prefetch still applies.
 */
export function TransitionLink({ href, children, className, onClick, ariaLabel }: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (!isInternal) {
    return (
      <a href={href} className={className} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

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
    <a href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </a>
  );
}
