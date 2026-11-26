"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

/** Subtle pointer tilt (v3.1 why-cards / booking card), disabled for touch + reduced motion. */
export function Tilt({ children, className = "", max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`);
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform, transformStyle: "preserve-3d", transition: "transform 0.25s ease-out" }}
      onPointerMove={onMove}
      onPointerLeave={() => setTransform("")}
    >
      {children}
    </div>
  );
}
