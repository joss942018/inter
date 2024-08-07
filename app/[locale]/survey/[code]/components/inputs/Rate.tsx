import { useContext, useRef } from "react";
import SurveyFlowContext from "../../context/SurveyFlowContext";
import RatingBase from "./base-components/RatingBase";
import { isRating } from "../../helpers/validateTypes";

const Rate = () => {
  const {
    answers: { saveAnswer, answerCurrentQuestion },
    questions: { currentQuestion },
  } = useContext(SurveyFlowContext);
  const focusedAt = useRef(new Date().toISOString());

  const handleSaveAnswer = (value: number) => {
    saveAnswer({
      focused_at: focusedAt.current,
      question_id: currentQuestion?.question_id ?? 0,
      rating_answer: {
        rating: value,
      },
    });
  };

  const currentQuestionData = isRating(currentQuestion?.question_type_data);

  return (
    <RatingBase
      from={currentQuestionData?.rating_from}
      to={currentQuestionData?.rating_to}
      value={answerCurrentQuestion?.rating_answer?.rating}
      onChange={handleSaveAnswer}
      type={currentQuestionData?.rating_question_type}
    />
  );
};

export default Rate;
