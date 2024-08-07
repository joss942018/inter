import SurveyFlowContext from "@/app/[locale]/survey/[code]/context/SurveyFlowContext";
import { motion } from "framer-motion";
import { useContext, useRef } from "react";

interface Props {
  textSize?: string;
}

const AnimatedText = ({ textSize = "text-base" }: Props) => {
  const {
    questions: { currentQuestion },
  } = useContext(SurveyFlowContext);

  return (
    <div
      className={`text-h5 flex h-max flex-row flex-wrap gap-x-my-4 gap-y-my-8 ${textSize}`}
    >
      {(
        (currentQuestion?.question ?? "") +
        (currentQuestion?.required ? " *" : "")
      )
        .split(" ")
        .map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.35,
              delay: i / 40,
              // delay: i / 15,
              ease: "easeInOut",
            }}
            key={el + i}
          >
            {el}
          </motion.span>
        ))}
    </div>
  );
};

export default AnimatedText;
