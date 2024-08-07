"use client";

import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  cantResults?: number;
  onClear?: () => void;
  showCantResults?: boolean;
  onEnter?: () => void;
  setSearchTerm: (term: string) => void;
  className?: string;
}

const SearchBarGeneric = ({
  cantResults,
  onClear,
  showCantResults = false,
  onEnter,
  setSearchTerm,
  className = "",
}: Props) => {
  const t = useTranslations("General");
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const borrarBusqueda = useCallback(() => {
    setTerminoBusqueda("");
    if (onClear) onClear();
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTerminoBusqueda(e.target.value);
  }, []);

  // keydown handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (onEnter) onEnter();
      }
    },
    [onEnter]
  );

  const handleBlur = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTerminoBusqueda(e.target.value.trim());
  }, []);

  useEffect(() => {
    setSearchTerm(terminoBusqueda);
  }, [terminoBusqueda]);

  return (
    <div
      className={`h-my-32 rounded-lg overflow-hidden
      transition-colors border border-transparent
      bg-neutral-100 dark:bg-neutral-700
      focus-within:bg-transparent dark:focus-within:bg-transparent focus-within:border-primary-600 dark:focus-within:border-primary_d flex flex-row items-center ${className} min-w-[240px]`}
    >
      <input
        className="h-full w-full outline-none px-3 bg-transparent"
        placeholder={t("search")}
        value={terminoBusqueda}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      {showCantResults && (
        <p className={`text-xs animar-entrada whitespace-nowrap mr-1`}>
          ({cantResults} {cantResults === 1 ? t("result") : t("results")})
        </p>
      )}
      {terminoBusqueda.length > 0 && (
        <div
          className={`ico-close-outline dark:invert-[0.8] h-6 w-6 mr-1 cursor-pointer`}
          onClick={borrarBusqueda}
        />
      )}
    </div>
  );
};

export default SearchBarGeneric;
