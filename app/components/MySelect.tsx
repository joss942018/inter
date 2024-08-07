import Select from "react-select";
import ContInput, { TypeFieldType } from "./generic/ContInput";
import { useId, useState } from "react";
import { IValidacion } from "../hooks/useValidations";
import { TypeFi } from "./MyIcon";

interface Props {
  label?: string;
  disabled?: boolean;
  name: string;
  value: string | number;
  validacion?: IValidacion;
  onChange: (name: any, value: string | number) => void;
  options: { value: string | number; label: string }[];
  fieldType?: TypeFieldType;
  className?: string;
  placeholder?: string;
  icon?: TypeFi;
}

const MySelect = ({
  label,
  disabled = false,
  name,
  value,
  validacion,
  onChange,
  options,
  className = "",
  fieldType,
  placeholder,
  icon,
}: Props) => {
  const [focus, setFocus] = useState(false);
  const id = useId();

  return (
    <ContInput
      label={label}
      focus={focus}
      name={name}
      id={id}
      validacion={validacion}
      disabled={disabled}
      fieldType={fieldType}
      className={className}
      icon={icon}
    >
      <Select
        options={options}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => onChange(name, e?.value ?? 0)}
        value={options.find((el) => el.value == value) ?? null}
        placeholder={placeholder ?? ""}
        className="w-full"
        classNames={{
          option: (state) =>
            `!cursor-pointer !rounded-my-4
            ${
              state.isSelected
                ? "!bg-primary-500 dark:!bg-primary-800 !text-white"
                : state.isFocused
                ? "!bg-primary-100 dark:!bg-primary-600 !text-black dark:!text-white"
                : "!bg-transparent !text-neutral-900 dark:!text-neutral-100"
            }`,
          control: () => `!bg-transparent`,
          singleValue: () => `dark:!text-white`,
          menu: () => `!bg-white dark:!bg-neutral-800`,
          menuList: () => `!p-0 !my-scrollbar`,
        }}
        styles={{
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "white" : "black",
            backgroundColor: state.isSelected ? "#0F6FFF" : "white",
            padding: 10,
          }),
          control: (base) => ({
            ...base,
            border: 0,
            outline: 0,
            height: "41px",
            boxShadow: "none",
          }),
        }}
        isDisabled={disabled}
      />
    </ContInput>
  );
};

export default MySelect;
