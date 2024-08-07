import { useTranslations } from "next-intl";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SurveyContext from "../../context/SurveyContext";
import SummarySectionContainer from "./summary/SummarySectionContainer";
import axios from "axios";
import getEnv from "@/helpers/Env";
import { index } from "mathjs";
import { IVoiceOnlyStats } from "../page";

interface Props {
  title: string;
  questionId: number;
  audioIds: number[];
}

const VoiceOnlyQuestion = ({ title, questionId, audioIds }: Props) => {
  const t = useTranslations("Surveys");
  const {
    survey: { id: surveyId },
  } = useContext(SurveyContext);

  const [surveySelected, setSurveySelected] = useState(0);

  const [voiceOnlyStatistics, setVoiceOnlyStatistics] = useState<
    IVoiceOnlyStats[]
  >([]);

  const getAudioVoiceOnly = async (audio_id: number) => {
    // Use Axios to send a GET request with the data
    try {
      const response = await axios({
        url: `${getEnv(
          "NEXT_PUBLIC_BACKEND_ENDPOINT",
        )}/streaming/get_voice_only_answer_by_id/${audio_id}/`,
        method: "GET",
        responseType: "blob", // Specify that the response should be treated as a binary blob
      });

      // Create a blob object from the response data
      const blob = new Blob([response.data]);

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);
      return blobUrl;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAudio = async (answered_survey_id: number, question_id: number) => {
    try {
      const response = await axios({
        url: `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/streaming/get_audio/`,
        method: "GET",
        params: {
          answered_survey_id,
          question_id,
        },
        responseType: "blob", // Specify that the response should be treated as a binary blob
      });

      // Create a blob object from the response data
      const blob = new Blob([response.data]);

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      return blobUrl;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   const fetchAudioAndSetStats = async () => {
  //     let tempVoice: IVoiceOnlyStats[] = [];

  //     if (dataVoiceOnly && dataVoiceOnly.voiceOnlyAnswersBySurveyId) {
  //       for (const voiceAnswer of dataVoiceOnly.voiceOnlyAnswersBySurveyId) {
  //         const audioId = voiceAnswer?.id || 0;
  //         if (audioId && audioIds.includes(Number(audioId))) {
  //           const audioUrl = await getAudioVoiceOnly(Number(audioId));

  //           tempVoice.push({
  //             audioFile: audioUrl,
  //             questionId: questionId,
  //             audioId: Number(audioId),
  //           });
  //         }
  //       }

  //       setVoiceOnlyStatistics(tempVoice);
  //     }
  //   };

  //   fetchAudioAndSetStats();
  // }, [dataVoiceOnly, audioIds]);

  return (
    <SummarySectionContainer title={title}>
      {voiceOnlyStatistics.find((el) => el.questionId === questionId) && (
        <div className="flex flex-col gap-s">
          {voiceOnlyStatistics
            .filter((el) => el.questionId === questionId)
            .map((el, index) => (
              <div key={index} className="mx-auto my-3">
                <audio src={el.audioFile} controls className="w-60">
                  Your browser doesn&apos;t support HTML5 audio
                </audio>
              </div>
            ))}
        </div>
      )}
    </SummarySectionContainer>
  );
};

export default VoiceOnlyQuestion;
