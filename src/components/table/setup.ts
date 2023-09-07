import { colorVariables } from "common/constant/color-variables";
import { useLayoutEffect } from "react";
import { TableProps } from "types";
import { alpha } from "common/helper/alpha";
import { useAtom } from "jotai";

export default function useSetupTableEffect<T>({ atom }: TableProps<T>) {
  const [color] = useAtom(atom.color);
  useLayoutEffect(() => {
    if (color) handleChangeColor(color);
  }, [color]);
}

function handleChangeColor(color: string) {
  document.body.style.setProperty(colorVariables.color, color);
  document.body.style.setProperty(colorVariables.hover, alpha(color, 0.15));
  document.body.style.setProperty(colorVariables.selected, alpha(color, 0.4));
  document.body.style.setProperty(colorVariables.focus, alpha(color, 0.3));
  document.body.style.setProperty(colorVariables.resizeHandle, "white");
}
