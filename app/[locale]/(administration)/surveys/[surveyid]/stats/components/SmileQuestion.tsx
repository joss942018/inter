import { useTranslations } from "next-intl";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SurveyContext from "../../context/SurveyContext";
import SummarySectionContainer from "./summary/SummarySectionContainer";
import { ISmileStats } from "../page";

interface Props {
  title: string;
  questionId: number;
}

const SmileQuestion = ({ title, questionId }: Props) => {
  const t = useTranslations("Surveys");
  const {
    survey: { id: surveyId },
  } = useContext(SurveyContext);

  const [smileStatistics, setSmileStatistics] = useState<ISmileStats[]>([]);

  // const { data: dataSmile } = useQuery(SMILE_STATISTICS_SURVEY_ID, {
  //   variables: {
  //     surveyId,
  //   },
  // });

  // useEffect(() => {
  //   let tempData: ISmileStats[] = [];
  //   if (dataSmile && dataSmile.smileAnswersBySurveyId) {
  //     for (const el of dataSmile.smileAnswersBySurveyId) {
  //       const answer = el?.answer ?? "";
  //       const questionId = Number(el?.question.id ?? 0);
  //       tempData.push({
  //         date: answer,
  //         questionId,
  //       });
  //     }
  //   }
  //   setSmileStatistics(tempData);
  // }, [dataSmile]);

  //Average
  const transformAndCalculate = useCallback(() => {
    const values = smileStatistics
      .filter((el) => el.questionId === questionId)
      .map((el) => Number(el.date));

    //Satisfaction Value
    const satisfactionValues = values.map((value) => {
      if (value <= 20) {
        return 1;
      } else if (value <= 40) {
        return 2;
      } else if (value <= 60) {
        return 3;
      } else if (value <= 80) {
        return 4;
      } else {
        return 5;
      }
    });

    //Average
    const sum = satisfactionValues.reduce((acc, value) => acc + value, 0);
    const average =
      satisfactionValues.length > 0 ? sum / satisfactionValues.length : 0;

    return { average, satisfactionValues };
  }, [smileStatistics, questionId]);

  const { average } = transformAndCalculate();

  return (
    <SummarySectionContainer title={title}>
      {smileStatistics.find((el) => el.questionId === questionId) && (
        <div className="flex flex-col">
          {smileStatistics.find((el) => el.questionId === questionId) && (
            <div className="my-3">
              <p className="secondary-text mb-xs whitespace-nowrap text-center">
                {t("average_satisfaction")}
              </p>
              <div className="flex items-center justify-center">
                <p className="text-heading2 mr-xs">{average.toFixed(1)}</p>
                <span
                  className={`h-l w-l ${
                    Number(average) < 0.5
                      ? "ico-emoji-angry"
                      : Number(average) < 1.5
                        ? "ico-emoji-frown"
                        : Number(average) < 2.5
                          ? "ico-emoji-grin"
                          : Number(average) < 3.5
                            ? "ico-emoji-meh"
                            : "ico-emoji-smile-beam"
                  }`}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </SummarySectionContainer>
  );
};

export default SmileQuestion;
