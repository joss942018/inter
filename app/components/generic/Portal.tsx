"use client";

import { type ReactPortal, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  elementId:
    | "navbar-start-portal"
    | "navbar-center-portal"
    | "navbar-end-portal"
    | "answers-portal-drawer-side"
    | "questions-portal-start"
    | "questions-portal-center"
    | "questions-portal-end"
    | "drawer-portal-action-buttons";
}

const Portal = ({ children, elementId }: Props): ReactPortal | null => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted
    ? createPortal(
        children,
        elementId && document.getElementById(elementId)
          ? document.getElementById(elementId)!
          : document.body
      )
    : null;
};

export default Portal;
