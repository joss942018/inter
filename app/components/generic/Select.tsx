"use client";

import ContInput, { TypeFieldType } from "./ContInput";
import { IValidacion } from "../../../helpers/Validar";
import { useState, useEffect, useId, useRef } from "react";

interface Props {
  label: string;
  icono?: string;
  disabled?: boolean;
  name: string;
  value: string | number;
  validacion?: IValidacion;
  onChange: (name: any, value: string | number) => void;
  options: { value: string | number; label: string }[];
  initialLabel?: string;
  autoFocus?: boolean;
  searchable?: boolean;
  position?: "top" | "bottom";
  className?: string;
  fieldType?: TypeFieldType;
}

const Select = ({
  label,
  disabled = false,
  name,
  value,
  validacion,
  onChange,
  options,
  searchable = false,
  position = "bottom",
  className = "",
  fieldType,
}: Props) => {
  const [focus, setFocus] = useState(false);
  const id = useId();
  const [openMenu, setOpenMenu] = useState(false);
  const refCont = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<typeof options>([]);

  const handleChange = (value: string | number) => {
    onChange(name, isNaN(Number(value)) ? value : Number(value));
    setFocus(false);
    setOpenMenu(false);
  };

  useEffect(() => {
    if (searchable) {
      setSearchTerm(options.find((el) => el.value === value)?.label ?? "");
    }
  }, [value]);

  const handleFocus = () => {
    if (!focus) setFocus(true);
    if (!openMenu) setOpenMenu(true);
  };

  const handleClear = () => {
    onChange(name, 0);
    refInput?.current?.focus();
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (refCont.current && !refCont.current.contains(e.target)) {
        setOpenMenu(false);
        setFocus(false);
        const coincidencia = options.find((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (searchTerm.length > 0 && Number(value) === 0) {
          if (coincidencia) {
            setSearchTerm(coincidencia.label);
            onChange(name, Number(coincidencia.value));
          } else {
            setSearchTerm("");
          }
        }
        if (Number(value) !== 0 && searchable) {
          setSearchTerm(
            options.find((el) => el.value.toString() === value.toString())
              ?.label ?? ""
          );
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openMenu, focus, searchTerm, value, options, searchable]);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  const [valueHighlighted, setValueHighlighted] = useState(0);
  useEffect(() => {
    if (searchTerm.length > 0) {
      const coincidencia = options.find((el) =>
        el.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (coincidencia) {
        setValueHighlighted(Number(coincidencia.value));
      }
    } else {
      setValueHighlighted(0);
    }
  }, [searchTerm]);

  return (
    <div ref={refCont} className={className}>
      <ContInput
        label={label}
        focus={focus}
        name={name}
        id={id}
        validacion={validacion}
        disabled={disabled}
        onClick={searchable ? () => {} : handleFocus}
        fieldType={fieldType}
        className={className}
      >
        <div className="flex items-center h-full">
          <div className="flex flex-row w-full h-full items-center relative">
            <div className="flex flex-row w-full h-full items-center pl-3 rounded-xl">
              {searchable ? (
                <>
                  <input
                    ref={refInput}
                    className="w-full h-full focus:outline-none bg-transparent text-black dark:text-white"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    onFocus={handleFocus}
                    id={id}
                  />
                  {(searchTerm.length > 0 || Number(value) !== 0) && (
                    <div
                      className="ico-close-outline invert-[0.5] hover:invert-[0.3] dark:hover:invert-[0.7] h-6 w-6 mr-2 cursor-pointer"
                      onClick={handleClear}
                    />
                  )}
                </>
              ) : (
                <p className="text-black dark:text-white">
                  {options.find((el) => el.value == value)?.label}
                </p>
              )}
            </div>
            {openMenu && (
              <ul
                className={`${
                  position === "top" ? "bottom-full" : "top-full"
                } my-3 absolute z-10 shadow-xl dark-shadow bg-white
              w-full max-h-80 overflow-y-auto overflow-x-hidden rounded-xl flex flex-col border decorative-border
              dark:bg-neutral-950
              my-scrollbar`}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map((el, i) => (
                      <li
                        key={i}
                        className={`p-2 cursor-pointer hover:bg-light dark:text-white dark:hover:bg-medium_d dark:active:bg-dark_d
                      ${
                        el.value == value
                          ? "p-2 bg-light text-left text-black dark:bg-medium_d" // option selected
                          : valueHighlighted == el.value
                          ? "bg-green-100 dark:bg-dark_d"
                          : ""
                      }
                      `}
                        onClick={() => handleChange(el.value)}
                      >
                        {el.label}
                      </li>
                    ))
                ) : (
                  <p>-</p>
                )}
              </ul>
            )}
          </div>

          {/* arrow */}
          <div
            className={`ico-chevron-down-outline w-s h-s mr-xs invert-[0.5] ${
              openMenu ? "rotate-180" : ""
            } transition-transform`}
          />
        </div>
      </ContInput>
    </div>
  );
};

export default Select;
