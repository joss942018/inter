import { useRef, useEffect } from "react";

interface Props {
  children: React.ReactNode;
  active: boolean;
  setActive: (active: boolean) => void;
  position?: "top" | "bottom";
}

function Popper({ children, active, setActive, position = "top" }: Props) {
  const refCont = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (refCont.current && !refCont.current.contains(e.target) && active) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [active, setActive]);

  return (
    <div
      ref={refCont}
      className={`absolute
      ${active ? "visible" : "hidden"}
      ${position === "bottom" ? "top-full" : "bottom-full"}
      w-72 bg-white shadow-xl rounded-xl p-4 z-50 right-0 border-[1px] border-gray-200 dark:border-gray-400 dark:bg-neutral-950 dark:text-slate-200`}
    >
      {children}
    </div>
  );
}

export default Popper;
