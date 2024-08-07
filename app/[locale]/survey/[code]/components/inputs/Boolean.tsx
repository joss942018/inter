import { useContext, useRef } from "react";
import SurveyFlowContext from "../../context/SurveyFlowContext";
import BooleanBase from "./base-components/BooleanBase";

const Boolean = () => {
  const {
    answers: { saveAnswer, answerCurrentQuestion },
    questions: { currentQuestion },
  } = useContext(SurveyFlowContext);
  const focusedAt = useRef(new Date().toISOString());

  const handleSaveAnswer = (value: boolean) => {
    saveAnswer({
      focused_at: focusedAt.current,
      question_id: currentQuestion?.question_id ?? 0,
      boolean_answer: { answer: value },
    });
  };

  return (
    <BooleanBase
      value={answerCurrentQuestion?.boolean_answer?.answer}
      saveAnswer={handleSaveAnswer}
    />
  );
};

export default Boolean;
