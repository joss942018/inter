import Animations from "@/app/styles/animations";
import { TypeRatingQuestion } from "@/types/TypesDB";
import { motion } from "framer-motion";
import { useState } from "react";
import SmileBase, { TypeValuesEmoji } from "./SmileBase";
import { Rating } from "@mantine/core";
import { useTranslations } from "next-intl";

interface IProps {
  from?: number;
  to?: number;
  value?: number;
  onChange?: (value: number) => void;
  type?: TypeRatingQuestion;
}

const RatingBase = ({
  from = 1,
  to = 5,
  value,
  onChange,
  type = "num",
}: IProps) => {
  const t = useTranslations("SRSurvey");
  const [hovered, setHovered] = useState(from - 1);

  const mapFromTo = (value: number): number => {
    const rango = to - from;
    const normalizedValue = (value - to) / (to - from);
    const scaledValue = Math.round(normalizedValue * rango + 1);
    return scaledValue;
  };

  if (type === "emoji")
    return (
      <SmileBase
        value={value as TypeValuesEmoji}
        onChange={onChange as (value: TypeValuesEmoji) => void}
      />
    );

  if (type === "stars")
    return (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <p className="text-4xl font-semibold">{value}</p>
            <p className="secondary-text flex items-center gap-3 text-lg">
              Rating
              <span className="mt-1 text-sm">
              ({t("from")} {from}
            </span>
              <span className="mt-1 text-sm">
              {t("to")} {to})
            </span>
            </p>
          </div>
          <Rating
              size={"xl"}
              count={to - from + 1}
              value={
                value !== undefined && value !== null
                    ? value
                    : undefined
              }
              onChange={onChange && ((e) => onChange(e))}
          />
        </div>
    );

  return (
    <motion.div {...Animations.slideForward} className="flex flex-wrap">
      {Array.from({ length: to - from + 1 }, (_, i) => i + from).map((el) => (
        <button
          key={el}
          className={`decorative-border h-my-48 w-my-48 !rounded-none border font-semibold text-black first:!rounded-l-my-8 last:!rounded-r-my-8 dark:text-white
            ${el < to ? "border-r-0" : ""}
            ${
              el <= (value ?? from - 1) && hovered <= from - 1
                ? "bg-yellow-400"
                : ""
            }
            ${el <= hovered ? "bg-yellow-300 hover:bg-yellow-300" : ""}
            `}
          onClick={onChange ? () => onChange(el) : () => {}}
          onMouseEnter={() => setHovered(el)}
          onMouseLeave={() => setHovered(from - 1)}
        >
          {el}
        </button>
      ))}
    </motion.div>
  );
};

export default RatingBase;
