"use client";

import MyIcon from "@/app/components/MyIcon";
import { EnumErrorType } from "@/helpers/Questions";
import { Alert } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import EmailGrid from "../../../components/EmailGrid";
import SurveyContext from "../context/SurveyContext";
import Anyone from "./formShareSurvey/Anyone";

const FormShareSurvey = () => {
  const {
    questions: { allQuestionsValidation },
    survey: { id },
  } = useContext(SurveyContext);
  const t = useTranslations("Surveys.MailSystem");

  return (
    <div className="flex w-80 flex-col overflow-y-auto overflow-x-hidden lg:w-max">
      {allQuestionsValidation.validado ? (
        <div className="flex w-full flex-col gap-my-16 lg:flex-row">
          <Anyone />
          <EmailGrid surveyIDProp={id} />
        </div>
      ) : (
        <Alert
          variant="light"
          color="blue"
          className="mx-auto"
          title={
            allQuestionsValidation.errorType === EnumErrorType.zero_questions
              ? t("must_add_at_least_1_question")
              : t("some_questions_texts_are_empty")
          }
          icon={<MyIcon icon="FiAlertCircle" />}
        />
      )}
    </div>
  );
};

export default FormShareSurvey;
