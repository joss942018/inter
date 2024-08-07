"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import MyLink from "@/app/components/MyLink";
import { useTranslations } from "next-intl";
import SurveyFlowContext from "../context/SurveyFlowContext";
import useTTS from "../hooks/useTTS";
import AnimatedText from "@/app/components/generic/AnimatedText";

const SpeakerTest = () => {
  const t = useTranslations("SRSurvey");
  const {
    survey: { finish },
  } = useContext(SurveyFlowContext);

  const [screen, setScreen] = useState(0);
  // const { speak, changeLanguageTTS, liveText } = useTTS({
  //   language: lng ?? "en",
  // });

  // useEffect(() => {
  //   changeLanguageTTS(lng ?? "en");
  // }, [lng]);

  // useEffect(() => {
  //   if (screen === 0) speak(t("hello_im_elia"));
  // }, [screen]);

  return (
    <>
      <div className="m-auto flex h-80 w-80 flex-col gap-5">
        {/* <Image alt="Grehus logo" src={logo} width={80} height={80} /> */}
        {screen === 0 ? (
          <>
            <p className="max-w-xs text-gray-500 dark:text-gray-400">
              {t("app_requires_hear_instructions")}
            </p>
            <p className="max-w-xs text-gray-500 dark:text-gray-400">
              {String(t("hear_phrase_hello_mashi_question")).split("%")[0] ??
                ""}
              <span className="font-medium text-black dark:text-white">
                {t("hello_im_elia")}
              </span>
              {String(t("hear_phrase_hello_mashi_question")).split("%")[1] ??
                ""}
            </p>
          </>
        ) : (
          <>
            <p className="font-medium text-black dark:text-white">
              {t("please_turn_up_volume")}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {t("if_doesnt_work_try_another_device")}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {t("if_this_still_not_work")}{" "}
              <MyLink
                href={"mailto:support@grehus.com"}
                className="text-blue-600 dark:text-blue-500"
              >
                support@grehus.com
              </MyLink>
            </p>
          </>
        )}
        <div className="flex w-max gap-4">
          {screen === 0 ? (
            <>
              <button onClick={finish} className="btn btn-primary w-14">
                {t("yes")}
              </button>
              <button
                onClick={() => setScreen(1)}
                className="btn btn-square w-14"
              >
                {t("no")}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setScreen(0);
              }}
              className="btn"
            >
              {t("retry")}
            </button>
          )}
        </div>
      </div>
      {/* <AnimatedText liveText={liveText} subtitles /> */}
    </>
  );
};

export default SpeakerTest;
