"use client";

import { useTranslations } from "next-intl";
import { useContext } from "react";
import SurveyFlowContext from "../context/SurveyFlowContext";
import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import { toast } from "react-toastify";

const BottomBar = () => {
  const t = useTranslations("SRSurvey");
  const {
    survey: { step, surveyData, finish },
    questions: {
      nextQuestion,
      previousQuestion,
      currentElementIndex: currentQuestionIndex,
    },
  } = useContext(SurveyFlowContext);
  const previousDisabled = currentQuestionIndex === 0;
  const allowFinish = true;
  // currentQuestionIndex + 1 === questions.length && allowContinue;

  // const handleContinue = () => {
  //   if (allowContinue && !allowFinish) {
  //     nextQuestion();
  //     return;
  //   }
  //   if (allowContinue && allowFinish) {
  //     finish();
  //     return;
  //   }
  //   toast.error(t("enter_response_before_continuing"));
  // };

  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-2 items-center px-my-16">
      {step === 1 &&
        Number(surveyData?.flow.length ?? 0) > 1 &&
        currentQuestionIndex > 0 && (
          <MyButton
            hierarchy={4}
            onClick={previousQuestion}
            disabled={previousDisabled}
            className="col-start-1 col-end-2 !bg-transparent !px-my-24"
          >
            <MyIcon icon="FiChevronLeft" size={24} />
            {t("back")}
          </MyButton>
        )}
      {step === 1 && (
        <MyButton
          hierarchy={4}
          onClick={currentQuestionIndex >= Number(surveyData?.flow.length ?? 0) - 1 ?  finish : nextQuestion}
          className="col-start-2 col-end-3 justify-self-end !bg-transparent !px-my-24"
        >
          {t(
            currentQuestionIndex >= Number(surveyData?.flow.length ?? 0) - 1
              ? "finish"
              : "next",
          )}
          <MyIcon
            icon={
              currentQuestionIndex >= Number(surveyData?.flow.length ?? 0) - 1
                ? "FiCheck"
                : "FiChevronRight"
            }
            size={24}
          />
        </MyButton>
      )}
    </div>
  );
};

export default BottomBar;
