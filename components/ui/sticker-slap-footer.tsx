"use client";

import * as React from "react";
import { ArrowDownRight, ArrowUpRight, Check, Flame, Mail, MapPin, Sparkles, X } from "lucide-react";
import { TransitionLink } from "@/components/layout/transition-link";

export type FoodStickerKind = "chipsi" | "samosa" | "chai" | "mandazi" | "mishkaki";

export interface FoodSticker {
  kind: FoodStickerKind;
  label?: string;
  x?: number;
  y?: number;
  rotate?: number;
}

export interface StickerSlapFooterProps {
  wordmark?: string;
  homeHref?: string;
  menuHref?: string;
  email?: string;
  address?: string;
  paper?: string;
  panel?: string;
  accent?: string;
  height?: string;
  stickers?: FoodSticker[];
  onStickerMove?: (index: number, x: number, y: number) => void;
  className?: string;
}

const defaultStickers: FoodSticker[] = [
  { kind: "chipsi", label: "CHIPSI MAYAI", x: 8, y: 56, rotate: -13 },
  { kind: "samosa", label: "SAMOSA CLUB", x: 27, y: 30, rotate: 11 },
  { kind: "chai", label: "CHAI TIME", x: 48, y: 70, rotate: -8 },
  { kind: "mandazi", label: "MANDAZI", x: 72, y: 31, rotate: 12 },
  { kind: "mishkaki", label: "MISHKAKI", x: 92, y: 58, rotate: -9 },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function FoodStickerArt({ kind }: { kind: FoodStickerKind }) {
  switch (kind) {
    case "chipsi":
      return (
        <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
          <path d="M34 51 29 95q31 15 62 0l-5-44Z" fill="#f05a32" />
          <path d="m39 53 1-27q1-6 6-4l6 32m2-1 1-35q1-6 6-5l5 39m3 1 6-32q1-6 6-4l2 38m4 0 9-25q2-5 6-2l-8 29" fill="none" stroke="#ffd34f" strokeWidth="10" strokeLinecap="round" />
          <path d="M37 72q23 11 48 0" fill="none" stroke="#fff8f0" strokeWidth="4" strokeLinecap="round" opacity=".9" />
          <circle cx="46" cy="83" r="3" fill="#1a1a1a" /><circle cx="61" cy="87" r="3" fill="#1a1a1a" /><circle cx="76" cy="82" r="3" fill="#1a1a1a" />
        </svg>
      );
    case "samosa":
      return (
        <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
          <path d="M59 17Q62 15 65 20L104 86Q108 94 99 97L24 96Q15 95 20 86Z" fill="#d97724" />
          <path d="M59 25 29 84q-2 4 3 5l59 1q6 0 3-5Z" fill="#f5b543" />
          <path d="M58 37q7 9 1 18t2 20" fill="none" stroke="#fff1c5" strokeWidth="4" strokeLinecap="round" />
          <path d="M24 101q36 8 72-1" fill="none" stroke="#d45728" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "chai":
      return (
        <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
          <path d="M28 53h58v30q0 17-17 17H45Q28 100 28 83Z" fill="#fff8f0" />
          <path d="M85 59h8q15 0 12 14t-19 12" fill="none" stroke="#fff8f0" strokeWidth="9" strokeLinecap="round" />
          <path d="M33 62h48v21q0 11-12 11H45Q33 94 33 83Z" fill="#9d4420" />
          <path d="M42 43q-8-10 0-19m17 19q-8-10 0-19m17 19q-8-10 0-19" fill="none" stroke="#fff3d6" strokeWidth="5" strokeLinecap="round" />
          <path d="M26 104h70" stroke="#f2bb4f" strokeWidth="7" strokeLinecap="round" />
        </svg>
      );
    case "mandazi":
      return (
        <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
          <path d="M24 70Q18 45 42 37q9-22 32-10 27 1 26 28 20 18 1 36-19 20-40 7-24 16-39-5Q8 78 24 70Z" fill="#d88a37" />
          <path d="M31 66Q28 49 45 44q7-15 25-8 18 0 19 20 13 13 1 25-13 13-29 6-17 11-27-4-12-8-3-17Z" fill="#f7c978" />
          <path d="M43 50q8-8 16-5m17 3q8 3 10 11m-46 25q15 9 31 3" fill="none" stroke="#fff1cf" strokeWidth="4" strokeLinecap="round" />
          <circle cx="38" cy="70" r="2.5" fill="#a65d2b" /><circle cx="77" cy="40" r="2.5" fill="#a65d2b" /><circle cx="83" cy="81" r="2.5" fill="#a65d2b" />
        </svg>
      );
    case "mishkaki":
    default:
      return (
        <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
          <path d="M25 92 94 27" stroke="#f0d5a1" strokeWidth="7" strokeLinecap="round" />
          <path d="m36 78 10-10 12 10-10 10Zm18-17 10-10 12 10-10 10Zm18-17 10-10 12 10-10 10Z" fill="#9e3d1f" stroke="#6c281a" strokeWidth="3" strokeLinejoin="round" />
          <path d="m38 77 8-8 8 8-8 8Zm18-17 8-8 8 8-8 8Z" fill="#f27a32" />
          <path d="M23 94q-6 5-9 0" fill="none" stroke="#f0d5a1" strokeWidth="5" strokeLinecap="round" />
          <path d="m87 28 8-7" stroke="#fff0c5" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
  }
}

function StickerSlap({ sticker, index, stageRef, onMove, styleIndex }: {
  sticker: FoodSticker;
  index: number;
  stageRef: React.RefObject<HTMLDivElement | null>;
  onMove: (index: number, x: number, y: number) => void;
  styleIndex: number;
}) {
  const [position, setPosition] = React.useState({ x: sticker.x ?? 50, y: sticker.y ?? 50 });
  const [dragging, setDragging] = React.useState(false);
  const start = React.useRef<{ pointerId: number; x: number; y: number; left: number; top: number } | null>(null);
  const angle = sticker.rotate ?? 0;

  const move = (event: React.PointerEvent<HTMLButtonElement>) => {
    const origin = start.current;
    const box = stageRef.current?.getBoundingClientRect();
    if (!origin || !box || origin.pointerId !== event.pointerId) return;
    const next = {
      x: clamp(origin.left + ((event.clientX - origin.x) / box.width) * 100, 4, 96),
      y: clamp(origin.top + ((event.clientY - origin.y) / box.height) * 100, 8, 92),
    };
    setPosition(next);
  };

  const finish = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!start.current || start.current.pointerId !== event.pointerId) return;
    start.current = null;
    setDragging(false);
    onMove(index, position.x, position.y);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 5 : 2;
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step],
    };
    if (delta[event.key]) {
      event.preventDefault();
      const next = {
        x: clamp(position.x + delta[event.key][0], 4, 96),
        y: clamp(position.y + delta[event.key][1], 8, 92),
      };
      setPosition(next);
      onMove(index, next.x, next.y);
    } else if (event.key === "Home" || event.key === "Escape") {
      event.preventDefault();
      setPosition({ x: sticker.x ?? 50, y: sticker.y ?? 50 });
      onMove(index, sticker.x ?? 50, sticker.y ?? 50);
    }
  };

  return (
    <button
      type="button"
      className={`asf-sticker asf-sticker-${styleIndex}${dragging ? " is-dragging" : ""}`}
      aria-label={`${sticker.label ?? sticker.kind + " sticker"}. Drag to move; use arrow keys to nudge; press Home to reset.`}
      title="Drag me around · double-click to reset"
      style={{ left: `${position.x}%`, top: `${position.y}%`, "--rotate": `${angle}deg`, "--i": styleIndex } as React.CSSProperties}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        start.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, left: position.x, top: position.y };
        setDragging(true);
      }}
      onPointerMove={move}
      onPointerUp={finish}
      onPointerCancel={finish}
      onDoubleClick={() => {
        const home = { x: sticker.x ?? 50, y: sticker.y ?? 50 };
        setPosition(home);
        onMove(index, home.x, home.y);
      }}
      onKeyDown={onKeyDown}
    >
      <span className="asf-sticker-art"><FoodStickerArt kind={sticker.kind} /></span>
      <span className="asf-sticker-label">{sticker.label ?? sticker.kind}</span>
    </button>
  );
}

