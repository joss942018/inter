import MyIcon from "@/app/components/MyIcon";
import MyTooltip from "@/app/components/MyTooltip";
import Animations from "@/app/styles/animations";
import { motion } from "framer-motion";
import { useTranslations } from "use-intl";

interface Props {
  option?: 0 | 1 | 2;
  setOption?: (value: 0 | 1 | 2) => void;
  disabled?: boolean;
  saveAnswer?: (value: string | undefined) => void;
  value?: string;
}

const TextOnly = ({
  option,
  setOption,
  disabled,
  saveAnswer,
  value,
}: Props) => {
  return (
    <TextOnlyPreview
      option={option}
      setOption={setOption}
      disabled={disabled}
      saveAnswer={saveAnswer}
      value={value}
    />
  );
};

export default TextOnly;

const TextOnlyPreview = ({
  option,
  setOption,
  disabled,
  saveAnswer,
  value,
}: Props) => {
  const t = useTranslations("SRSurvey");

  return (
    <div className="flex">
      {option === 0 && (
        <motion.button
          key={"key2"}
          {...Animations.fade}
          onClick={setOption ? () => setOption(2) : () => {}}
          // className={`relative flex items-center justify-center overflow-hidden w-[84px] h-[84px] bg-neutral-100 dark:bg-neutral-900 rounded-my-24 ml-my-16
          //     ${disabled ? "cursor-default" : "animar-hover"}
          //     `}
          //className={`flex items-center justify-center overflow-hidden w-[84px] h-[84px] bg-neutral-100 dark:bg-neutral-900 rounded-my-24
          className={`btn btn-2 flex !h-my-64 items-center justify-center !gap-[27px] overflow-hidden !rounded-my-8
          ${disabled ? "cursor-default" : "animar-hover"}
          `}
        >
          <MyIcon icon="FiType" size={32} />
          <span>{t("input_text")}</span>
        </motion.button>
      )}

      {option === 2 && (
        <>
          <motion.input
            key={"key3"}
            layout
            {...Animations.card}
            // className="input bg-lightest dark:bg-neutral-950 border non-decorative-border rounded-my-4"
            className="input non-decorative-border rounded-my-4 border bg-lightest dark:bg-neutral-950"
            placeholder={t("input_text")}
            name="textinput"
            onChange={saveAnswer ? (e) => saveAnswer(e.target.value) : () => {}}
            value={String(value ?? "")}
            autoComplete="off"
            autoFocus
          />

          <MyTooltip text={t("cancel")}>
            <motion.button
              layout
              key={"key4"}
              {...Animations.card}
              // className="w-my-48 h-my-48 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 ml-my-16"
              className="ml-my-16 flex h-my-48 w-my-48 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              onClick={(e) => {
                e.stopPropagation();
                if (setOption) setOption(0);
                if (saveAnswer) saveAnswer(undefined);
              }}
            >
              <MyIcon icon="FiX" size={24} />
            </motion.button>
          </MyTooltip>
        </>
      )}
    </div>
  );
};
