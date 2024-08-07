import { IOption } from "@/app/[locale]/(administration)/surveys/[surveyid]/components/questions/question/MC";
import Animations from "@/app/styles/animations";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";

interface IProps {
  value?: (number | string)[];
  options: IOption[];
  multiple?: boolean;
  onChange?: (value: (number | string)[]) => void;
}

const MCBase = ({ value, options, multiple = false, onChange }: IProps) => {
  const handleClick = (mcId: number | string) => {
    if (!multiple) {
      onChange && onChange([mcId]);
      return;
    }

    const found = value && value.find((el) => el === mcId);
    if (found) {
      onChange && onChange(value.filter((el) => el !== mcId));
    } else {
      onChange && onChange([...(value ?? []), mcId]);
    }
  };

  return (
    <motion.div {...Animations.zoomIn} className="flex flex-col gap-my-12">
      {options
        .slice()
        .sort((a, b) => Number(a.order) - Number(b.order))
        .map((el) => (
          <Button
            key={el.id}
            variant={
              value && value.find((el1) => el.id.toString() === el1.toString())
                ? "filled"
                : "light"
            }
            onClick={() => handleClick(el.id)}
          >
            {el.option}
          </Button>
        ))}
    </motion.div>
  );
};

export default MCBase;
