import Animations from "@/app/styles/animations";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useContext } from "react";
import EmojiSelector from "../../EmojiSelector";

export type TypeValuesEmoji = 1 | 2 | 3 | 4 | 5 | null;

interface IProps {
  value?: TypeValuesEmoji;
  onChange?: (value: TypeValuesEmoji) => void;
  centered?: boolean;
}

const SmileBase = ({ value, onChange, centered = false }: IProps) => {
  const t = useTranslations("SRSurvey");

  const getEmoji = useCallback(() => {
    if (value === 2) {
      return "/ico/emoji-frown.svg";
    } else if (value === 3) {
      return "/ico/emoji-meh.svg";
    } else if (value === 4) {
      return "/ico/emoji-smile-beam.svg";
    } else if (value === 5) {
      return "/ico/emoji-grin-beam.svg";
    } else {
      return "/ico/emoji-angry.svg";
    }
  }, [value]);

  return (
    <motion.div
      {...Animations.zoomIn}
      className={`flex flex-col gap-my-24 ${
        centered ? "w-full items-center" : ""
      }`}
    >
      <div
        className={`relative h-[136px] w-[136px] rounded-full bg-neutral-100`}
      >
        <AnimatePresence>
          {value && (
            <motion.div
              key={value}
              layout
              {...Animations.dropdown}
              className="absolute left-0 top-0 h-[136px] w-[136px] rounded-full"
            >
              <Image alt="emoji" src={getEmoji()} width={136} height={136} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col gap-my-4">
        <EmojiSelector
          value={value ?? null}
          setValue={(v) =>
            onChange ? onChange(v as TypeValuesEmoji) : () => {}
          }
        />
        <p className={`${centered ? "text-center" : ""}`}>
          {t("select_a_face")}
        </p>
      </div>
    </motion.div>
  );
};

export default SmileBase;
