"use client";

import { IValidacion } from "../../../helpers/Validar";
import { useState, useEffect, useRef } from "react";
import ContInput, { TypeFieldType } from "./ContInput";
import { EmojiClickData } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

interface Props {
  label?: string;
  disabled?: boolean;
  type?: "email" | "password" | "tel" | "text" | "time" | "url" | "number";
  name: string;
  value: string;
  validacion?: IValidacion;
  onChange: (name: any, value: string) => void;
  onEnter?: (name: any, value: string) => void;
  autoFocus?: boolean;
  icono?: string;
  textArea?: boolean;
  emojiSelector?: boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  fieldType?: TypeFieldType;
  placeholder?: string;
}

const Input = ({
  label,
  disabled = false,
  type = "text",
  name,
  value,
  validacion,
  onChange,
  onEnter,
  autoFocus = false,
  textArea = false,
  emojiSelector = false,
  className = "",
  min,
  max,
  step,
  fieldType,
  placeholder = "",
}: Props) => {
  const [focus, setFocus] = useState(autoFocus);
  const [showPassword, setShowPassword] = useState(false);

  // emoji
  const [emojiOpened, setEmojiOpened] = useState(false);
  const emojiButtonRef = useRef<HTMLDivElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const refInput = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.name, e.target.value);
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFocus(false);
    if (value !== e.target.value)
      onChange(e.target.name, e.target.value.trim());
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && onEnter) {
      onEnter(e.currentTarget.name, e.currentTarget.value);
    }
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFocus(true);
  };

  // ______________________________________________________________________________
  // emoji

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setEmojiOpened(false); // Close the emoji picker only if clicked outside it
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEmojiOpened(false); // Close the emoji picker on "ESC" key press
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress); // Listen for "ESC" key press
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Add emoji
  const handleEmojiClick = (e: EmojiClickData) => {
    const sym = e.unified.split("_");
    const codeArray: number[] = [];
    sym.forEach((el) => codeArray.push(parseInt("0x" + el, 16)));
    const emoji = String.fromCodePoint(...codeArray);

    const cursorPosition = refInput.current?.selectionStart ?? 0;
    const value0 = refInput.current?.value ?? "";
    const newValue =
      value0.slice(0, cursorPosition) + emoji + value0.slice(cursorPosition);
    onChange(name, newValue);
    refInput.current?.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
    refInput.current?.focus();
  };

  const handleToggleEmojiPicker = () => {
    setEmojiOpened((prevEmoji) => !prevEmoji); // Toggle the emoji state
  };

  // Calculate the position of the emoji picker
  const calculateEmojiPickerPosition = () => {
    if (emojiButtonRef.current) {
      const emojiButtonRect = emojiButtonRef.current.getBoundingClientRect();
      const emojiPickerWidth = 295;
      const emojiPickerHeight = 345;

      const leftPosition = emojiButtonRect.left - emojiPickerWidth;

      const topPosition = emojiButtonRect.bottom + window.scrollY;

      return {
        left: leftPosition,
        top: topPosition,
      };
    }

    return {};
  };

  return (
    <>
      <ContInput
        name={name}
        label={label}
        validacion={validacion}
        focus={focus}
        disabled={disabled}
        textArea={textArea}
        className={className}
        fieldType={fieldType}
      >
        {emojiSelector && (
          <div
            onClick={handleToggleEmojiPicker}
            className="absolute right-xs bottom-xs cursor-pointer ml-1 hover:invert-[0.3] dark:hover:invert-[0.7] z-10"
            ref={emojiButtonRef}
          >
            <div className="flex items-center justify-center">
              <BsEmojiSmile className="text-gray-400 dark:text-gray-300 text-xl" />
            </div>
          </div>
        )}

        {type === "password" && (
          <div
            className={`absolute right-0 z-10 bg-transparent
          ${showPassword ? "ico-eye-off-outline" : "ico-eye-outline"}
          h-10 w-10 p-2 cursor-pointer invert-[0.5] hover:invert-[0.3] dark:hover:invert-[0.7]`}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}

        {textArea ? (
          <textarea
            ref={refInput as React.Ref<HTMLTextAreaElement>}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            autoFocus={autoFocus}
            onFocus={handleFocus}
            className="w-full h-full bg-transparent outline-none resize-none p-3 text-black dark:text-white overflow-y-auto my-scrollbar rounded-lg overflow-hidden"
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={refInput as React.Ref<HTMLInputElement>}
            id={name}
            type={type === "password" && showPassword ? "text" : type}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            autoFocus={autoFocus}
            onFocus={handleFocus}
            className="w-full h-full outline-none text-black dark:text-white rounded-lg px-xs bg-transparent"
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
          />
        )}
      </ContInput>

      {/* emoji */}
      {emojiOpened && (
        <div
          ref={emojiPickerRef}
          className="absolute"
          style={{
            position: "absolute",
            zIndex: 9999,
            ...calculateEmojiPickerPosition(),
          }}
        >
          <EmojiPicker
            searchDisabled
            previewConfig={{ showPreview: false }}
            onEmojiClick={handleEmojiClick}
            lazyLoadEmojis
            //@ts-ignore
            // categories={["suggested"]}
          />
        </div>
      )}
    </>
  );
};

export default Input;
