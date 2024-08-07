"use client";

import { useContext, useRef, useState } from "react";
import SurveyFlowContext from "../../context/SurveyFlowContext";
import DateBase from "./base-components/DateBase";
import { isDate } from "../../helpers/validateTypes";
import { DatesRangeValue, DateValue } from "@mantine/dates";
import {IAnswer} from "@/app/[locale]/survey/[code]/helpers/typesQueries";

const DateInput = () => {
  const {
    answers: { saveAnswer, answerCurrentQuestion },
    questions: { currentQuestion },
  } = useContext(SurveyFlowContext);
  const focusedAt = useRef(new Date().toISOString());

  const [value, setValue] = useState<DatesRangeValue | DateValue | null>(null);

  const handleSaveAnswer = (value: DatesRangeValue | DateValue | null) => {
    if (!value) return;

    setValue(value);

    const dateAnswer: IAnswer["date_answer"] = Array.isArray(value)
        ? { date_from: value[0]?.toISOString() || '', date_to: value[1]?.toISOString() || '' }
        : { date_from: (value as Date).toISOString() };

    saveAnswer({
      focused_at: focusedAt.current,
      question_id: currentQuestion?.question_id ?? 0,
      date_answer: dateAnswer,
    });
  };

  const currentQuestionData = isDate(currentQuestion?.question_type_data);

  return (
      <DateBase
          value={value}
          saveAnswer={handleSaveAnswer}
          range={currentQuestionData?.range}
          withTime={currentQuestionData?.include_time}
      />
  );
};

export default DateInput;
