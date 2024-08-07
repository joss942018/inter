"use client";

import MyButton from "@/app/components/MyButton";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import SurveyFlowContext from "../context/SurveyFlowContext";
import MyIcon from "@/app/components/MyIcon";
import Image from "next/image";

const StartSurvey = () => {
  const t = useTranslations("SRSurvey");
  const {
    survey: { surveyData, start },
  } = useContext(SurveyFlowContext);

  return (
    <div className="grid h-full grid-rows-[24px_1fr_24px] gap-my-8">
      <div className="row-start-2 row-end-3 flex flex-col gap-5 self-center">
        {surveyData?.survey.logo_url && surveyData.survey.logo_url !== "" && (
          <div className="h-32 w-32 overflow-hidden rounded-full">
            <Image
              src={surveyData?.survey.logo_url}
              alt={"Survey's logo"}
              width="0"
              height="0"
              sizes="100vw"
              className="h-auto w-auto rounded-full object-contain"
            />
          </div>
        )}
        <p className="text-4xl font-bold leading-10 tracking-wider">
          {surveyData?.survey.name}
        </p>

        <MyButton id="start_survey_button" onClick={start} size="medium">
          <MyIcon icon="FiPlay" />
          {t("start")}
        </MyButton>
      </div>
      <div className="row-start-3 row-end-4 flex items-center gap-my-8">
        <p className="whitespace-nowrap">
          Powered by <span className="font-bold">elia</span>
        </p>
      </div>
    </div>
  );
};

export default StartSurvey;
