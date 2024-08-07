import React, { useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { IDateStats } from "../page";
import SurveyContext from "../../context/SurveyContext";
import SummarySectionContainer from "./summary/SummarySectionContainer";
interface Props {
  title: string;
  id: number;
  summary?: boolean;
}

const DateQuestion = ({ title, id, summary }: Props) => {
  const t = useTranslations("Surveys");
  const {
    survey: { id: surveyId },
  } = useContext(SurveyContext);
  const [dateStatistics, setDateStatistics] = useState<IDateStats[]>([]);
  // const { data: dataDate } = useQuery(DATE_STATISTICS_SURVEY_ID, {
  //   variables: {
  //     surveyId,
  //   },
  // });
  // useEffect(() => {
  //   // const example = [
  //   //   {
  //   //     questionId: 1,
  //   //     date: new Date(),
  //   //   },
  //   //   {
  //   //     questionId: 100,
  //   //     date: new Date(),
  //   //   },
  //   // ];
  //   let tempData: IDateStats[] = [];
  //   if (dataDate && dataDate.dateAnswerBySurveyId) {
  //     for (const el of dataDate.dateAnswerBySurveyId) {
  //       const answer = el?.answer ?? "";
  //       const questionId = Number(el?.question.id ?? 0);
  //       tempData.push({
  //         date: answer,
  //         questionId,
  //       });
  //     }
  //   }
  //   setDateStatistics(tempData);
  // }, [dataDate]);
  return (
    <SummarySectionContainer title={title} summary={summary}>
      {dateStatistics.find((el) => el.questionId === id) && (
        <div className="flex flex-col">
          {dateStatistics
            .filter((el) => el.questionId === id)
            .map((el, index) => (
              <div key={index} className="date-item">
                {el.date}
              </div>
            ))}
        </div>
      )}
    </SummarySectionContainer>
  );
};

export default DateQuestion;