const css = `
.asf{--paper:var(--asf-paper,#fff8f0);--panel:var(--asf-panel,#ff5c00);--ink:#1a1a1a;--cream:#fff8f0;--accent:var(--asf-accent,#ffd6c0);position:relative;width:100%;overflow:hidden;overflow:clip;box-sizing:border-box;padding:10px;background:var(--paper);color:var(--ink);font-family:var(--font-sans),Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.asf *,.asf *::before,.asf *::after{box-sizing:border-box}
.asf a{color:inherit;text-decoration:none}.asf button{font:inherit;color:inherit}.asf-card{position:relative;isolation:isolate;display:flex;min-height:var(--asf-height,82svh);flex-direction:column;overflow:hidden;border-radius:clamp(22px,3vw,42px);background:var(--panel);color:var(--cream);padding:clamp(22px,4.4vw,62px);box-shadow:0 18px 60px rgba(58,32,12,.1)}
.asf-grain{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.16;background-image:radial-gradient(rgba(255,248,240,.7) .65px,transparent .65px);background-size:7px 7px;mask-image:linear-gradient(120deg,#000 0%,transparent 72%)}
.asf-top{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px}.asf-brand{display:inline-flex;align-items:center;gap:9px;width:max-content;font-size:clamp(19px,2vw,27px);font-weight:900;letter-spacing:-.06em}.asf-brand-mark{display:grid;width:35px;height:35px;place-items:center;border-radius:12px;background:var(--cream);color:var(--panel);transform:rotate(-7deg);transition:transform .35s cubic-bezier(.2,1.5,.3,1)}.asf-brand:hover .asf-brand-mark{transform:rotate(8deg) scale(1.08)}.asf-brand-mark svg{width:19px;height:19px}.asf-top-note{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;opacity:.8}.asf-top-link{justify-self:end;display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,248,240,.45);border-radius:999px;padding:10px 15px;font-size:13px;font-weight:800;transition:background .2s,color .2s,transform .3s}.asf-top-link:hover{background:var(--cream);color:var(--panel);transform:translateY(-2px)}
.asf-intro{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:28px;margin:clamp(42px,8vh,92px) 0 clamp(32px,5vh,54px)}.asf-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:900;letter-spacing:.17em;text-transform:uppercase}.asf-eyebrow svg{width:15px;height:15px}.asf-title{max-width:770px;margin:14px 0 0;font-family:var(--font-display),Georgia,serif;font-size:clamp(38px,6vw,82px);font-weight:800;line-height:.98;letter-spacing:-.055em}.asf-title span{color:var(--ink)}.asf-intro-copy{max-width:290px;margin:0 0 4px;font-size:14px;line-height:1.65;opacity:.88}
.asf-cols{display:grid;grid-template-columns:1.1fr 1fr 1fr;gap:clamp(20px,4vw,58px);padding:clamp(22px,3vw,36px) 0;border-top:1px solid rgba(255,248,240,.34);border-bottom:1px solid rgba(255,248,240,.34)}.asf-col{min-width:0}.asf-tag{display:inline-block;margin:0 0 17px;border-radius:999px;background:var(--cream);color:var(--ink);padding:6px 11px 7px;font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.asf-links{display:grid;gap:9px}.asf-link{display:inline-flex;width:max-content;max-width:100%;align-items:center;gap:6px;font-size:clamp(14px,1.35vw,17px);font-weight:750;letter-spacing:-.02em;transition:opacity .2s,transform .25s}.asf-link:hover{opacity:.76;transform:translateX(3px)}.asf-link svg{width:13px;height:13px;flex:0 0 auto}.asf-email{display:inline-flex;align-items:center;gap:8px;border:0;background:transparent;padding:0;font-size:clamp(14px,1.35vw,17px);font-weight:800;cursor:pointer}.asf-email:hover{color:var(--accent)}.asf-email svg{width:16px;height:16px}.asf-email-status{min-height:18px;margin-top:8px;font-size:11px;opacity:.8}.asf-address{display:flex;align-items:flex-start;gap:8px;margin:0 0 12px;font-size:14px;line-height:1.55}.asf-address svg{width:16px;height:16px;flex:0 0 auto;margin-top:2px}
.asf-stage{position:relative;isolation:isolate;flex:1;min-height:clamp(180px,27vw,340px);margin-top:auto;overflow:visible}.asf-wordmark-button{position:absolute;inset:auto 0 -8% 0;display:block;width:100%;border:0;background:transparent;padding:0;cursor:pointer;text-align:center;line-height:.78}.asf-wordmark{display:inline-block;color:var(--cream);font-family:var(--font-display),Georgia,serif;font-size:clamp(122px,31vw,390px);font-style:italic;font-weight:900;letter-spacing:-.105em;line-height:.76;white-space:nowrap;transform-origin:50% 80%;clip-path:inset(0 0 0 0);transition:color .2s}.asf-wordmark-button:hover .asf-wordmark{color:#ffe6d8}.asf-wordmark-button.replay .asf-wordmark{animation:asf-write .9s cubic-bezier(.55,.1,.35,1) both}.asf-dot{color:var(--ink)}.asf-stage-hint{position:absolute;z-index:4;left:50%;bottom:7px;display:flex;align-items:center;gap:7px;transform:translateX(-50%);font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;opacity:.8}.asf-stage-hint svg{width:13px;height:13px}
.asf-sticker{position:absolute;z-index:3;display:flex;flex-direction:column;align-items:center;gap:3px;width:clamp(50px,6vw,82px);border:0;background:transparent;padding:0;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;transform:translate(-50%,-50%) rotate(var(--rotate,0deg));transition:filter .22s,transform .35s cubic-bezier(.2,1.4,.3,1)}.asf-sticker:hover{z-index:8;filter:drop-shadow(0 10px 10px rgba(36,20,10,.25));transform:translate(-50%,-56%) rotate(0deg) scale(1.08)}.asf-sticker:active,.asf-sticker.is-dragging{z-index:10;cursor:grabbing;filter:drop-shadow(0 14px 12px rgba(36,20,10,.28));transform:translate(-50%,-62%) rotate(0deg) scale(1.1);transition:none}.asf-sticker-art{display:grid;width:100%;aspect-ratio:1;place-items:center;overflow:visible;border:4px solid var(--paper);border-radius:32% 40% 35% 42%;background:var(--paper);box-shadow:0 5px 0 rgba(26,26,26,.12);transform:rotate(-4deg)}.asf-sticker:nth-of-type(even) .asf-sticker-art{border-radius:44% 30% 40% 34%;transform:rotate(5deg)}.asf-sticker-art svg{width:86%;height:86%;overflow:visible}.asf-sticker-label{display:inline-block;max-width:120px;border:2px solid var(--ink);border-radius:999px;background:var(--cream);color:var(--ink);padding:3px 6px 4px;font-size:clamp(7px,.65vw,9px);font-weight:1000;letter-spacing:.06em;line-height:1;white-space:nowrap;box-shadow:0 2px 0 rgba(26,26,26,.14)}.asf-sticker:focus-visible,.asf-top-link:focus-visible,.asf-link:focus-visible,.asf-email:focus-visible,.asf-credit-button:focus-visible{outline:3px solid var(--cream);outline-offset:4px}
.asf-bottom{position:relative;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:8px;font-size:11px;opacity:.84}.asf-bottom-links{display:flex;flex-wrap:wrap;gap:14px}.asf-bottom a{text-decoration:underline;text-decoration-color:rgba(255,248,240,.35);text-underline-offset:3px}.asf-credits{position:relative}.asf-credit-button{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,248,240,.35);border-radius:999px;background:transparent;padding:6px 10px;font-size:11px;font-weight:800;cursor:pointer}.asf-credit-button svg{width:13px;height:13px}.asf-credit-pop{position:absolute;right:0;bottom:calc(100% + 9px);z-index:10;width:220px;border:1px solid rgba(26,26,26,.1);border-radius:16px;background:var(--paper);color:var(--ink);padding:14px;box-shadow:0 16px 40px rgba(26,26,26,.22);animation:asf-pop .28s cubic-bezier(.2,1.4,.3,1)}.asf-credit-pop strong{display:block;font-size:12px}.asf-credit-pop p{margin:5px 0 0;font-size:11px;line-height:1.5;opacity:.72}
.asf.is-in .asf-card{animation:asf-enter .75s cubic-bezier(.2,.9,.25,1) both}.asf.is-in .asf-col{animation:asf-rise .65s cubic-bezier(.2,.9,.25,1) both}.asf.is-in .asf-col:nth-child(2){animation-delay:.08s}.asf.is-in .asf-col:nth-child(3){animation-delay:.16s}.asf.is-in .asf-sticker{animation:asf-slap .68s cubic-bezier(.2,1.5,.35,1) both;animation-delay:calc(.3s + var(--i,0) * .09s)}
@keyframes asf-enter{from{opacity:.92;clip-path:inset(10% 5% 0 round 44px);transform:translateY(24px) scale(.97)}to{opacity:1;clip-path:inset(0 round 0);transform:none}}@keyframes asf-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@keyframes asf-slap{0%{opacity:0;transform:translate(-50%,-50%) rotate(24deg) scale(1.8)}58%{opacity:1;transform:translate(-50%,-50%) rotate(-5deg) scale(.88)}80%{transform:translate(-50%,-50%) rotate(3deg) scale(1.06)}100%{opacity:1;transform:translate(-50%,-50%) rotate(var(--rotate,0deg)) scale(1)}}@keyframes asf-write{0%{clip-path:inset(0 100% 0 0);transform:scale(.96)}100%{clip-path:inset(0 0 0 0);transform:scale(1)}}@keyframes asf-pop{from{opacity:0;transform:translateY(8px) scale(.86)}}
@media(max-width:760px){.asf{padding:6px}.asf-card{min-height:max(790px,88svh);padding:22px 18px 14px;border-radius:24px}.asf-top{grid-template-columns:1fr auto}.asf-top-note{display:none}.asf-intro{grid-template-columns:1fr;gap:14px;margin:44px 0 28px}.asf-title{font-size:clamp(42px,12vw,66px)}.asf-intro-copy{max-width:440px;font-size:13px}.asf-cols{grid-template-columns:1fr 1fr;gap:22px 14px;padding:22px 0}.asf-col:first-child{grid-column:1/-1}.asf-tag{margin-bottom:11px}.asf-stage{min-height:250px;margin: auto -8px 4px}.asf-wordmark{font-size:clamp(126px,37vw,220px)}.asf-sticker{width:clamp(47px,13vw,68px)}.asf-sticker-label{font-size:7px}.asf-sticker-1{top:21%!important}.asf-sticker-2{top:72%!important}.asf-sticker-3{top:24%!important}.asf-sticker-4{top:68%!important}.asf-bottom{align-items:flex-start;flex-wrap:wrap;margin-top:8px;font-size:10px}.asf-bottom-links{gap:10px}}
@media(max-width:390px){.asf-cols{grid-template-columns:1fr}.asf-col:first-child{grid-column:auto}.asf-stage{min-height:220px}.asf-sticker{width:48px}.asf-wordmark{font-size:35vw}.asf-sticker-label{max-width:78px;font-size:6px;padding:3px 4px}}
@media(prefers-reduced-motion:reduce){.asf *,.asf *::before,.asf *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
`;

