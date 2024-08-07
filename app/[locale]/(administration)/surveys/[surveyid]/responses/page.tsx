"use client";

import MyButton from "@/app/components/MyButton";
import { MyDrawer } from "@/app/components/MyDrawer";
import MyIcon from "@/app/components/MyIcon";
import MyLink from "@/app/components/MyLink";
import BarraBusqueda from "@/app/components/generic/BarraBusqueda";
import CenteredMessage from "@/app/components/generic/CenteredMessage";
import IcoMessage from "@/app/components/generic/IcoMessage";
import ListExpandedItem from "@/app/components/generic/ListExpandedItem";
import Loader from "@/app/components/generic/Loader";
import Portal from "@/app/components/generic/Portal";
import getEnv from "@/helpers/Env";
import { useRouter } from "@/internationalization/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import QuestionResponse from "../components/responses/QuestionResponse";
import SurveyContext from "../context/SurveyContext";
import AnsweredSurveyData from "./components/AnsweredSurveyData";
import Checkbox from "@/app/components/generic/Checkbox";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface IAnswerSet {
  questionId: number;
  questionText: string;
  answer: string;
  idQuestionType: number;
  audioUrl?: string | null;
  audioFile?: string | null;
  emotion?: string | null;
  transcription?: string;
}

export interface AllAnwers {
  answers: Answer[];
}

export interface Answer {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  finished_at: Date;
  audio_rated: boolean;
  is_finished: boolean;
}

