import ThemeContext from "@/app/context/ThemeContext";
import { useContext } from "react";

interface Props {
  label: string;
  onClick?: () => void;
  onClose?: () => void;
  className?: string;
  selected?: boolean;
  qstPreview?: boolean;
}

function Chip({
  label,
  onClick,
  onClose,
  className = "",
  selected = false,
  qstPreview,
}: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${className} flex gap-3 decorative-border rounded-[30px] items-center w-max dark:text-slate-200 ${
        onClick ? "cursor-pointer" : ""
      } ${
        selected
          ? "bg-blue-300 dark:bg-neutral-950 dark:active:text-black"
          : onClick
          ? "hover:bg-slate-200 dark:hover:bg-primary"
          : qstPreview
          ? "bg-blue-400 hover:bg-blue-500 px-1 py-[2px]"
          : "bg-white dark:bg-neutral-950 px-3 py-1"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      <p className="whitespace-nowrap">{label}</p>
      {onClose ? (
        <div
          className="ico-close-outline w-5 h-5 cursor-pointer"
          onClick={onClose}
          style={{ filter: "brightness(0) invert(0.5)" }}
          onMouseEnter={(e) => {
            theme === "dark"
              ? (e.currentTarget.style.filter = "brightness(0) invert(1)")
              : (e.currentTarget.style.filter = "brightness(1) invert(0)");
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.classList.contains("dark")) {
              theme === "dark"
                ? (e.currentTarget.style.filter = "brightness(0) invert(1)")
                : (e.currentTarget.style.filter = "brightness(1) invert(0)");
              e.currentTarget.style.filter = "brightness(0) invert(0.7)";
            }
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Chip;
