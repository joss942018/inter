import "dayjs/locale/en";
import "dayjs/locale/es";
import { Fragment, useCallback, useContext } from "react";
import GeneralStatistics from "./summary/GeneralStatistics";
import DevicesStatistics from "./summary/DevicesStatistics";
import RateUsAudios from "./RateUsAudios";
import CompletionRate from "./CompletionRate";
import StatisticsMap from "./summary/StatisticsMap";
import DescClusterQuestion from "./DescClusterQuestion";
import DescEmotionGraph from "./DescEmotionGraph";
import TFQuestion from "./TFQuestion";
import MCQuestion from "./MCQuestion";
import FileQuestion from "./FileQuestion";
import RateQuestion from "./RateQuestion";
import VoiceOnlyQuestion from "./VoiceOnlyQuestion";
import SmileQuestion from "./SmileQuestion";
import { useTranslations } from "next-intl";
import SurveyContext from "../../context/SurveyContext";
import { IAudioCount, ILogsStats } from "../page";

interface IProps {
  loaders: {
    dataKpi: boolean;
    audioCount: boolean;
    logsStats: boolean;
    descriptive: boolean;
  };
  dataKpi?: any;
  audioCount: IAudioCount;
  logsStats: ILogsStats;
}

const Summary = ({ loaders, dataKpi, audioCount, logsStats }: IProps) => {
  const t = useTranslations("Surveys");
  const {
    survey: { id: surveyId, loading: loadingSurvey },
    questions: { questions },
  } = useContext(SurveyContext);

  // const findGeoPosition = useCallback(() => {
  //   const dataLocation =
  //     dataGeolocation?.locationWithEmotion?.emotionWithLocation;
  //   if (!dataLocation) return null;
  //   const formattedData = Object.keys(dataLocation).map((key) => ({
  //     latitude: Number(dataLocation[key].latitude ?? 0),
  //     longitude: Number(dataLocation[key].longitude ?? 0),
  //     altitude: 0,
  //     sentimentScore: Number(dataLocation[key].sentimentScore ?? 0),
  //     emotion: String(dataLocation[key].emotion ?? undefined),
  //     answeredSurveyId: Number(key ?? 0),
  //     surveyId,
  //   }));

  //   return formattedData;
  // }, [dataGeolocation?.locationWithEmotion?.emotionWithLocation, surveyId]);

  return (
    <>
      {/* <StatsFilters filters={filters} setFilters={setFilters} /> */}
      <div className="flex w-full flex-col justify-center gap-my-24 pt-my-24">
        <h4 className="text-h4 w-full pl-my-24">{t("summary")}</h4>
        <GeneralStatistics
          dataKpi={dataKpi}
          audioCount={audioCount}
          logsStats={logsStats}
          loaders={loaders}
        />
        <div className="mx-auto grid w-max grid-flow-dense grid-cols-1 items-center justify-center justify-items-center gap-my-12 px-my-24 pb-my-24 sm:grid-cols-2 2xl:grid-cols-3 min-[1660px]:grid-cols-4">
          {/* <div className="px-my-24 pb-my-24 flex flex-row flex-wrap gap-my-24 w-full justify-center"> */}
          <DevicesStatistics />
          <RateUsAudios />
          <CompletionRate logsStats={logsStats} loading={loaders.logsStats} />
          {/* <StatisticsMap
            coordinates={findGeoPosition() ?? []}
            loading={loadingMap}
          /> */}

          <>
            {/* {questions.map((el) => (
              <Fragment key={el.id}>
                {el.idQuestionType === 1 ? (
                  <div className="stats-card stats-1 sm:stats-2 decorative-border col-span-1 !h-[648px] border sm:col-span-2 sm:!h-[348px]">
                    <div className="stats-title">
                      <p>{el.question}</p>
                    </div>
                    <div className="grid h-[600px] grid-cols-1 grid-rows-2 overflow-hidden sm:h-[300px] sm:grid-cols-2 sm:grid-rows-1">
                      <DescClusterQuestion
                        title={el.question}
                        data={
                          descStatistics.find((el0) => el0.questionId === el.id)
                            ?.cluster
                        }
                        summary
                        loading={loaders.descriptive}
                      />
                      <DescEmotionGraph
                        data={
                          descSentimentPlot?.find(
                            (el0) => el0.questionId === el.id,
                          )?.plot
                        }
                        summary
                        loading={loaders.descriptive}
                      />
                    </div>
                  </div>
                ) : el.idQuestionType === 2 ? (
                  <TFQuestion title={el.question} id={el.id} summary />
                ) : el.idQuestionType === 3 ? (
                  <MCQuestion title={el.question} id={el.id} summary />
                ) : el.idQuestionType === 4 ? (
                  <>
                  </>
                ) : el.idQuestionType === 5 ? (
                  <FileQuestion title={el.question} id={el.id} />
                ) : el.idQuestionType === 6 ? (
                  <RateQuestion
                    title={el.question}
                    data={rateStatistics.find(
                      (el0) => el0.questionId === el.id,
                    )}
                    summary
                  />
                ) : el.idQuestionType === 7 ? (
                  <></>
                ) : el.idQuestionType === 8 ? (
                  <VoiceOnlyQuestion
                    title={el.question}
                    questionId={el.id}
                    audioIds={audioIds}
                  />
                ) : el.idQuestionType === 9 ? (
                  <div className="stats-card stats-1 sm:stats-2 decorative-border col-span-1 !h-[648px] border sm:col-span-2 sm:!h-[348px]">
                    <div className="grid h-full grid-cols-1 overflow-hidden md:grid-cols-2">
                      <TFQuestion title={el.question} id={el.id} />
                      <div className="md:pt-12">
                        <DescEmotionGraph
                          data={
                            descSentimentPlot?.find(
                              (el0) => el0.questionId === el.id,
                            )?.plot
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : el.idQuestionType === 10 ? (
                  <div className="card my-scrollbar flex h-[664px] w-[300px] flex-col gap-xs overflow-hidden p-0 md:h-[354px] md:w-[610px]">
                    <div className="grid h-full grid-cols-1 overflow-hidden md:grid-cols-2">
                      <MCQuestion title={el.question} id={el.id} summary />
                      <div className="md:pt-12">
                        <DescEmotionGraph
                          data={
                            descSentimentPlot?.find(
                              (el0) => el0.questionId === el.id,
                            )?.plot
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : el.idQuestionType === 11 ? (
                  <div className="card my-scrollbar flex h-[664px] w-[300px] flex-col gap-xs overflow-hidden p-0 md:h-[354px] md:w-[610px]">
                    <div className="grid h-full grid-cols-1 overflow-hidden md:grid-cols-2">
                      <RateQuestion
                        title={el.question}
                        data={rateVoiceStatistics.find(
                          (el0) => el0.questionId === el.id,
                        )}
                        summary
                      />
                      <div className="md:pt-12">
                        <DescEmotionGraph
                          data={
                            descSentimentPlot?.find(
                              (el0) => el0.questionId === el.id,
                            )?.plot
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : el.idQuestionType === 12 ? (
                  <SmileQuestion title={el.question} questionId={el.id} />
                ) : el.idQuestionType === 13 ? (
                  <div className="card my-scrollbar flex h-[664px] w-[300px] flex-col gap-xs overflow-hidden p-0 md:h-[354px] md:w-[610px]">
                    <p className="text-heading4 w-full overflow-x-hidden overflow-y-hidden overflow-ellipsis whitespace-nowrap p-s pb-0">
                      {el.question}
                    </p>
                    <div className="grid h-full grid-cols-1 overflow-hidden md:grid-cols-2">
                      <DescEmotionGraph
                        data={
                          descSentimentPlot?.find(
                            (el0) => el0.questionId === el.id,
                          )?.plot
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Fragment>
            ))} */}
          </>
        </div>
      </div>
    </>
  );
};

export default Summary;
