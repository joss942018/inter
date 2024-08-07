"use client";

import Image from "next/image";
import MyLink from "@/app/components/MyLink";
import { useTranslations } from "next-intl";
import SurveyFlowContext from "../context/SurveyFlowContext";
import { useContext } from "react";
import Loader from "@/app/components/generic/Loader";
import LogoPrototype from "./LogoPrototype";

interface Props {
  message: string;
  canClose?: boolean;
}

function SurveyMessage({ message, canClose = false }: Props) {
  const t = useTranslations("SRSurvey");
  const {
    survey: { surveyData, loading },
  } = useContext(SurveyFlowContext);

  return (
    <div className="m-auto flex h-full max-w-md flex-col items-center justify-center gap-xs text-center">
      {loading.isPendingFinishSurvey ? (
        <div className="flex flex-col items-center gap-xs">
          <Loader />
          <p>{t("saving")}...</p>
        </div>
      ) : (
        <>
          {/* <Image
            alt="Organization's Logo"
            src={logo}
            width={"0"}
            height={"0"}
            sizes={"100vw"}
            className="w-auto h-20 object-contain"
          /> */}
          <LogoPrototype fontSize={64} />
          <p className="text-heading4">{surveyData?.survey.name}</p>
          <p className="secondary-text">{message}</p>
          {canClose && (
            <p className="secondary-text">{t("you_can_close_this_tab")}</p>
          )}
          <MyLink hierarchy={2} href="/contact">
            {t("i_want_to_create_a_survey_like_this")}
          </MyLink>
        </>
      )}
    </div>
  );
}

export default SurveyMessage;
