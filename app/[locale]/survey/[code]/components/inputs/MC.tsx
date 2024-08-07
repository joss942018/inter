import { useContext, useRef } from "react";
import SurveyFlowContext from "../../context/SurveyFlowContext";
import MCBase from "./base-components/MCBase";
import { isMC } from "../../helpers/validateTypes";

const MC = () => {
  const {
    answers: { saveAnswer, answerCurrentQuestion },
    questions: { currentQuestion },
  } = useContext(SurveyFlowContext);
  const focusedAt = useRef(new Date().toISOString());

  const handleSaveAnswer = (value: (number | string)[] | undefined) =>
    saveAnswer({
      focused_at: focusedAt.current,
      question_id: currentQuestion?.question_id ?? 0,
      mc_answer: value?.map((el) => ({ mc_question_option: Number(el) })),
    });

  const currentQuestionData = isMC(currentQuestion?.question_type_data);

  return (
    <MCBase
      value={
        answerCurrentQuestion?.mc_answer?.map(
          (el) => el.mc_question_option,
        ) as (number | string)[]
      }
      options={
        currentQuestionData?.options.map((el) => ({
          id: el.id,
          option: el.option_text,
          order: el.order,
        })) ?? []
      }
      multiple={currentQuestionData?.more_than_one}
      onChange={handleSaveAnswer}
    />
  );
};

export default MC;
