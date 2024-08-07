import { useTranslations } from "next-intl";
import { useContext, useEffect, useRef, useState } from "react";
import SurveyFlowContext from "../../context/SurveyFlowContext";
import { isOpen } from "../../helpers/validateTypes";
import useRecorder from "../../hooks/useRecorder";
import OpenBase from "./base-components/OpenBase";

const Open = () => {
  const t = useTranslations("SRSurvey");
  const [option, setOption] = useState<0 | 1 | 2>(0); // 0 = none, 1 = microphone, 2 = input
  const focusedAt = useRef(new Date().toISOString());
  const {
    answers: {
      saveAnswer,
      uploadAudio,
      loading,
      deleteAnswer,
      answerCurrentQuestion,
    },
    questions: { currentQuestion },
  } = useContext(SurveyFlowContext);

  const onFinishedRecording = (mediaBlobUrl: string) => {
    uploadAudio(mediaBlobUrl);
  };

  const recorderProps = useRecorder({ onFinishedRecording });
  const handleSaveAnswer = (value?: string, file?: File) => {
    saveAnswer({
      focused_at: focusedAt.current,
      question_id: currentQuestion?.question_id ?? 0,
      open_answer: { text: value ?? "" },
    });
  };

  useEffect(() => {
    if (answerCurrentQuestion) {
      const text = String(answerCurrentQuestion.open_answer?.text);
      if (text.startsWith("blob:") && option !== 1) {
        setOption(1);
      } else if (text.length > 0 && option !== 2) {
        setOption(2);
      } else if (text.length === 0 && option !== 0) {
        setOption(0);
      }
    }
  }, [answerCurrentQuestion, option]);

  const currentQuestionData = isOpen(currentQuestion?.question_type_data);

  return (
    <OpenBase
        value={answerCurrentQuestion?.open_answer?.text}
        option={option}
        setOption={setOption}
        type={currentQuestionData?.open}
        onChange={handleSaveAnswer}
        recorderProps={recorderProps}
        loadingUpload={loading.isPendingUploadAudio}
        src={recorderProps.mediaBlobUrl || "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3"}
    />
  );
};

export default Open;
