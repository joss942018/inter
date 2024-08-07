import Loader from "@/app/components/generic/Loader";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import SurveyFlowContext from "../context/SurveyFlowContext";

const GeneratedQuestions = () => {
  const t = useTranslations("SRSurvey");
  const {
    questions: {
      currentQuestion,
      // aiGeneratedQuestions: { loading, questions },
    },
  } = useContext(SurveyFlowContext);

  return (
    <div className="flex flex-col gap-my-12 bg-primary-200 p-my-20 dark:bg-primary-600">
      <h4 className="text-h4">{t("ai_generated_question")}:</h4>
      {/* {loading ? (
        <div className="flex w-max gap-my-16 p-my-8 bg-white dark:bg-neutral-950">
          <Loader size={24} />
          <p>{t("generating_question")}</p>
        </div>
      ) : (
        <p>{questions.find((el) => currentQuestion?.id === el.id)?.text}</p>
      )} */}
    </div>
  );
};

export default GeneratedQuestions;
