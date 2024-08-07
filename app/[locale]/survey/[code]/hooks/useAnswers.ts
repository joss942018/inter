import getEnv from "@/helpers/Env";
import { myMutation } from "@/helpers/Fetch";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IAnswer } from "../helpers/typesQueries";
import { useDebouncedCallback } from "@mantine/hooks";

interface IProps {
  currentQuestionId: number;
  answerId?: number | null;
}

const useAnswers = ({ currentQuestionId, answerId }: IProps): IUseAnswers => {
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [savedAnswers, setSavedAnswers] = useState<IAnswer[]>([]);

  const { mutateAsync: uploadAnswerAsync, isPending: isPendingSaveAnswer } =
      useMutation({
        mutationFn: myMutation<IAnswer>({
          url: "/api/v1/client_response/answer/create/",
        }),
      });

  const { mutateAsync: updateAnswerAsync, isPending: isPendingUpdateAnswer } =
      useMutation({
        mutationFn: myMutation<IAnswer>({
          url: "/api/v1/client_response/answer/update/",
          method: 'PUT',
        }),
      });
  useEffect(() => {
    console.log("SAVED ANSWERS", savedAnswers);
  }, [savedAnswers]);

  const uploadAnswer = useDebouncedCallback(async (answer: IAnswer) => {
    try {
      let response: any;
      if (!savedAnswers.find((el) => el.question_id === answer.question_id))
        response = await uploadAnswerAsync(answer);
      else response = await updateAnswerAsync(answer);
      console.log("RESPONSE FROM SERVER", response);
      const index = savedAnswers.findIndex(
          (el) => el.question_id === answer.question_id,
      );
      if (index !== -1) {
        let savedAnswersTemp = [...savedAnswers];
        savedAnswersTemp[index] = answer;
        setSavedAnswers(savedAnswersTemp);
        return;
      }
      setSavedAnswers((a) => [...a, answer]);
    } catch (error) {
      console.error(error);
    }
  }, 1500);

  const { mutate: uploadAudio, isPending: isPendingUploadAudio } = useMutation({
    mutationFn: async (mediaBlobUrl: string) => {
      const audio = await fetch(mediaBlobUrl).then((r) => r.blob());
      const formData = new FormData();
      formData.append("answer_id", answerId?.toString() ?? "0");
      formData.append("question_id", currentQuestionId.toString());
      formData.append("audio", audio);
      for (const el of formData.entries()) {
        console.log(el);
      }
      const response = await fetch(
          getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT") +
          "/api/v1/client_response/answer/upload_open_question/",
          { body: formData, method: "POST" },
      );
      return response;
    },
    onSuccess: () => {
      console.log("SHOW AUDIO ON FRONTEND");
    },
  });

  const { mutate: uploadFile, isPending: isPendingUploadFile } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
          getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT") + "/streaming/upload_file/",
          { body: JSON.stringify(formData) },
      );
      return response;
    },
    onSuccess: () => {
      console.log("SHOW FILE ON FRONTEND");
    },
  });

  const { mutateAsync: uploadRateUs, isPending: isPendingUploadRateUs } = useMutation<number, Error, { rating: number, answer: number }>({
    mutationFn: async ({ rating, answer }) => {
      const response = await fetch(
          getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT") + "/api/v1/client_response/answer_feedback/",
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating, answer }),
          }
      );

      if (!response.ok) {
        throw new Error('Failed to upload rate');
      }

      const data = await response.json();
      return data.id; // Asegúrate de que estás retornando el id aquí
    },
  });

  const { mutate: deleteAnswer, isPending: isPendingDeleteAnswer } =
      useMutation({
        mutationFn: myMutation({
          url:
              getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT") + "/streaming/upload_rate_us/",
        }),
      });

  const answerCurrentQuestion = answers.find(
      (answer) => answer.question_id === currentQuestionId,
  );

  const saveAnswer = (answer: Omit<IAnswer, "answer_id">) => {
    uploadAnswer({ ...answer, answer_id: answerId ?? 0 });
    const foundAnswer = answers.find(
        (el) => el.question_id === answer.question_id,
    );
    if (!foundAnswer) {
      setAnswers((a) => [...a, { ...answer, answer_id: answerId ?? 0 }]);
      return;
    }
    let answersTemp = [...answers];
    answersTemp = answersTemp.map((el) =>
        el.question_id === answer.question_id
            ? { ...answer, answer_id: answerId ?? 0 }
            : el,
    );
    setAnswers(answersTemp);
  };

  //console.log("FALTA IMPLEMENTAR LOS FOCUSED AT!!!");

  return {
    saveAnswer,
    answerCurrentQuestion,
    uploadAudio,
    uploadFile,
    uploadRateUs,
    deleteAnswer,
    loading: {
      isPendingSaveAnswer,
      isPendingUpdateAnswer,
      isPendingUploadAudio,
      isPendingUploadFile,
      isPendingUploadRateUs,
      isPendingDeleteAnswer,
    },
  };
};

export default useAnswers;

export interface IUseAnswers {
  saveAnswer: (answer: Omit<IAnswer, "answer_id">) => void;
  answerCurrentQuestion: IAnswer | undefined;
  uploadAudio: (mediaBlobUrl: string) => void;
  uploadFile: (file: File) => void;
  uploadRateUs: (data: { rating: number, answer: number }) => Promise<number>;
  deleteAnswer: (answerId: number) => void;
  loading: {
    isPendingSaveAnswer: boolean;
    isPendingUpdateAnswer: boolean;
    isPendingUploadAudio: boolean;
    isPendingUploadFile: boolean;
    isPendingUploadRateUs: boolean;
    isPendingDeleteAnswer: boolean;
  };
}
