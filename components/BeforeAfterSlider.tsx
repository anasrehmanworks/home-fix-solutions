"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

/**
 * Draggable before/after slider, ported from the approved v3.1 design.
 * Two matched full-frame photos: the "after" layer is clipped by the drag
 * position over the "before" layer. Labels live in containers clipped to
 * their own side and fade out when that side is nearly covered.
 */
export function BeforeAfterSlider({
  before,
  after,
  title,
  description
}: {
  before: string;
  after: string;
  title: string;
  description: string;
}) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  const beforeLabelOpacity = pos < 14 ? Math.max(0, (pos - 4) / 10) : 1;
  const afterLabelOpacity = pos > 86 ? Math.max(0, (94 - pos) / 8) : 1;

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-smoke shadow-lift">
      <div
        ref={trackRef}
        className="ba aspect-[4/3]"
        role="slider"
        aria-label={`${title} before and after comparison`}
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 4));
        }}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <div className="ba-layer ba-before" style={{ backgroundImage: `url(${before})` }} />
        <div
          className="ba-layer ba-after"
          style={{ backgroundImage: `url(${after})`, clipPath: `inset(0 0 0 ${pos}%)` }}
        />
        {/* labels clipped to their own side */}
        <div className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <span className="ba-tag" style={{ left: 12, opacity: beforeLabelOpacity }}>
            Before
          </span>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 overflow-hidden" style={{ width: `${100 - pos}%` }}>
          <span className="ba-tag" style={{ right: 12, opacity: afterLabelOpacity }}>
            After
          </span>
        </div>
        {/* handle */}
        <div className="absolute inset-y-0 z-[3] w-[3px] -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]" style={{ left: `${pos}%` }} />
        <div
          className="absolute top-1/2 z-[3] grid h-[42px] w-[42px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-night shadow-lift"
          style={{ left: `${pos}%` }}
        >
          <ChevronsLeftRight size={20} />
        </div>
        <input
          type="range"
          min={2}
          max={98}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 z-[4] h-full w-full cursor-ew-resize opacity-0"
          aria-label={`Adjust ${title} comparison`}
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black text-white">{title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-slate-300">{description}</p>
        <p className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-slate-400">
          <ChevronsLeftRight size={13} /> Drag to compare
        </p>
      </div>
    </article>
  );
}
