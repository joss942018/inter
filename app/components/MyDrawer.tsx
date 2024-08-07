import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef } from "react";
import NavbarContext from "../context/NavbarContext";
import useSwipe from "../hooks/useSwipe";
import Animations from "../styles/animations";
import useWindowSize from "../hooks/useWindowSize";
import MyButton from "./MyButton";
import MyIcon, { TypeFi } from "@/app/components/MyIcon";

interface IFab {
  icon?: TypeFi;
  text?: string;
  onClick: () => void;
}

interface Props {
  firstCol: React.ReactNode;
  secondCol: React.ReactNode;
  thirdCol?: React.ReactNode;
  firstColOpen: boolean;
  thirdColOpen?: boolean;
  closeFirstCol: () => void;
  closeThirdCol?: () => void;
  fab?: IFab;
  breakpoint?: number;
}

export const MyDrawer = ({
  firstCol,
  secondCol,
  thirdCol,
  firstColOpen,
  thirdColOpen,
  closeFirstCol,
  closeThirdCol,
  fab,
  breakpoint = 1024,
}: Props) => {
  const { setMobilePortalsVisible } = useContext(NavbarContext);
  const { width } = useWindowSize();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { swipeDirection } = useSwipe({
    container: scrollRef,
  });

  useEffect(() => {
    setMobilePortalsVisible(swipeDirection === "up");
  }, [swipeDirection]);

  return (
    <div
      className={`w-full h-full relative lg:grid overflow-hidden
      ${thirdCol ? "grid-cols-[320px_1fr_320px]" : "grid-cols-[320px_1fr]"}`}
    >
      {/* FIRST COLUMN */}
      <motion.div
        layout
        className={`top-0 bottom-0 z-20 max-h-screen overflow-y-auto overflow-x-hidden my-scrollbar border-r decorative-border bg-white dark:bg-neutral-950
        ${firstColOpen ? "left-0" : "-left-full"}
        ${
          width && width < breakpoint
            ? "absolute lg:hidden w-80"
            : "hidden lg:block w-full"
        }
        `}
      >
        {firstCol}
      </motion.div>
      {!width ||
        (width && width < breakpoint && (
          <AnimatePresence>
            {firstColOpen && (
              <motion.div
                {...Animations.fadeOpacity}
                className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-neutral-950"
                onClick={closeFirstCol}
              />
            )}
          </AnimatePresence>
        ))}

      {/* SECOND COLUMN */}
      <div
        ref={scrollRef}
        className="relative h-screen w-full overflow-auto my-scrollbar"
      >
        {secondCol}
        {fab && (
          <div className="fixed bottom-my-12 left-1/2 -translate-x-1/2 rounded-full lg:hidden">
            <MyButton
              className="!rounded-full"
              onClick={fab.onClick}
              size="small"
            >
              {fab.icon && <MyIcon icon={fab.icon} />}
              {fab.text && <span>{fab.text}</span>}
            </MyButton>
          </div>
        )}
      </div>

      {/* THIRD COLUMN */}
      {thirdCol && (
        <>
          <motion.div
            layout
            className={`left-0 right-0 z-20 border-l decorative-border bg-white dark:bg-neutral-950 w-full overflow-hidden max-h-screen
              ${thirdColOpen ? "bottom-0" : "-bottom-full"}
              ${
                width && width < breakpoint
                  ? "absolute lg:hidden h-[75%] rounded-t-my-24"
                  : "hidden lg:flex h-full"
              }
              `}
          >
            <div className="flex h-full w-full overflow-y-auto overflow-x-hidden my-scrollbar">
              {thirdCol}
            </div>
          </motion.div>
          <AnimatePresence>
            {thirdColOpen && (
              <motion.div
                {...Animations.fadeOpacity}
                className="absolute z-[19] top-0 left-0 right-0 bottom-0 bg-neutral-950"
                onClick={closeThirdCol}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};
