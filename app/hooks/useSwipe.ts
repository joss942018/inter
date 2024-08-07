import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

interface Props {
  container?: React.RefObject<HTMLDivElement>;
  sensibility?: number;
}

const useSwipe = ({ container, sensibility }: Props) => {
  const [swipeDirection, setSwipeDirection] = useState<"up" | "down">("up");
  const latestYValue = useRef(0);
  const { scrollY } = useScroll(container ? { container } : undefined);

  useMotionValueEvent(scrollY, "change", (y) => {
    const maxDiff = Math.abs(y - latestYValue.current);
    if (maxDiff < 20) return;

    if (y + (sensibility ?? 0) > latestYValue.current && y > 20) {
      if (swipeDirection !== "down") setSwipeDirection("down");
    } else {
      if (swipeDirection !== "up") setSwipeDirection("up");
    }
    latestYValue.current = y;
  });

  return { swipeDirection };
};

export default useSwipe;
