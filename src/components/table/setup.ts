import { useLayoutEffect, useRef } from "react";
import { ColorSettings, TableProps } from "types";
import { alpha } from "common/helper/alpha";
import { atom, useAtom } from "jotai";
import { colorVariables } from "common/constant/color-variables";

export const colorSettings = atom<ColorSettings>({
  fontSize: "14px",
  color: "rgb(198,61,47)",
  hover: "rgba(198,61,47,0.15)",
  selected: "rgba(198,61,47,0.4)",
  focus: "rgba(198,61,47,0.3)",
  zebra: "rgba(198,61,47,0.02)",
  resizeHandle: "white",
});

export default function useSetupTableEffect<T>({ atom, store }: TableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [color] = useAtom(atom.color, { store });
  const [fontSize] = useAtom(atom.fontSize, { store });
  const [, setColorSEttings] = useAtom(colorSettings, { store });

  useLayoutEffect(() => {
    if (color) {
      if (containerRef.current) {
        if (fontSize) containerRef.current.style.setProperty(colorVariables.fontSize, fontSize);
        containerRef.current.style.setProperty(colorVariables.color, color);
        containerRef.current.style.setProperty(colorVariables.hover, alpha(color, 0.15));
        containerRef.current.style.setProperty(colorVariables.focus, alpha(color, 0.3));
        containerRef.current.style.setProperty(colorVariables.selected, alpha(color, 0.4));
        containerRef.current.style.setProperty(colorVariables.zebra, alpha(color, 0.02));
        containerRef.current.style.setProperty(colorVariables.resizeHandle, "white");
      }
      setColorSEttings({
        color,
        fontSize: fontSize ?? "14px",
        hover: alpha(color, 0.15),
        selected: alpha(color, 0.4),
        focus: alpha(color, 0.3),
        zebra: alpha(color, 0.02),
        resizeHandle: "white",
      });
    }
  }, [color]);

  return { containerRef };
}
