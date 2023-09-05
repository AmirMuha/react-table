import { colorVariables } from "common/constant/color-variables";
import { useLayoutEffect } from "react";
import { TableProps } from "types";
import { alpha } from "common/helper/alpha";

export default function useSetupTableEffect<T>(props: TableProps<T>) {
  useLayoutEffect(() => {
    if (props.color) handleChangeColor(props.color);
  }, [props.color]);
}

function handleChangeColor(color: string) {
  document.body.style.setProperty(colorVariables.color, color);
  document.body.style.setProperty(colorVariables.hover, alpha(color, 0.15));
  document.body.style.setProperty(colorVariables.selected, alpha(color, 0.4));
  document.body.style.setProperty(colorVariables.resizeHandle, "white");
}
