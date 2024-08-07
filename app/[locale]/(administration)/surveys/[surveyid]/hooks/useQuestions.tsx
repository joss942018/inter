import getEnv from "@/helpers/Env";
import { myMutation, myQuery } from "@/helpers/Fetch";
import {
  IAllQuestionsValidation,
  validateAllQuestions,
} from "@/helpers/Questions";
import {
  TypeCredential,
  TypeOpenQuestion,
  TypeQuestion,
  TypeRatingQuestion,
} from "@/types/TypesDB";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Key } from "react-hook-form/dist/types/path/common";

export interface IQuestion {
  survey: number;
  question_id: number;
  question_text: string;
  question_type: TypeQuestion;
  required: boolean;
  order?: number;
  mc_question?: {
    more_than_one: boolean;
  };
  date_question?: {
    range: boolean;
    include_time: true;
  };
  credential_question?: {
    credential_type: TypeCredential;
  };
  open_question?: {
    open_question_type: TypeOpenQuestion;
  };
  rating_question?: {
    rating_question_type: TypeRatingQuestion;
    rating_from: number;
    rating_to: number;
  };
  file_question?: {
    multiple: boolean;
  };
}

const initialQuestion: IQuestion = {
  survey: 0,
  question_id: 0,
  question_text: "",
  question_type: "open",
  required: true,
  open_question: {
    open_question_type: "audio_text",
  },
  orderOfQuestion: undefined,
  id: undefined,
  question: "",
  idQuestionType: function (idQuestionType: any) {
    throw new Error("Function not implemented.");
  }
};

interface ICombobox {
  value: string;
  label: string;
}

interface IProps {
  surveyid: number;
}