const Page = () => {
  const session = useSession();
  const {
    survey: { id, loading: loadingSurvey },
    questions: { questions },
  } = useContext(SurveyContext);

  const t = useTranslations("Surveys");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${getEnv(
          "NEXT_PUBLIC_BACKEND_ENDPOINT",
        )}/api/v1/client_response/answer/all_answers/?survey_id=${id}`,
        {
          headers: {
            Authorization: `Token ${session?.data?.user.token}`,
          },
        },
      );
      return res.data; // Devuelve directamente los datos recibidos
    } catch (error) {
      console.error("Error en fetchData:", error);
      throw error; // Lanza el error para manejarlo en el componente que llama a fetchData
    }
  };

  const { data: responsesData, isLoading: responsesLoading } = useQuery({
    queryKey: ["survey", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  useEffect(() => {
    if (responsesData) {
      console.log('Responses data:', responsesData);
    }
  }, [responsesData]);

  const [filteredResponses, setFilteredResponses] = useState<Answer[]>([]);
  const [answerSet, setAnswerSet] = useState<IAnswerSet[]>([]);

  const searchParams = useSearchParams();
  const answeredSurveyId = Number(searchParams.get("id") ?? 0);
  const router = useRouter();

  const findSurvey = useCallback(
    () =>
      responsesData?.answers
        ?.slice()
        .find((el: any) => Number(el.id) === answeredSurveyId),
    [answeredSurveyId, responsesData],
  );

  const getAudio = async (answered_survey_id: number, question_id: number) => {
    try {
      const response = await axios({
        url: `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/streaming/get_audio/`,
        method: "GET",
        params: {
          answered_survey_id,
          question_id,
        },
        responseType: "blob", // Specify that the response should be treated as a binary blob
      });

      // Create a blob object from the response data
      const blob = new Blob([response.data]);

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      return blobUrl;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTranscription = async (
    answered_survey_id: number,
    question_id: number,
  ) => {
    // Use Axios to send a POST request with the data
    try {
      const response = axios({
        url: `${getEnv(
          "NEXT_PUBLIC_BACKEND_ENDPOINT",
        )}/streaming/get_transcription/`,
        method: "POST",
        data: {
          answered_survey_id,
          question_id,
        }, // Include the data in the request body
      });
      // Create a blob object from the response data
      const tempData = (await response).data;

      return {
        transcription: tempData?.transcription ?? "",
        url: tempData?.url ?? "",
      };
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //GET EMOJI
  const getEmojiForValue = (value: number) => {
    if (value === 5) {
      return "/ico/emoji-grin-beam.svg";
    } else if (value === 4) {
      return "/ico/emoji-smile-beam.svg";
    } else if (value === 3) {
      return "/ico/emoji-meh.svg";
    } else if (value === 2) {
      return "/ico/emoji-frown.svg";
    } else {
      return "/ico/emoji-angry.svg";
    }
  };

  const transformValueToSatisfaction = (value: number): number => {
    return value;
  };

  const [loading0, setLoading0] = useState(false);

  const surveysWithAnswers = useMemo(
    () => responsesData?.answers ?? [],
    [responsesData?.answers],
  );

  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    if (answeredSurveyId > 0) setDrawerOpen(false);
  }, [answeredSurveyId]);

  const [answeredSurveysWithAudio, setAnsweredSurveysWithAudio] = useState<number[]>([]);
  useEffect(() => {
    axios
      .get(
        `${getEnv(
          "NEXT_PUBLIC_BACKEND_ENDPOINT",
        )}/api/v1/client_response/answer_feedback/${id}/`,
      )
      .then((res) => {
        console.log("Api audio: ", res?.data);
        const data = res?.data;
        if (!data) throw new Error("No data");
        setAnsweredSurveysWithAudio(
          data.map(
            (el: { answered_survey_id: number }) => el.answered_survey_id,
          ),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const [filters, setFilters] = useState({
    audio_rated: false,
    is_finished: false,
  });

  const filteredResponses2 = filteredResponses.slice().filter((el) => {
    if (
      filters.audio_rated &&
      !answeredSurveysWithAudio.includes(Number(el.id))
    )
      return false;
    if (filters.is_finished && !el.is_finished) return false;
    return true;
  });

  return (
    <>
      <Portal elementId="drawer-portal-action-buttons">
        <MyButton
          size="small"
          onClick={() => setDrawerOpen(true)}
          className="lg:!hidden"
        >
          <MyIcon icon="FiList" />
          {t("list")}
        </MyButton>
      </Portal>
      {responsesLoading ? (
        <Loader fullScreen size={24} />
      ) : !responsesData || !responsesData.answers || responsesData.answers.length === 0 ? (
        <div className="flex h-[calc(100vh_-_48px)] justify-center">
          <IcoMessage
            ico="ico-file-tray-outline"
            message={t("no_registered_answers")}
          />
        </div>
      ) : (
        <MyDrawer
          firstColOpen={drawerOpen}
          closeFirstCol={() => setDrawerOpen(false)}
          firstCol={
            <div className="text-base-content flex min-h-full w-full flex-col gap-my-16 p-my-16 pt-my-48">
              <div className="mt-my-12 flex items-center justify-between">
                <h2 className="text-h5">
                  {responsesData.answers.length ?? 0}{" "}
                  {responsesData.answers.length === 1
                    ? t("response")
                    : t("responses")}
                </h2>
                <MyButton
                  hierarchy={3}
                  size="small"
                  onClick={() =>
                    window.open(
                      `${getEnv(
                        "NEXT_PUBLIC_BACKEND_ENDPOINT",
                      )}/statistics/generate_excel_v2/${id}/`,
                      "_blank",
                    )
                  }
                >
                  <MyIcon icon="FiDownload" />
                  <span>Excel</span>
                </MyButton>
              </div>
              <div className="flex flex-col gap-my-8">
                <BarraBusqueda
                  //@ts-ignore
                  data={surveysWithAnswers ?? []}
                  keysToFilter={["created_at"]}
                  setFilteredData={setFilteredResponses}
                />
                <Checkbox
                  name="hasAudio"
                  onChange={() =>
                    setFilters((f) => ({ ...f, audio_rated: !f.audio_rated }))
                  }
                  value={filters.audio_rated}
                  label={t("has_audio")}
                />
                <Checkbox
                  name="isFinished"
                  onChange={() =>
                    setFilters((f) => ({ ...f, is_finished: !f.is_finished }))
                  }
                  value={filters.is_finished}
                  label={t("is_finished")}
                />
              </div>
              {(filteredResponses2.slice() ?? [])
                .sort((a, b) => Number(a.id) - Number(b.id))
                .map((el, i) => (
                  <ListExpandedItem
                    key={el.id}
                    titleOrder={i + 1}
                    onClick={() =>
                      router.push(`/surveys/${id}/responses?id=${el.id}`)
                    }
                    active={answeredSurveyId === Number(el.id)}
                    title={String(
                      new Date(el.created_at)
                        .toLocaleString("sv")
                        .substring(0, 16),
                    )}
                    highlight={!!el.finished_at}
                    statusIcon={
                      answeredSurveysWithAudio.findIndex(
                        (el0) => Number(el.id) === el0,
                      ) !== -1
                        ? "FiVolume2"
                        : undefined
                    }
                  />
                ))}
            </div>
          }
          secondCol={
            <div className="relative flex w-full flex-col justify-center pt-[150px] lg:pt-my-48">
              {answeredSurveyId - 1 < 0 ? (
                <div className="flex min-h-[calc(100vh_-_150px)] items-center justify-center lg:min-h-[calc(100vh_-_48px)]">
                  <CenteredMessage message={t("select_an_answer")} />
                </div>
              ) : (
                <>
                  {loading0 && (
                    <div className="fixed left-0 right-0 top-0 z-10 flex h-screen items-center justify-center bg-lightest bg-opacity-80 dark:bg-darkest_d lg:left-[320px]">
                      <Loader size={24} />
                    </div>
                  )}
                  <div className="m-auto flex w-full max-w-4xl flex-col gap-2 p-s">
                    <AnsweredSurveyData
                      answeredSurveyId={answeredSurveyId}
                      surveyId={id}
                      data={findSurvey()}
                      loadingSurvey={loadingSurvey}
                      questions={questions}
                    />
                    <div className="mt-m flex flex-col gap-my-16">
                      <p className="text-h4">{t("Responses")}</p>
                      {answerSet.map((el) => (
                        <QuestionResponse
                          key={el.questionId}
                          questionText={el.questionText}
                          type={
                            el.idQuestionType === 1
                              ? t("descriptive")
                              : el.idQuestionType === 2
                              ? t("yes_no")
                              : el.idQuestionType === 3
                              ? t("multiple_choice")
                              : el.idQuestionType === 4
                              ? t("date")
                              : el.idQuestionType === 5
                              ? t("file")
                              : el.idQuestionType === 6
                              ? t("rating")
                              : el.idQuestionType === 7
                              ? t("credential")
                              : el.idQuestionType === 8
                              ? t("voice_only")
                              : el.idQuestionType === 9
                              ? t("yes_no_voice")
                              : el.idQuestionType === 10
                              ? t("multiple_choice_voice")
                              : el.idQuestionType === 11
                              ? t("rating_voice")
                              : el.idQuestionType === 12
                              ? t("smile")
                              : el.idQuestionType === 13
                              ? t("smile_voice")
                              : ""
                          }
                          emotion={el.emotion}
                        >
                          {(!el.answer &&
                            !el.audioUrl &&
                            !el.transcription &&
                            el.idQuestionType !== 5) ||
                          el.answer === "-" ? null : el.idQuestionType === 1 ? (
                            <div>
                              {el.audioUrl && (
                                <audio
                                  src={el.audioUrl}
                                  controls
                                  className="w-64"
                                >
                                  Your browser doesn&apos;t support HTML5 audio
                                </audio>
                              )}
                              {el.answer && el.answer.length > 0 && (
                                <p>{el.answer}</p>
                              )}
                            </div>
                          ) : el.idQuestionType === 2 ? (
                            <p>{el.answer}</p>
                          ) : el.idQuestionType === 3 ? (
                            <p>{el.answer}</p>
                          ) : el.idQuestionType === 4 ? (
                            <p>{el.answer}</p>
                          ) : el.idQuestionType === 5 ? (
                            <MyLink
                              className="btn btn-xs"
                              hierarchy={4}
                              href={`${getEnv(
                                "NEXT_PUBLIC_BACKEND_ENDPOINT",
                              )}/question/get/fileuploadanswer/?question_id=${
                                el.questionId
                              }&answered_survey_id=${findSurvey()?.id}`}
                              target="_blank"
                            >
                              <MyIcon icon="FiDownload" />
                              {t("download")}
                            </MyLink>
                          ) : el.idQuestionType === 6 ? (
                            <p>{el.answer}</p>
                          ) : el.idQuestionType === 7 ? (
                            <p>{el.answer}</p>
                          ) : el.idQuestionType === 8 ? (
                            <div>
                              {el.audioUrl && (
                                <audio
                                  src={el.audioUrl}
                                  controls
                                  className="w-64"
                                >
                                  Your browser doesn&apos;t support HTML5 audio
                                </audio>
                              )}
                            </div>
                          ) : el.idQuestionType === 9 ? (
                            <div>
                              <p className="mb-xs">
                                <span className="text-small secondary-text capitalize">
                                  {t("response")}:{" "}
                                </span>
                                <span>{el.answer}</span>
                              </p>
                              <div>
                                {el.audioUrl && (
                                  <audio
                                    src={el.audioUrl}
                                    controls
                                    className="w-64"
                                  >
                                    Your browser doesn&apos;t support HTML5
                                    audio
                                  </audio>
                                )}
                                {el.transcription &&
                                  el.transcription.length > 0 && (
                                    <p className="mt-xs">
                                      <span className="text-small secondary-text">
                                        {el.transcription}
                                      </span>
                                    </p>
                                  )}
                              </div>
                            </div>
                          ) : el.idQuestionType === 10 ? (
                            <div>
                              <p className="mb-xs">
                                <span className="text-small secondary-text capitalize">
                                  {t("response")}:{" "}
                                </span>
                                <span>{el.answer}</span>
                              </p>
                              <div>
                                {el.audioUrl && (
                                  <audio
                                    src={el.audioUrl}
                                    controls
                                    className="w-64"
                                  >
                                    Your browser doesn&apos;t support HTML5 audio
                                  </audio>
                                )}
                                {el.transcription &&
                                  el.transcription.length > 0 && (
                                    <p className="mt-xs">
                                      <span className="text-small secondary-text">
                                        {el.transcription}
                                      </span>
                                    </p>
                                  )}
                              </div>
                            </div>
                          ) : el.idQuestionType === 11 ? (
                            <div>
                              <p className="mb-xs">
                                <span className="text-small secondary-text capitalize">
                                  {t("response")}:{" "}
                                </span>
                                <span>{el.answer}</span>
                              </p>
                              <div>
                                {el.audioUrl && (
                                  <audio
                                    src={el.audioUrl}
                                    controls
                                    className="w-64"
                                  >
                                    Your browser doesn&apos;t support HTML5 audio
                                  </audio>
                                )}
                                {el.transcription &&
                                  el.transcription.length > 0 && (
                                    <p className="mt-xs">
                                      <span className="text-small secondary-text">
                                        {el.answer}
                                      </span>
                                    </p>
                                  )}
                              </div>
                            </div>
                          ) : el.idQuestionType === 12 ? (
                            <div>
                              {el.answer ? (
                                <div>
                                  <p className="secondary-text whitespace-nowrap text-center">
                                    {t("satisfaction_index")}:{" "}
                                    {transformValueToSatisfaction(
                                      Number(el.answer),
                                    ).toFixed(1)}
                                  </p>
                                  <Image
                                    alt="emoji"
                                    src={getEmojiForValue(Number(el.answer))}
                                    className="m-auto"
                                    width={48}
                                    height={48}
                                  />
                                </div>
                              ) : (
                                <div>-</div>
                              )}
                            </div>
                          ) : el.idQuestionType === 13 ? (
                            <div>
                              <p className="mb-xs">
                                <span className="text-small secondary-text capitalize">
                                  {t("response")}:{" "}
                                </span>
                                <span>{el.answer}</span>
                              </p>
                              <div>
                                <Image
                                  alt="emoji"
                                  src={getEmojiForValue(Number(el.answer))}
                                  className="m-auto"
                                  width={48}
                                  height={48}
                                />
                              </div>
                              <div>
                                {el.audioUrl && (
                                  <audio
                                    src={el.audioUrl}
                                    controls
                                    className="w-64"
                                  >
                                    Your browser doesn&apos;t support HTML5 audio
                                  </audio>
                                )}
                                {el.transcription &&
                                  el.transcription.length > 0 && (
                                    <p className="mt-xs">
                                      <span className="text-small secondary-text">
                                        {el.answer}
                                      </span>
                                    </p>
                                  )}
                              </div>
                            </div>
                          ) : null}
                        </QuestionResponse>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          }
        />
      )}
    </>
  );
};

export default Page;
