import "dayjs/locale/en";
import "dayjs/locale/es";
import TFQuestion from "./TFQuestion";
import MCQuestion from "./MCQuestion";
import DescClusterQuestion from "./DescClusterQuestion";
import DescEmotionGraph, { IEmotionGraph } from "./DescEmotionGraph";
import RateQuestion, { IRateStats } from "./RateQuestion";
import DateQuestion from "./DateQuestion";
import CredentialQuestion from "./CredentialQuestion";
import FileQuestion from "./FileQuestion";
import VoiceOnlyQuestion from "./VoiceOnlyQuestion";
import SmileQuestion from "./SmileQuestion";
import { useTranslations } from "next-intl";
import {
  IClusterDescStats,
  ICredStats,
  IDateStats,
  IFileStats,
  ILogsStats,
  IMcStats,
  ISmileStats,
  ITFStats,
  IVoiceOnlyStats,
} from "../page";
import { useCallback } from "react";

interface IProps {
  tfStatistics: ITFStats;
  mcStatistics: IMcStats;
  descStatistics: {
    questionId: number;
    cluster: IClusterDescStats[];
  }[];
  rateStatistics: IRateStats[];
  dateStatistics: IDateStats[];
  credStatistics: ICredStats[];
  fileStatistics: IFileStats[];
  voiceOnlyStatistics: IVoiceOnlyStats[];
  smileStatistics: ISmileStats[];
  questionSelected: number;
  questions: any[];
  // questions: IQuestion[];
  logsStats: ILogsStats;
  descSentimentPlot: { questionId: number; plot: IEmotionGraph }[];
  audioIds: number[];
}

const StatsQuestion = ({
  tfStatistics,
  mcStatistics,
  descStatistics,
  rateStatistics,
  dateStatistics,
  credStatistics,
  fileStatistics,
  voiceOnlyStatistics,
  smileStatistics,
  questionSelected,
  questions,
  logsStats,
  descSentimentPlot,
  audioIds,
}: IProps) => {
  const t = useTranslations("Surveys");

  const findTF = useCallback(
    (id: string | number) => tfStatistics[Number(id)],
    [tfStatistics],
  );

  const findMc = useCallback(
    (id: string | number) => {
      return mcStatistics[Number(id)];
    },
    [mcStatistics],
  );

  const findDesc = useCallback(
    (id: string | number) => {
      return descStatistics.find((el) => el.questionId === Number(id));
    },
    [descStatistics],
  );

  return (
    <div>
      {!!findTF(questionSelected) ? (
        <TFQuestion
          title={
            questions.find((el) => el.id === questionSelected)?.question ?? ""
          }
          id={questionSelected}
        />
      ) : !!findMc(questionSelected) ? (
        <MCQuestion
          title={
            questions.find((el) => el.id === questionSelected)?.question ?? ""
          }
          id={questionSelected}
        />
      ) : !!findDesc(questionSelected) ? (
        <div className="card grid h-full w-full grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
          <DescClusterQuestion
            title={
              questions.find((el) => el.id === questionSelected)?.question ?? ""
            }
            data={
              descStatistics.find((el0) => el0.questionId === questionSelected)
                ?.cluster
            }
          />
          <DescEmotionGraph
            data={
              descSentimentPlot?.find(
                (el) => el.questionId === questionSelected,
              )?.plot
            }
          />
        </div>
      ) : !!rateStatistics.find((el) => el.questionId === questionSelected) ? (
        <RateQuestion
          title={
            questions.find((el) => el.id === questionSelected)?.question ?? ""
          }
          data={rateStatistics.find((el) => el.questionId === questionSelected)}
        />
      ) : !!dateStatistics.find((el) => el.questionId === questionSelected) ? (
        <DateQuestion
          title={
            questions.find((el) => el.id === questionSelected)?.question ?? ""
          }
          id={questionSelected}
        />
      ) : credStatistics.find((el) => el.questionId === questionSelected) ? (
        <CredentialQuestion
          title={
            questions.find((el) => el.id === questionSelected)?.question ?? ""
          }
          id={questionSelected}
        />
      ) : fileStatistics.find((el) => el.questionId === questionSelected) ? (
        <FileQuestion
          title={
            questions.find((el) => el.id === questionSelected)?.question ?? ""
          }
          id={questionSelected}
        />
      ) : voiceOnlyStatistics.find(
          (el) => el.questionId === questionSelected,
        ) ? (
        <VoiceOnlyQuestion
          title={
            questions.find((el) => el.id === questionSelected)?.question ?? ""
          }
          questionId={questionSelected}
          audioIds={audioIds}
        />
      ) : smileStatistics.find((el) => el.questionId === questionSelected) ? (
        <SmileQuestion
          title={
            questions.find((el) => el.id === questionSelected)?.question ?? ""
          }
          questionId={questionSelected}
        />
      ) : (
        <></>
      )}
      <div className="decorative-border mx-auto my-4 w-max rounded-md border bg-white p-4 dark:bg-neutral-800">
        <p className="font-bold">
          {JSON.stringify(
            logsStats.questions_reached[
              questions
                .sort((a, b) => a.orderOfQuestion - b.orderOfQuestion)
                .findIndex((el) => el.id === questionSelected)
            ].count,
          )}{" "}
          {t("response")}(s)
        </p>
      </div>
    </div>
  );
};

export default StatsQuestion;
