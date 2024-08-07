import Animations from "@/app/styles/animations";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface IProps {
  value?: boolean;
  saveAnswer?: (value: boolean) => void;
}

const BooleanBase = ({ value, saveAnswer }: IProps) => {
  const t = useTranslations("SRSurvey");

  return (
    <motion.div
      {...Animations.slideForward}
      className="flex max-w-40 flex-col gap-2"
    >
      <Button
        onClick={saveAnswer ? () => saveAnswer(true) : undefined}
        variant={value === true ? "filled" : "light"}
        size="lg"
      >
        {t("yes")}
      </Button>
      <Button
        onClick={saveAnswer ? () => saveAnswer(false) : undefined}
        variant={value === false ? "filled" : "light"}
        size="lg"
      >
        {t("no")}
      </Button>
    </motion.div>
  );
};

export default BooleanBase;
