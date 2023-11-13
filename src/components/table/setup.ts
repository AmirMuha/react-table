import { useLayoutEffect } from "react";
import { ColorSettings, TableProps } from "types";
import { alpha } from "common/helper/alpha";
import { atom, useAtom } from "jotai";

export const colorSettings = atom<ColorSettings>({
  color: "rgb(198,61,47)",
  hover: "rgba(198,61,47,0.15)",
  selected: "rgba(198,61,47,0.4)",
  focus: "rgba(198,61,47,0.3)",
  zebra: "rgba(198,61,47,0.02)",
  resizeHandle: "white",
});

export default function useSetupTableEffect<T>({ atom, store }: TableProps<T>) {
  const [color] = useAtom(atom.color, { store });
  const [, setColorSEttings] = useAtom(colorSettings, { store });
  useLayoutEffect(() => {
    if (color) {
      setColorSEttings({
        color,
        hover: alpha(color, 0.15),
        selected: alpha(color, 0.4),
        focus: alpha(color, 0.3),
        zebra: alpha(color, 0.02),
        resizeHandle: "white",
      });
    }
  }, [color]);
}
