import CenteredMessage from "@/app/components/generic/CenteredMessage";
import Portal from "@/app/components/generic/Portal";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import SurveyContext from "../../context/SurveyContext";
import QuestionEditor from "./QuestionEditor";
import QuestionPreview from "./QuestionPreview";
import QuestionsDnD from "./QuestionsDnD";

const LayoutQuestions = () => {
  const t = useTranslations("Surveys");

  const { surveyFlow } = useContext(SurveyContext);

  return (
    <>
      <Portal elementId="questions-portal-start">
        <QuestionsDnD />
      </Portal>
      <Portal elementId="questions-portal-center">
        {Number(surveyFlow.openedFlowElement?.id ?? 0) > 0 ? (
          <QuestionPreview />
        ) : (
          <CenteredMessage message={t("click_qst_preview")} />
        )}
      </Portal>
      <Portal elementId="questions-portal-end">
        {Number(surveyFlow.openedFlowElement?.id ?? 0) > 0 ? (
          <QuestionEditor />
        ) : (
          <CenteredMessage message={t("pick_a_question")} />
        )}
      </Portal>
    </>
  );
};

export default LayoutQuestions;
