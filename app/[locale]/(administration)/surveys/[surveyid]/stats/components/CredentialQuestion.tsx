import { useTranslations } from "next-intl";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SurveyContext from "../../context/SurveyContext";
import { ICredStats } from "../page";
import SummarySectionContainer from "./summary/SummarySectionContainer";

interface Props {
  title: string;
  id: number;
  summary?: boolean;
}

const CredentialQuestion = ({ title, id, summary }: Props) => {
  const t = useTranslations("Surveys");
  const {
    survey: { id: surveyId },
  } = useContext(SurveyContext);
  const [credStatistics, setCredStatistics] = useState<ICredStats[]>([]);

  // useEffect(() => {
  //   let tempCred: ICredStats[] = [];
  //   if (dataCredential && dataCredential.credentialAnswerBySurveyId) {
  //     for (const el of dataCredential.credentialAnswerBySurveyId) {
  //       const answer = el?.answer ?? "";
  //       const questionId = Number(el?.question.id ?? 0);
  //       tempCred.push({
  //         date: answer,
  //         questionId,
  //       });
  //     }
  //   }
  //   setCredStatistics(tempCred);
  // }, [dataCredential]);

  return (
    <SummarySectionContainer title={title} summary={summary}>
      {credStatistics.find((el) => el.questionId === id) && (
        <div className="flex flex-col gap-xs px-s">
          {credStatistics
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

export default CredentialQuestion;