const useQuestions = ({ surveyid }: IProps): IUseQuestions => {
  // hooks
  const session = useSession();
  const queryClient = useQueryClient();

  // states
  // const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [allQuestionsValidation, setAllQuestionsValidation] =
    useState<IAllQuestionsValidation>({
      validado: false,
      errorType: null,
    });

  // queries
  const { data: questions, isLoading } = useQuery({
    queryKey: [`/api/v1/survey/questions`, surveyid],
    queryFn: myQuery<IQuestion[]>({
      token: session?.data?.user.token,
    }),
    initialData: [],
  });

  const { data: questionTypes, isLoading: isLoadingQuestionTypes } = useQuery({
    queryKey: [`/api/v1/survey/question_type/`],
    queryFn: myQuery<ICombobox[]>({
      token: session?.data?.user.token,
    }),
    initialData: [],
  });

  const { data: openQuestionTypes, isLoading: isLoadingOpenQuestionTypes } =
    useQuery({
      queryKey: [`/api/v1/survey/open_question_type/`],
      queryFn: myQuery<ICombobox[]>({
        token: session?.data?.user.token,
      }),
      initialData: [],
    });

  const { data: fileTypes, isLoading: isLoadingFileTypes } = useQuery({
    queryKey: [`/api/v1/survey/file_type/`],
    queryFn: myQuery<ICombobox[]>({
      token: session?.data?.user.token,
    }),
    initialData: [],
  });

  // const getQuestions = useCallback(async () => {
  //   const res = await fetch(
  //     `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/survey/questions/${surveyid}/`,
  //     {
  //       headers: {
  //         Authorization: `Token ${session?.data?.user.token}`,
  //       },
  //     },
  //   );
  //   if (!res.ok) return;
  //   const data = await res.json();
  //   setQuestions(data);
  // }, [surveyid, session.data?.user.token]);

  // useEffect(() => {
  //   getQuestions();
  // }, [getQuestions]);

  // mutations
  const { mutate: newQuestion, isPending: isPendingNewQuestion } = useMutation({
    mutationFn: myMutation<
      Omit<IQuestion, "question_id"> & { question_id?: number }
    >({
      url: "/api/v1/survey/question/",
      token: session?.data?.user.token,
    }),
    onSuccess: (data: IQuestion) => {
      queryClient.setQueryData(
        [`/api/v1/survey/questions`, surveyid],
        (oldData: IQuestion[]) => [...oldData, data],
      );
      queryClient.invalidateQueries({
        queryKey: [`/api/v1/survey/survey_flow`, surveyid],
      });
    },
  });

  const [idQuestionUpdating, setIdQuestionUpdating] = useState(0);
  const { mutate: updateQuestion, isPending: isPendingUpdateQuestion } =
    useMutation({
      mutationFn: async (data: IQuestion) => {
        console.log("UPDATE!!!", data, session.data?.user.token);
        const res = await fetch(
          `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/survey/question/${data.question_id}/`,
          {
            method: "PUT",
            headers: {
              Authorization: `Token ${session?.data?.user.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );
        if (!res.ok) return;
        return await res.json();
      },
      // mutationFn: myMutation<IQuestion>({
      //   url: "/api/v1/survey/question/",
      //   token: session?.data?.user.token,
      //   method: "PUT",
      // }),
      onSettled: () => setIdQuestionUpdating(0),
      onSuccess: (data: IQuestion) => {
        queryClient.invalidateQueries({
          queryKey: [`/api/v1/survey/questions`, surveyid],
        });
        queryClient.invalidateQueries({
          queryKey: [`/api/v1/survey/survey_flow`, surveyid],
        });
      },
    });

  const [idQuestionDeleting, setIdQuestionDeleting] = useState(0);
  const { mutate: deleteQuestion } = useMutation({
    mutationFn: async (question_id: number) => {
      const res = await fetch(
        `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/survey/question/${question_id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${session?.data?.user.token}`,
          },
        },
      );
      if (!res.ok) return;
      return await res.json();
    },
    // mutationFn: myMutation({
    //   url: "/api/v1/survey/question/",
    //   token: session?.data?.user.token,
    //   method: "DELETE",
    // }),
    onSettled: () => setIdQuestionDeleting(0),
    onSuccess: (data: { question_id: number; question_text: string }) => {
      queryClient.setQueryData(
        [`/api/v1/survey/questions`, surveyid],
        (oldData: IQuestion[]) =>
          oldData.filter(
            (el) => Number(el.question_id) !== Number(data.question_id),
          ),
      );
      queryClient.invalidateQueries({
        queryKey: [`/api/v1/survey/survey_flow`, surveyid],
      });
    },
  });

  const { mutate: deleteOptionsMutation } = useMutation({
    mutationFn: myMutation({
      url: "/api/v1/survey/question/options/",
      token: session?.data?.user.token,
      method: "DELETE",
    }),
  });

  // other logic

  useEffect(() => {
    setAllQuestionsValidation(
      validateAllQuestions(questions?.map((el) => el.question_text) ?? []),
    );
  }, [questions]);

  const deleteOptions = (questionId: number) => {
    deleteOptionsMutation({});
    // if (!res.errors) await getSurvey();
  };

  const newQ = () => {
    newQuestion({
      ...initialQuestion,
      survey: surveyid,
      question_id: undefined,
      question_text: "New question",
    });
  };

  const deleteQ = (id: number) => {
    setIdQuestionDeleting(id);
    deleteQuestion(id);
  };

  const updateQ = (data: IQuestion) => {
    setIdQuestionUpdating(data.question_id);
    updateQuestion(data);
  };

  const timerUpdate = useRef<ReturnType<typeof setInterval> | null>(null);
  // const updateQ = useCallback(async (data: IQuestion) => {
  //   if (timerUpdate.current) clearTimeout(timerUpdate.current);
  //   timerUpdate.current = setTimeout(() => {
  //     setQuestions((q) =>
  //       q.map((el) => (el.id === data.id ? { ...el, ...data } : el)),
  //     );
  //   }, 500);
  // }, []);

  // this will handle all the updates to the questions
  const compareAndUploadQuestions = () => {
    // for (const el of questions) {
    //   const foundQuestion =
    //     questions
    //       .slice()
    //       .find((el0) => Number(el0.question_id) === el.question_id) ?? null;
    //   if (!foundQuestion) continue;
    //   const tempEl = {
    //     id: Number(foundQuestion.question_id),
    //     // isOptional: foundQuestion.isOptional,
    //     // question: foundQuestion.questionText,
    //     // idQuestionType: getQuestionTypeNumber(foundQuestion.questionType),
    //     // negAnswer: foundQuestion.negativeAnswer ? 1 : 0,
    //     // specifyReason: foundQuestion.specifyReason,
    //     // orderOfQuestion: Number(foundQuestion.orderOfQuestion),
    //   };
    //   console.log(tempEl, el);
    //   if (_.isEqual(el, tempEl)) return;
    //   const a = async () => {
    //     // await createUpdateQuestion({
    //     //   variables: {
    //     //     id: el.id,
    //     //     questionText: el.question,
    //     //     questionType: getQuestionTypeString(el.idQuestionType),
    //     //     survey: id,
    //     //     specifyReason: el.specifyReason,
    //     //     orderOfQuestion: el.orderOfQuestion,
    //     //     isOptional: el.isOptional,
    //     //   },
    //     //   onError: (error) => {
    //     //     console.error(error);
    //     //   },
    //     // });
    //   };
    //   a();
    // }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      compareAndUploadQuestions();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return {
    questions,
    newQ,
    deleteQ,
    updateQ,
    deleteOptions,
    loading: {
      fetchQ: isLoading,
      newQ: isPendingNewQuestion,
      updateQ: [idQuestionUpdating, isPendingUpdateQuestion],
      deleteQ: [idQuestionDeleting, true],
      fetchTypes: isLoadingQuestionTypes,
      fetchOpenQuestionTypes: isLoadingOpenQuestionTypes,
      fetchFileTypes: isLoadingFileTypes,
    },
    allQuestionsValidation,
    questionTypes,
    openQuestionTypes,
    credentialTypes: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
    ],
    fileTypes,
  };
};

export default useQuestions;

export interface IUseQuestions {
  questions: IQuestion[];
  newQ: () => void;
  deleteQ: (id: number) => void;
  updateQ: (data: IQuestion) => void;
  deleteOptions: (id: number) => void;
  loading: {
    fetchQ: boolean;
    newQ: boolean;
    updateQ: [number, boolean];
    deleteQ: [number, boolean];
    fetchTypes: boolean;
    fetchOpenQuestionTypes: boolean;
    fetchFileTypes: boolean;
  };
  allQuestionsValidation: IAllQuestionsValidation;
  questionTypes: ICombobox[];
  openQuestionTypes: ICombobox[];
  credentialTypes: ICombobox[];
  fileTypes: ICombobox[];
}
