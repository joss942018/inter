import Animations from "@/app/styles/animations";
import { Textarea } from "@mantine/core";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

const TextBase = ({ value, onChange: onChange }: IProps) => {
  const t = useTranslations("SRSurvey");

  return (
    <motion.div {...Animations.slideForward}>
      <Textarea
        size="lg"
        placeholder={t("input_text")}
        onChange={onChange && ((e) => onChange(e.target.value))}
        value={value ?? ""}
      />
    </motion.div>
  );
};

export default TextBase;
