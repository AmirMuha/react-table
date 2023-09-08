import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

export default function ArrowNarrowUp(props: IconProps): React.ReactElement {
  return (
    <svg
      fill={props.color ?? "none"}
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox={`0 0 ${props.width ?? 24} ${props.height ?? 24}`}
      strokeWidth={props.strokeWidth ?? 1}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill={props.color ?? "none"} />
      <path d="M12 5l0 14" />
      <path d="M16 9l-4 -4" />
      <path d="M8 9l4 -4" />
    </svg>
  );
}
