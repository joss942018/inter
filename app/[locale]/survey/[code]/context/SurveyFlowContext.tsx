"use client";

import getEnv from "@/helpers/Env";
import { myMutation, myQuery } from "@/helpers/Fetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { createContext, useCallback, useEffect, useState, useRef } from "react";
import {
  IMediaFlowElement,
  IQuestionFlowElement,
  ISurveyData,
} from "../helpers/typesQueries";
import useAnswers, { IUseAnswers } from "../hooks/useAnswers";
import useTTS from "../hooks/useTTS";
import { modals } from "@mantine/modals";
import { useDebouncedCallback } from "@mantine/hooks";

interface IDeviceData {
  answer_id: number;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  ip_address?: string;
  user_agent?: string;
}

interface Props {
  children: React.ReactNode;
}

const SurveyFlowProvider = ({ children }: Props) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const preview = Number(searchParams.get("preview")) === 1;
  const t = useTranslations("SRSurvey");

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [currentElementIndex, setCurrentElementIndex] = useState(-1); // -1 for start
  const [answerId, setAnswerId] = useState<number | null | undefined>();
  const [deviceData, setDeviceData] = useState<IDeviceData>({
    answer_id: 0,
  });

  const { data: surveyData, isLoading: isLoadingSurveyData } = useQuery({
    queryKey: ["/api/v1/survey/survey/fill", params.code],
    queryFn: myQuery<ISurveyData>(),
    retry: false,
  });

  const { mutate: createSetAnswers, isPending: isPendingSetAnswers } =
      useMutation({
        mutationFn: myMutation<{ survey_id: number }>({
          url: "/api/v1/client_response/set_of_answers/",
        }),
        onSuccess: (data) => setAnswerId(data.answer_id),
      });

  useEffect(() => {
    if (surveyData?.survey.survey_id)
      createSetAnswers({ survey_id: surveyData?.survey.survey_id });
  }, [surveyData?.survey.survey_id]);

  const { mutate: restartSurvey, isPending: isPendingRestartSurvey } =
      useMutation({
        mutationFn: myMutation({
          url: "/api/v1/client_response/set_of_answers/create/",
        }),
        onSuccess: () => {
          setStep(0);
          setCurrentElementIndex(-1);
        },
      });

  const { mutate: finishSurvey, isPending: isPendingFinishSurvey } =
      useMutation({
        mutationFn: async (answer_id: number | null | undefined) => {
          const res = await fetch(
              `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/client_response/answer/finish/${answer_id}/`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answer_id })
              }
          );

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
          }

          return res.json();
        },
        onSuccess: () => {
          setStep(2);
          alert("ERASE ALL FROM LOCAL STORAGE");
        },
        onError: (error: any) => {
          console.error('Error finishing answer:', error);
          alert('Failed to finish answer.');
        }
      });

  const { mutate: updateClientAnswer, isPending: isPendingUpdateClientAnswer } =
      useMutation({
        mutationFn: myMutation<IDeviceData>({
          url: "/api/v1/client_response/client_information/update/",
        }),
      });

  const handleUpdateClientAnswer = useDebouncedCallback(
      () => updateClientAnswer(deviceData),
      1000,
  );

  const answers = useAnswers({
    currentQuestionId:
        surveyData?.flow[currentElementIndex]?.type === "question"
            ? // @ts-ignore
            surveyData?.flow[currentElementIndex].question_id
            : 0,
    answerId,
  });

  useEffect(() => {
    if (!answerId || !(answerId > 0)) return;
    setDeviceData((dD) => ({
      ...dD,
      answer_id: answerId ?? 0,
    }));
  }, [answerId]);

  useEffect(() => {
    if (!(deviceData.answer_id > 0)) return;
    handleUpdateClientAnswer();
  }, [deviceData]);

  // START device info
  const updateGeoLocation = useCallback(
      (lat: number, lon: number, acc: number) => {
        if (isNaN(Number(lat)) || isNaN(Number(lon)) || isNaN(Number(acc)))
          return;
        const accuracy = 9999999;
        // const accuracy = surveyData?.client_answer.accuracy ?? 9999999;
        if (accuracy < acc) return;
        setDeviceData((dD) => ({
          ...dD,
          latitude: Number(lat.toFixed(6)),
          longitude: Number(lon.toFixed(6)),
          accuracy: Number(acc.toFixed(6)),
        }));
      },
      [setDeviceData],
      // [surveyData?.client_answer.accuracy, updateClientAnswer],
  );

  const getDeviceGeoLocation = useCallback(() => {
    if (preview) return;
    navigator.geolocation.getCurrentPosition(
        (pos: any) => {
          updateGeoLocation(
              pos.coords.latitude,
              pos.coords.longitude,
              pos.coords.accuracy,
          );
        },
        (err: any) => console.error(`ERROR(${err.code}): ${err.message}`),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
    );
  }, [updateGeoLocation, preview]);

  const getGoogleLocation = useCallback(() => {
    axios
        .post(
            `https://www.googleapis.com/geolocation/v1/geolocate?key=${getEnv(
                "NEXT_PUBLIC_GEOLOCATION_API_KEY",
            )}`,
        )
        .then((el) => {
          updateGeoLocation(
              el.data.location.lat,
              el.data.location.lng,
              el.data.accuracy,
          );
          getDeviceGeoLocation();
        })
        .catch((err) => {
          getDeviceGeoLocation();
          console.error(err);
        });
  }, [updateGeoLocation, getDeviceGeoLocation]);

  const getIpAddress = () =>
      fetch("https://ipapi.co/json/")
          .then((response) => response.json())
          .then((data) =>
              setDeviceData((dD) => ({
                ...dD,
                ip_address: data.ip,
              })),
          )
          .catch((err) => console.error(err));
  const getOS = () =>
      setDeviceData((dD) => ({
        ...dD,
        user_agent: navigator.userAgent,
      }));

  useEffect(() => {
    getIpAddress();
    getGoogleLocation();
    getOS();
  }, []);

  const nextStep = useCallback(() => {
    setStep((s) => {
      const tempS = s + 1;
      if (tempS > 3) return 2;
      if (tempS < 0) return 0;
      return tempS as 0 | 1 | 2;
    });
  }, []);

  const previousQuestion = useCallback(() => {
    setCurrentElementIndex((i) => {
      const tempI = i - 1;
      if (tempI < 0) return i;
      return tempI;
    });
  }, []);

  const { speak, changeLanguageTTS } = useTTS({
    language: surveyData?.survey.language_id === "spa" ? "es" : "en",
  });

  useEffect(() => {
    changeLanguageTTS(surveyData?.survey.language_id === "spa" ? "es" : "en");
  }, [surveyData?.survey.language_id, changeLanguageTTS]);

  const [speakerOn, setSpeakerOn] = useState(false);
  const lastQuestionIndexRef = useRef<number>(-1); // UseRef to store the last read question index

  useEffect(() => {
    if (
        currentElementIndex > -1 &&
        surveyData?.flow?.[currentElementIndex] &&
        speakerOn &&
        lastQuestionIndexRef.current !== currentElementIndex
    ) {
      console.log("Mi Objeto", surveyData?.flow?.[currentElementIndex])
      speak(surveyData.flow[currentElementIndex]?.question?.toString());
      lastQuestionIndexRef.current = currentElementIndex; // Update the last read question index
    }
  }, [currentElementIndex, speakerOn, surveyData?.flow, speak]);

  const allowContinue = true;

  const nextQuestion = useCallback(() => {
    if (!allowContinue) return;
    setCurrentElementIndex((i) => {
      const tempI = i + 1;
      if (tempI >= (surveyData?.flow.length ?? 0)) return i;
      return tempI;
    });
  }, [allowContinue, surveyData?.flow]);

  const handleRestartSurvey = () =>
      modals.openConfirmModal({
        title: t("restart_survey_question"),
        children: <p>{t("there_are_stored_answers")}</p>,
        labels: { confirm: t("yes"), cancel: t("no") },
        confirmProps: { color: "red" },
        onConfirm: () => restartSurvey({}),
      });

  const handleFinishSurvey = () => finishSurvey(answerId);
  const handleStartSurvey = () => {
    nextStep();
    nextQuestion();
  };

  return (
      <SurveyFlowContext.Provider
          value={{
            survey: {
              surveyData,
              preview,
              restartSurvey: handleRestartSurvey,
              step,
              speakerOn,
              setSpeakerOn,
              start: handleStartSurvey,
              finish: handleFinishSurvey,
              loading: {
                isLoadingSurveyData,
                isPendingSetAnswers,
                isPendingRestartSurvey,
                isPendingFinishSurvey,
                isPendingUpdateClientAnswer,
              },
            },
            answers,
            questions: {
              currentQuestion: surveyData?.flow[
                  currentElementIndex
                  ] as IQuestionFlowElement,
              currentMediaElement: surveyData?.flow[
                  currentElementIndex
                  ] as IMediaFlowElement,
              currentElementIndex,
              nextQuestion,
              previousQuestion,
            },
          }}
      >
        {children}
      </SurveyFlowContext.Provider>
  );
};

interface ISurveyContext {
  survey: {
    surveyData?: ISurveyData;
    preview: boolean;
    restartSurvey: () => void;
    step: 0 | 1 | 2;
    speakerOn: boolean;
    setSpeakerOn: React.Dispatch<React.SetStateAction<boolean>>;
    start: () => void;
    finish: () => void;
    loading: {
      isLoadingSurveyData: boolean;
      isPendingSetAnswers: boolean;
      isPendingRestartSurvey: boolean;
      isPendingFinishSurvey: boolean;
      isPendingUpdateClientAnswer: boolean;
    };
  };
  answers: IUseAnswers;
  questions: {
    currentQuestion?: IQuestionFlowElement;
    currentMediaElement?: IMediaFlowElement;
    currentElementIndex: number;
    nextQuestion: () => void;
    previousQuestion: () => void;
  };
}
const SurveyFlowContext = createContext({} as ISurveyContext);
export { SurveyFlowProvider };
export default SurveyFlowContext;
