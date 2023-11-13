import React, { useEffect, useRef } from "react";

export function useHeaderStickyPosition() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      let headerEl: HTMLTableElement = ref.current!.querySelector("thead th")! as any as HTMLTableElement;
      const listener = (e: any) => {
        if (!headerEl) headerEl = ref.current!.querySelector("thead th")! as any as HTMLTableElement;
        const SCROLL_TOP = e.target.scrollTop;
        if (SCROLL_TOP > 0) {
          // ref.current!.appendChild(headerClone);
          // headerEl.style.position = "absolute";
          // headerEl.style.left = "0";
          // headerEl.style.top = SCROLL_TOP;
        } else {
          headerEl.style.position = "initial";
          headerEl.style.left = "0";
          headerEl.style.top = "0";
        }
      };
      ref.current.addEventListener("scroll", listener as any);
      return () => {
        document.removeEventListener("scroll", listener as any);
      };
    }
  }, []);
  return ref;
}
