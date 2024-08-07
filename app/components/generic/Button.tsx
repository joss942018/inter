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
  level?: 1 | 2 | 3 | 4;
  className?: string;
  tooltip?: string;
}

const Button = ({
  label,
  icono,
  onClick,
  disabled = false,
  type = "button",
  loading = false,
  level = 1,
  className = "",
  tooltip,
}: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && onClick) {
      onClick();
      e.preventDefault();
    }
  };

  return (
    <MyTooltip text={tooltip} position="bottom">
      <button
        className={`
        relative flex flex-row items-center h-9 rounded-xl
        ${className}
        ${disabled ? "" : "hover:brightness-105 focus:brightness-95"}
        ${disabled ? "text-gray-500" : ""}
        ${
          level === 4
            ? "px-0"
            : icono && !label && level === 3
            ? "px-2"
            : "px-6"
        }
        ${level === 4 ? "gap-1" : "gap-3"}
        ${disabled ? "cursor-default" : "cursor-pointer"}
        ${
          loading
            ? "bg-transparent"
            : disabled
            ? level === 1
              ? "bg-lightest dark:bg-dark_d"
              : level === 2
              ? "bg-lightest dark:bg-dark_d"
              : level === 3
              ? "bg-lightest dark:bg-dark_d"
              : "bg-transparent"
            : level === 1
            ? "bg-lightest dark:bg-dark_d"
            : level === 2
            ? "bg-primary dark:bg-primary_d"
            : level === 3
            ? "bg-lightest dark:bg-dark_d"
            : "bg-transparent"
        }
        `}
        onClick={disabled ? () => {} : handleClick}
        type={type}
        disabled={disabled}
      >
        {icono && (
          <div
            className={`${loading ? "invisible" : ""} ${
              level === 4 && !label ? "h-6 w-6" : "h-5 w-5"
            } ${styles.ico} ${icono} ${disabled ? styles.disabled : ""} ${
              level === 1
                ? styles.lvl1
                : level === 2
                ? styles.lvl2
                : level === 3
                ? styles.lvl3
                : styles.lvl4
            }`}
          />
        )}
        {label && (
          <span
            className={`${loading ? "invisible" : ""}
              `}
          >
            {label}
          </span>
        )}
        {loading && (
          <div className={styles.contLoader}>
            <Loader />
          </div>
        )}
      </button>
    </MyTooltip>
  );
};

export default Button;
