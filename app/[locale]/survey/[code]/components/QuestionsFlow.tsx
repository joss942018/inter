"use client";

import AnimatedText from "@/app/components/generic/AnimatedText";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import SurveyFlowContext from "../context/SurveyFlowContext";
import InputsManager from "./inputs/InputsManager";
import LayoutQuestion from "./layouts/LayoutQuestion";

const QuestionsFlow = () => {
  const t = useTranslations("SRSurvey");
  const {
    questions: { currentElementIndex: currentQuestionIndex },
  } = useContext(SurveyFlowContext);

  return (
    <LayoutQuestion id={currentQuestionIndex} question={<AnimatedText />}>
      <InputsManager key={currentQuestionIndex} />
    </LayoutQuestion>
  );
};

export default QuestionsFlow;
