
"use client";
import SkeletonQuestion from "@/app/components/skeletons/SkeletonQuestion";

import MyButton from "@/app/components/MyButton";
import { MyDrawer } from "@/app/components/MyDrawer";
import MyIcon from "@/app/components/MyIcon";
import ListExpandedItem from "@/app/components/generic/ListExpandedItem";
import Portal from "@/app/components/generic/Portal";
import getEnv from "@/helpers/Env";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import "dayjs/locale/en";
import "dayjs/locale/es";

import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import SurveyContext from "../context/SurveyContext";
import MyCard from "./components/MyCardQuestion"; 
import DashboardEstadistic from "./components/DashboardEstadistic";

import { IEmotionGraph } from "./components/DescEmotionGraph";
import { IRateStats } from "./components/RateQuestion";
import { useSession } from "next-auth/react";
import { im } from "mathjs";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

export interface IAudioCount {
  count: number;
  loading: boolean;
}

export interface ITFStats {
  [key: number]: { option: "True" | "False"; count: number }[];
}

export interface IMcStats {
  [key: number]: { option: "True" | "False"; count: number }[];
}

export interface IDescStats {
  [key: number]: {
    summarized_answers: string[];
    verbs: [string, number][];
    nouns: [string, number][];
    adjectives: [string, number][];
    emotions: [string, number][];
    topic: [string, number][];
    summarizedContext: string;
  };
}

export interface IClusterDescStats {
  answers: { answer: string; date: string }[];
  count: number;
  percentage: number;
  emotion: "positive" | "negative" | "neutral";
}

export interface IDateStats {
  questionId: number;
  date: string;
}

export interface ICredStats {
  questionId: number;
  date: string;
}

export interface IFileStats {
  questionId: number;
  links: string[];
}

export interface IVoiceOnlyStats {
  questionId: number;
  audioFile: string | undefined;
  audioId: number;
}

export interface IRateVoiceStats {
  questionId: number;
  rating: [number, number][];
  audioFile?: string | undefined;
}

export interface ISmileStats {
  questionId: number;
  date: string | number;
}

export interface IStatsFilters {
  dateRange: [Date | null, Date | null];
  stage: "connected" | "engaged" | "listened";
  emotion: "all" | "positive" | "neutral" | "negative";
}

export interface ILogsStats {
  invited: number;
  opened: number;
  visited: number;
  press_start_button: number;
  questions_reached: { questionOrder: number; count: number }[];
  finished: number;
}

const initialLogsStats: ILogsStats = {
  invited: 0,
  opened: 0,
  visited: 0,
  press_start_button: 0,
  questions_reached: [],
  finished: 0,
};

type TypeBubbles = {
  label: string;
  data: {
    x: number;
    y: number;
    r: number;
    label: string;
  }[];
  backgroundColor: string;
};

type TypeBubblesLines = {
  type: "line";
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  borderColor: string;
  borderWidth: number;
  z: number;
};

const URL = `${getEnv(
  "NEXT_PUBLIC_BACKEND_ENDPOINT",
)}/question/get/all/fileuploadanswer/?question_id=`;

