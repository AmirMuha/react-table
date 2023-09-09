import React, { useEffect, useRef } from "react";

interface ClickAwayListenerProps {
  onClickAway: () => void;
}

function ClickAwayListener({ children, onClickAway }: React.PropsWithChildren<ClickAwayListenerProps>): React.ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClickAway();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickAway]);

  return <div ref={containerRef}>{children}</div>;
}

export default ClickAwayListener;
