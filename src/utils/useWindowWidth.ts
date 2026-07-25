import { useEffect, useState } from "react";
import { getWindowWidth } from "./getWindowWidth";

export function useWindowWidth(fallback = 1200): number {
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const handleResize = () => setWidth(getWindowWidth(fallback));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fallback]);

  return width;
}