const Page = () => {
  const session = useSession();
  const {
    survey: { id: surveyId, loading: loadingSurvey },
    questions: { questions },
  } = useContext(SurveyContext);
  const t = useTranslations("Surveys");
  const [questionSelected, setQuestionSelected] = useState(0);
  const [questionTypeSelected, setQuestionTypeSelected] = useState(''); 
  const [questionTitleSelected, setQuestionTitleSelected] = useState(''); 
  const [tfStatistics, setTfStatistics] = useState<ITFStats>({});
  const [mcStatistics, setMcStatistics] = useState<IMcStats>({});
  const [descStatistics, setDescStatistics] = useState<
    { questionId: number; cluster: IClusterDescStats[] }[]
  >([]);
  const [rateStatistics, setRateStatistics] = useState<IRateStats[]>([]);
  const [dateStatistics, setDateStatistics] = useState<IDateStats[]>([]);
  const [credStatistics, setCredStatistics] = useState<ICredStats[]>([]);
  const [fileStatistics, setFileStatistics] = useState<IFileStats[]>([]);
  const [voiceOnlyStatistics, setVoiceOnlyStatistics] = useState<
    IVoiceOnlyStats[]
  >([]);
  const [rateVoiceStatistics, setRateVoiceStatistics] = useState<
    IRateVoiceStats[]
  >([]);
  const [smileStatistics, setSmileStatistics] = useState<ISmileStats[]>([]);

  const [logsStats, setLogsStats] = useState<ILogsStats>(initialLogsStats);
  const [statsData, setStatsData] = useState(null); // Estado para los datos obtenidos de la API

  const [descSentimentPlot, setDescSentimentPlot] = useState<
    { questionId: number; plot: IEmotionGraph }[]
  >([]);

  const [filters, setFilters] = useState<IStatsFilters>({
    dateRange: [null, null],
    stage: "listened",
    emotion: "all",
  });

  const [statsDates, setStatsDates] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [questionData, setQuestionData] = useState<{ question: string; answers: string[] }>({
    question: "",
    answers: []
  });

  const [drawerOpen, { open: openDrawer, close: closeDrawer }] =
    useDisclosure();

  useEffect(() => {
    closeDrawer();
  }, [questionSelected]);

  useEffect(() => {
    // if (surveyId <= 0) return;

    // Aquí está el JSON quemado
    const jsonData = {
      question: "¿Cuál es tu nombre?",
      answers: ["Solange", "Marcelo", "Solange", "Marcelo"]
    };

    // Usar el JSON estático para actualizar el estado
    setQuestionData(jsonData);

    // Comenta el código de la llamada a la API
    // axios
    //   .get(`/api/surveys/${surveyId}/stats`)
    //   .then((response) => {
    //     const { question, answers } = response.data;
    //     setQuestionData({ question, answers });
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching survey data:", error);
    //   });
  }, []); // Comentar el [surveyId] para que se ejecute solo una vez

  const calculateAverageTime = () => {
    let total = 0;
    // const avgTime = { ...dataKpi?.kpiAverageTime?.averageTime };
    // for (const key in avgTime) {
    //   if (Object.prototype.hasOwnProperty.call(avgTime, key)) {
    //     const element = avgTime[key as any];
    //     const avgEl = Number(element.average_time);
    //     if (!isNaN(avgEl)) {
    //       total += avgEl;
    //     }
    //   }
    // }
    return new Date(total * 1000).toISOString().slice(14, 19);
  };

  const getAllData = async () => {
    const completionRate =
      logsStats.press_start_button && logsStats.press_start_button > 0
        ? (
            (Number(logsStats.finished) /
              Number(logsStats.press_start_button)) *
            100
          ).toFixed(0)
        : 0;
    const summary = {
      attempted: logsStats.press_start_button,
      completed: logsStats.finished,
      brandIndex:
        Math.round(
          (Number(logsStats.finished) / Number(logsStats.visited)) * 100,
        ) + "%",
      completionRate: Number(completionRate) + "%",
      averageTime: calculateAverageTime(),
      satisfaction: 0,
      // Math.round(Number(dataKpi?.kpiSatisfactionIndex?.average) * 10) / 10,
      ratedWithAudio: audioCount.count,
    };
    const completionChart = [
      {
        label: "invited",
        value: logsStats.invited,
      },
      {
        label: "opened",
        value: logsStats.opened,
      },
      {
        label: "visited",
        value: logsStats.visited,
      },
      {
        label: "started",
        value: logsStats.press_start_button,
      },
      ...logsStats.questions_reached
        .slice()
        .sort((a, b) => a.questionOrder - b.questionOrder)
        .map((el, i) => ({
          label: `Q${i + 1}`,
          value: el.count,
        })),
      {
        label: "finished",
        value: logsStats.finished,
      },
    ];
    const answeredFrom = [];
    // findGeoPosition()?.map((el) => ({
    //   latitude: el.latitude,
    //   longitude: el.longitude,
    //   emotion: el.emotion,
    // })) ?? [];

    const mcData = JSON.parse(
      "",
      // ({}
      // await getMcStats({
      //   variables: {
      //     surveyId,
      //   },
      // })
      // ).data?.mcqStatisticsBySurveyId,
    );

    const tfData = JSON.parse(
      "",
      // ({}
      // await getTfStats({
      //   variables: {
      //     surveyId,
      //   },
      // })
      // ).data?.tfStatisticsBySurveyId,
    );

    const schemaSummary = [
      {
        column: "Attempted",
        type: Number,
        value: (el: typeof summary) => el.attempted,
      },
      {
        column: "Completed",
        type: Number,
        value: (el: typeof summary) => el.completed,
      },
      {
        column: "Brand index",
        type: String,
        value: (el: typeof summary) => el.brandIndex,
      },
      {
        column: "Answer index",
        type: String,
        value: (el: typeof summary) => el.completionRate,
      },
      {
        column: "Average time",
        type: String,
        value: (el: typeof summary) => el.averageTime,
      },
      {
        column: "Satisfaction",
        type: Number,
        value: (el: typeof summary) => el.satisfaction,
      },
      {
        column: "Rated with audio",
        type: Number,
        value: (el: typeof summary) => el.ratedWithAudio,
      },
    ];

    const schemaCompletionRate = [
      {
        column: "Label",
        type: String,
        value: (el: (typeof completionChart)[number]) => el.label,
      },
      {
        column: "Value",
        type: Number,
        value: (el: (typeof completionChart)[number]) => el.value,
      },
    ];

    const schemaAnsweredFrom = [
      {
        column: "Latitude",
        type: Number,
        // value: (el: (typeof answeredFrom)[number]) => el.latitude,
      },
      {
        column: "Longitude",
        type: Number,
        // value: (el: (typeof answeredFrom)[number]) => el.longitude,
      },
      {
        column: "Emotion",
        type: String,
        // value: (el: (typeof answeredFrom)[number]) => el.emotion,
      },
    ];

    const schemaQuestions = [
      {
        column: "ID",
        type: Number,
        // value: (el: (typeof questions)[number]) => el.id,
      },
      {
        column: "Question",
        type: String,
        // value: (el: (typeof questions)[number]) => el.question,
      },
      {
        column: "Question type",
        type: String,
        // value: (el: (typeof questions)[number]) =>
        // renderQuestionTypeById(el.idQuestionType),
      },
    ];

    interface ISchemaDesc {
      question: number;
      answers: string;
      count: number;
      percentage: number;
      emotion: string;
    }

    const schemaDesc = [
      {
        column: "Question",
        type: Number,
        value: (el: ISchemaDesc) => el.question,
      },
      {
        column: "Answers",
        type: String,
        value: (el: ISchemaDesc) => el.answers,
      },
      {
        column: "Count",
        type: Number,
        value: (el: ISchemaDesc) => el.count,
      },
      {
        column: "Percentage",
        type: Number,
        value: (el: ISchemaDesc) => el.percentage,
      },
      {
        column: "Emotion",
        type: String,
        value: (el: ISchemaDesc) => el.emotion,
      },
    ];

    const schemaMc = [
      {
        column: "Question",
        type: String,
        // value: (el: (typeof questions)[number]) => el.question,
      },
      {
        column: "Option",
        type: String,
        value: (el: (typeof mcData)[number]) => el.option,
      },
      {
        column: "Count",
        type: Number,
        value: (el: (typeof mcData)[number]) => el.count,
      },
    ];

    const schemaTf = [
      {
        column: "Question",
        type: String,
        // value: (el: (typeof questions)[number]) => el.question,
      },
      {
        column: "Option",
        type: String,
        value: (el: (typeof tfData)[number]) => el.option,
      },
      {
        column: "Count",
        type: Number,
        value: (el: (typeof tfData)[number]) => el.count,
      },
    ];

    // await writeXlsxFile(
    //   [
    //     [summary],
    //     completionChart,
    //     answeredFrom,
    //     questions,
    //     descStatistics
    //       .map((el) =>
    //         el.cluster.map((el0) => ({
    //           ...el0,
    //           question: el.questionId,
    //           answers: el0.answers.map((el1) => el1.answer).join(", "),
    //         })),
    //       )
    //       .flat(),
    //     Object.keys(mcData)
    //       .map((key) => ({
    //         question: key,
    //         array: mcData[key],
    //       }))
    //       .map((el) =>
    //         el.array.map((el0: any) => ({
    //           question: el.question,
    //           option: el0.option,
    //           count: el0.count,
    //         })),
    //       )
    //       .flat(),
    //     Object.keys(tfData)
    //       .map((key) => ({
    //         question: key,
    //         array: tfData[key],
    //       }))
    //       .map((el) =>
    //         el.array.map((el0: any) => ({
    //           question: el.question,
    //           option: el0.option,
    //           count: el0.count,
    //         })),
    //       )
    //       .flat(),
    //     ,
    //   ],
    //   {
    //     schema: [
    //       schemaSummary,
    //       schemaCompletionRate,
    //       schemaAnsweredFrom,
    //       schemaQuestions,
    //       schemaDesc,
    //       schemaMc,
    //       schemaTf,
    //     ],
    //     sheets: [
    //       "Summary",
    //       "Completion Rate",
    //       "Answered From",
    //       "Questions",
    //       "Descriptive",
    //       "Multiple Choice",
    //       "True False",
    //     ],
    //     fileName: `survey_${surveyId}.xlsx`,
    //   },
    // );
  };

  const [loadingLogsStats, setLoadingLogsStats] = useState(true);

  async function fetchData() {
    try {
      const response = await axios.get(
        `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/stats/general_statistics/?survey_id=${surveyId}`,
        {
          headers: {
            Authorization: `Token ${session?.data?.user.token}`,
          },
        }
      );

      // Actualizar el estado con los datos recibidos si es necesario
      // Por ejemplo, si deseas procesar los datos antes de establecer el estado
      // const processedData = processResponseData(response.data);
      // setLogsStats(processedData);

      console.log("Datos: ", response.data);
      setStatsData(response.data); // Actualizar el estado con los datos obtenidos
      setLoadingLogsStats(false);
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
    }
  }

  useEffect(() => {
    console.log(surveyId);
    if (surveyId <= 0) return;
    fetchData();
  }, [surveyId]);

  const onSummary = questionSelected === 0;

  // audio for satisfaction index
  const [audioCount, setAudioCount] = useState<IAudioCount>({
    count: 0,
    loading: false,
  });
  useEffect(() => {
    setAudioCount({ count: 0, loading: true });
    axios
      .post(
        `${getEnv(
          "NEXT_PUBLIC_BACKEND_ENDPOINT",
        )}/survey/get_count_audio_record_satisfaction/`,
        { survey_id: surveyId },
      )
      .then((res) => {
        setAudioCount({ count: res.data.count, loading: false });
      })
      .catch((err) => {
        console.error(err);
        setAudioCount({ count: 0, loading: false });
      });
  }, [surveyId]);

  return (
    <>
      <Portal elementId="drawer-portal-action-buttons">
        <MyButton size="small" onClick={openDrawer} className="lg:!hidden">
          <MyIcon icon="FiList" />
          {t("list")}
        </MyButton>
      </Portal>
      <MyDrawer
        firstColOpen={drawerOpen}
        closeFirstCol={closeDrawer}
        firstCol={
          <div className="text-base-content flex min-h-full w-full flex-col gap-my-16 p-my-16 pt-my-64">
            <MyButton
              onClick={getAllData}
              hierarchy={2}
              size="small"
              className="!w-full"
            >
              {t("get_all_data")}
            </MyButton>
            {/* <DatesProvider
              settings={{
                locale,
              }}
            >
              <DatePickerInput
                label={t("date_range")}
                type="range"
                placeholder={t("filter_by_date")}
                value={statsDates}
                onChange={setStatsDates}
              />
            </DatesProvider> */}
            <ListExpandedItem
              title={t("see_summary")}
              onClick={() => setQuestionSelected(0)}
              active={questionSelected === 0}
              icoTitle="FiFile"
            />
            <h2 className="text-lg">{t("Questions")}</h2>
            <div className="flex flex-col gap-my-16">
              {loadingSurvey.getSurvey ? (
                <>
                  <SkeletonQuestion />
                  <SkeletonQuestion />
                  <SkeletonQuestion />
                </>
              ) : (
                questions
                  .slice()
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((el) => (
                    <ListExpandedItem
                      key={el.question_id}
                      active={questionSelected === Number(el.question_id)}
                      onClick={() => {
                        setQuestionSelected(Number(el.question_id));
                        setQuestionTypeSelected(el.question_type); 
                        setQuestionTitleSelected(el.question_text);
                      }}
                      title={el.question_text}
                      helpText={t(el.question_type)}
                    />
                  ))
              )} 
            </div>
          </div>
        }
        secondCol={
          <div className=" items-center gap-xs pt-[144px] lg:pt-my-48">
            <div className=" justify-center">
              {questionSelected !== 0 ? (
                 <MyCard 
                 questionSelected={questionSelected} 
                 question={questionData.question} 
                 answers={questionData.answers} 
                 questionType={questionTypeSelected}
                 questionText={questionTitleSelected}
               /> 
              ) : (
                <>
                  {loadingLogsStats ? (
                    <div>Loading...</div>
                  ) : (
                    <DashboardEstadistic data={statsData} /> 
                  )}
                </>
              )}
            </div>
          </div>
        }
        
      />
    </>
  );
};

export default Page;
