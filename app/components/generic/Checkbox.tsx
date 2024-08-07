"use client";

import { useCallback, useId } from "react";

interface Props {
  label?: string;
  value: boolean;
  onChange: (name: any, value: boolean) => void;
  name: string;
  className?: string;
  partiallySelected?: boolean;
}

function Checkbox({
  label,
  value,
  onChange,
  name,
  className = "",
  partiallySelected,
}: Props) {
  const id = useId();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(name, e.target.checked);
    },
    [onChange, name]
  );

  return (
    <div className={`${className} flex flex-row gap-x-2 items-center relative`}>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={handleChange}
        className="checkbox peer"
      />
      {partiallySelected ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
          stroke="currentColor"
          className="absolute w-my-12 h-my-12 ml-my-4 hidden peer-checked:block text-white pointer-events-none"
        >
          <line x1="0" y1="12" x2="24" y2="12" stroke-width="4" />
        </svg>
      ) : (
        <svg
          className="absolute w-my-12 h-my-12 ml-my-4 hidden peer-checked:block text-white pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
          stroke="currentColor"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.42z" />
        </svg>
      )}
      {label && (
        <label
          htmlFor={id}
          className="cursor-pointer flex-1 text-left text-black dark:text-white"
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default Checkbox;