export default function StickerSlapFooter({
  wordmark = "Altra",
  homeHref = "/",
  menuHref = "/menu",
  email = "hello@altra.co.tz",
  address = "Dar es Salaam, Tanzania",
  paper = "#fff8f0",
  panel = "#ff5c00",
  accent = "#ffd6c0",
  height = "82svh",
  stickers = defaultStickers,
  onStickerMove = () => undefined,
  className = "",
}: StickerSlapFooterProps) {
  const [seen, setSeen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [creditsOpen, setCreditsOpen] = React.useState(false);
  const [replay, setReplay] = React.useState(0);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const footerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const element = footerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  React.useEffect(() => {
    if (!creditsOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCreditsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [creditsOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const style = {
    "--asf-paper": paper,
    "--asf-panel": panel,
    "--asf-accent": accent,
    "--asf-height": height,
  } as React.CSSProperties;

  return (
    <footer ref={footerRef} className={`asf${seen ? " is-in" : ""}${className ? ` ${className}` : ""}`} style={style}>
      <style>{css}</style>
      <div className="asf-card">
        <div className="asf-grain" aria-hidden="true" />
        <header className="asf-top">
          <TransitionLink href={homeHref} className="asf-brand" ariaLabel="Altra home">
            <span className="asf-brand-mark"><Flame fill="currentColor" aria-hidden="true" /></span>
            <span>{wordmark}<span style={{ color: "var(--asf-accent)" }}>.</span></span>
          </TransitionLink>
          <span className="asf-top-note">Made with a little heat · Dar es Salaam</span>
          <TransitionLink href={menuHref} className="asf-top-link">
            See the menu <ArrowUpRight aria-hidden="true" />
          </TransitionLink>
        </header>

        <div className="asf-intro">
          <div>
            <div className="asf-eyebrow"><Sparkles aria-hidden="true" /> Good food, good company</div>
            <h2 className="asf-title">A little heat.<br />A lot of <span>heart.</span></h2>
          </div>
          <p className="asf-intro-copy">From the first chai to the last mishkaki, Dar tastes better when we share it.</p>
        </div>

        <div className="asf-cols">
          <section className="asf-col">
            <h3 className="asf-tag">Take a look</h3>
            <nav className="asf-links" aria-label="Explore Altra">
              <TransitionLink className="asf-link" href="/menu">The menu <ArrowUpRight aria-hidden="true" /></TransitionLink>
              <TransitionLink className="asf-link" href="/about">Our story <ArrowUpRight aria-hidden="true" /></TransitionLink>
              <TransitionLink className="asf-link" href="/help">FAQs <ArrowUpRight aria-hidden="true" /></TransitionLink>
            </nav>
          </section>
          <section className="asf-col">
            <h3 className="asf-tag">Find us</h3>
            <p className="asf-address"><MapPin aria-hidden="true" />{address}</p>
            <TransitionLink className="asf-link" href="/contact">Contact Altra <ArrowUpRight aria-hidden="true" /></TransitionLink>
          </section>
          <section className="asf-col">
            <h3 className="asf-tag">Say hello</h3>
            <button type="button" className="asf-email" onClick={copyEmail} title="Copy email address">
              {copied ? <Check aria-hidden="true" /> : <Mail aria-hidden="true" />}
              {copied ? "Copied — asante!" : email}
            </button>
            <p className="asf-email-status" role="status">{copied ? "Email copied to clipboard." : "Tap to copy our email."}</p>
          </section>
        </div>

        <div ref={stageRef} className="asf-stage" aria-label="Move the food stickers around the Altra wordmark">
          <button
            key={replay}
            type="button"
            className={`asf-wordmark-button${replay ? " replay" : ""}`}
            onClick={() => setReplay((count) => count + 1)}
            aria-label={`Write ${wordmark} again`}
          >
            <span className="asf-wordmark">{wordmark}<span className="asf-dot">.</span></span>
          </button>
          {stickers.map((sticker, index) => (
            <StickerSlap
              key={`${sticker.kind}-${index}`}
              sticker={sticker}
              index={index}
              stageRef={stageRef}
              onMove={onStickerMove}
              styleIndex={index}
            />
          ))}
          <span className="asf-stage-hint"><ArrowDownRight aria-hidden="true" /> Drag the snacks · double-click to reset</span>
        </div>

        <div className="asf-bottom">
          <p>© {new Date().getFullYear()} Altra · Dar es Salaam, Tanzania. <span>Prototype — ordering is not live yet.</span></p>
          <nav className="asf-bottom-links" aria-label="Legal information">
            <TransitionLink href="/delivery">Delivery info</TransitionLink>
            <TransitionLink href="/privacy">Privacy</TransitionLink>
            <TransitionLink href="/terms">Terms</TransitionLink>
            <TransitionLink href="/accessibility">Accessibility</TransitionLink>
          </nav>
          <div className="asf-credits">
            {creditsOpen && <div className="asf-credit-pop" role="dialog" aria-label="Footer credits"><strong>Altra, drawn with flavour.</strong><p>Food stickers are illustrated in code. Built for Dar, with a little heat and a lot of heart.</p></div>}
            <button className="asf-credit-button" type="button" aria-expanded={creditsOpen} onClick={() => setCreditsOpen((open) => !open)}>
              {creditsOpen ? <X aria-hidden="true" /> : <Sparkles aria-hidden="true" />} Credits
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
