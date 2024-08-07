import { useState } from "react";
import ThemeMockup from "./themeselector/ThemeMockup";
import { useTranslations } from "next-intl";

const colors = [
  {
    id: 1,
    primaryColor: "#008fff",
    secondaryColor: "#fff",
    primaryDColor: "#45adff",
    secondaryDColor: "#1a2744",
  },
];

interface IProps {
  value?: number | null;
  onChange: (value: number) => void;
}

const ThemeSelector = ({ value, onChange }: IProps) => {
  const t = useTranslations("Surveys");

  return (
    <div className="grid grid-cols-2 gap-xs">
      {colors.map((el) => (
        <ThemeMockup
          key={el.id}
          selected={value === el.id}
          colors={el}
          onClick={() => onChange(el.id)}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
