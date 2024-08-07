"use client";

import Animations from "@/app/styles/animations";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  active?: boolean;
  close?: () => void;
  children: React.ReactNode;
  zIndex?: number;
  title?: string;
  backgroundClickDisabled?: boolean;
}

const Modal = ({
  active = false,
  close,
  children,
  zIndex = 100,
  title,
  backgroundClickDisabled = false,
}: Props) => {
  return (
    <AnimatePresence>
      {active && (
        <>
          <motion.div
            {...Animations.modal}
            style={{ zIndex }}
            className={`card rounded-lg min-w-[300px] fixed max-h-[100dvh]`}
          >
            <div className="flex justify-between items-center mb-xs">
              {title ? (
                <p className="text-start text-heading4">{title}</p>
              ) : (
                <span />
              )}
              {close && (
                <div
                  className="ico-close-outline w-6 h-6 cursor-pointer left-auto invert-[0.3] hover:invert-0 dark:invert-[0.7] dark:hover:invert-[1]"
                  onClick={close}
                />
              )}
            </div>
            <div className="overflow-y-auto max-h-[calc(100dvh_-_59px)]">
              <div>{children}</div>
            </div>
          </motion.div>
          <motion.div
            {...Animations.fadeOpacity}
            style={{ zIndex: zIndex - 10 }}
            className={`bg-neutral-500 fixed top-0 left-0 right-0 bottom-0 w-dvw h-dvh`}
            onClick={backgroundClickDisabled ? () => {} : close}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
