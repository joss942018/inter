"use client";

import Loader from "./Loader";
import styles from "./Button.module.css";
import MyTooltip from "../MyTooltip";

interface Props {
  label?: string;
  icono?: string;
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const FAB = ({
  label,
  icono,
  onClick,
  disabled = false,
  type = "button",
  loading = false,
  className = "",
  position,
}: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && onClick) {
      onClick();
      e.preventDefault();
    }
  };

  return (
    <div
      className={`
        ${
          position
            ? `fixed rounded-full z-20
            ${
              position === "top-left"
                ? "top-3 left-3"
                : position === "top-right"
                ? "top-3 right-3"
                : position === "bottom-left"
                ? "bottom-3 left-3"
                : "bottom-3 right-3"
            }
        `
            : "relative rounded-xl"
        }
    `}
    >
      <MyTooltip text={label} position="bottom">
        <button
          className={`
        flex flex-row items-center h-14 w-14 justify-center rounded-full shadow-xl
        ${className}
        ${disabled ? "" : "hover:brightness-105 focus:brightness-95"}
        ${disabled ? "text-gray-500" : ""}
        ${disabled ? "cursor-default" : "cursor-pointer"}
        ${
          disabled
            ? "bg-gray-200 dark:bg-gray-600 dark:text-gray-400 font-semibold"
            : "bg-primary text-white dark:bg-primary_d dark:text-black font-semibold"
        }
        `}
          onClick={disabled ? () => {} : handleClick}
          type={type}
          disabled={disabled}
        >
          {loading ? (
            <div className={"m-auto"}>
              <Loader />
            </div>
          ) : (
            icono && (
              <div
                className={`w-6 h-6 invert-[1]
            ${loading ? "invisible" : ""}
            ${styles.ico} ${icono} ${disabled ? styles.disabled : ""}
            `}
              />
            )
          )}
        </button>
      </MyTooltip>
    </div>
  );
};

export default FAB;
