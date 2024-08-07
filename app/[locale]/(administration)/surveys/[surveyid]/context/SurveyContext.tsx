"use client";

import useEmail, { IUseEmail } from "@/app/hooks/useEmail";
import useLogo, { IUseLogo } from "@/app/hooks/useLogo";
import useZod from "@/app/hooks/useZod";
import getEnv from "@/helpers/Env";
import { myMutation } from "@/helpers/Fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import useQuestions, { IQuestion, IUseQuestions } from "../hooks/useQuestions";
import useSurveyFlow, {
  ISurveyFlow,
  IUseSurveyFlow,
} from "../hooks/useSurveyFlow";

const SurveyContext = createContext({} as ISurveyContext);

export interface ISurvey {
  id: number;
  name: string;
  language: string;
  active: boolean;
  scheduled: boolean;
  category_id?: number | null | undefined;
  scheduled_from?: Date | null | undefined;
  scheduled_to?: Date | null | undefined;
  logo?: string | null | undefined;
  theme?: number | null | undefined;
}

const initialFormData: ISurvey = {
  id: 0,
  name: "",
  category_id: 0,
  language: "eng",
  active: false,
  scheduled: false,
  scheduled_from: null,
  scheduled_to: null,
  logo: null,
  theme: 0,
};

interface Props {
  children: React.ReactNode;
}

const SurveyProvider = ({ children }: Props) => {
  const params = useParams<{ surveyid: string }>();
  const session = useSession();
  const t = useTranslations("Surveys");
  const surveyFlow = useSurveyFlow({ surveyid: Number(params.surveyid) ?? 0 });
  const questions = useQuestions({ surveyid: Number(params.surveyid ?? 0) });

  const [redirect, setRedirect] = useState(false);

  const email = useEmail({ id: Number(params.surveyid) });

  const myZ = useZod();
  const schema = myZ
    .object({
      id: myZ.number(),
      name: myZ.string().min(1),
      category_id: myZ.number().optional().nullable(),
      language: myZ.string().trim().min(1),
      active: myZ.boolean(),
      scheduled: myZ.boolean(),
      scheduled_from: myZ.date().optional().nullable(),
      scheduled_to: myZ.date().optional().nullable(),
      logo: myZ.string().optional().nullable(),
      theme: myZ.number().optional().nullable(),
    })
    .refine(
      (data) =>
        data.scheduled ? data.scheduled_from && data.scheduled_to : true,
      {
        message: t("must_select_dates"),
        path: ["scheduled_from"],
      },
    )
    .refine(
      (data) =>
        data.scheduled && data.scheduled_from && data.scheduled_to
          ? data.scheduled_from < data.scheduled_to
          : true,
      {
        message: t("end_date_must_after_start"),
        path: ["scheduled_to"],
      },
    );
  const form = useForm<ISurvey>({
    defaultValues: initialFormData,
    resolver: zodResolver(schema),
  });

  const [isLoadingGetSurvey, setIsLoadingGetSurvey] = useState(false);
  const fetchData = async () => {
    setIsLoadingGetSurvey(true);
    const res = await fetch(
      `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/survey/survey/${params.surveyid}`,
      {
        headers: {
          Authorization: `Token ${session?.data?.user.token}`,
        },
      },
    );
    setIsLoadingGetSurvey(false);
    if (!res.ok) return;
    const surveyData = await res.json();
    form.reset({
      ...surveyData,
    });
  };
  useEffect(() => {
    if (Number(params.surveyid) > 0) {
      fetchData();
    }
  }, [params.surveyid]);

  // mutations
  const { mutateAsync: updateSurvey, isPending: isPendingUpdateSurvey } =
    useMutation({
      mutationFn: myMutation<ISurvey>({
        url: `/api/v1/survey/survey/${params.surveyid}/`,
        method: "PUT",
        token: session.data?.user.token,
      }),
    });

  const onSubmit = async (data: ISurvey) => {
    await updateSurvey({
      ...data,
      theme: Number(data.theme) > 0 ? data.theme : 1,
    });
  };

  const logo = useLogo({ id: Number(params.surveyid), fetchData });

  const {
    formState: { isSubmitSuccessful },
  } = form;
  useEffect(() => {
    if (isSubmitSuccessful) {
      fetchData();
    }
  }, [isSubmitSuccessful]);

  const [openedFlowElId, setOpenedFlowElId] = useState(0);
  const openedSF = surveyFlow.flow.find((el) => el.id === openedFlowElId);
  const openedQ = questions.questions.find(
    (el) => el.question_id === openedSF?.question,
  );
  const openedFlowElement = openedSF &&
    openedQ && {
      ...openedSF,
      ...openedQ,
    };

  return (
    <SurveyContext.Provider
      value={{
        languages:
          [
            {
              label: "English",
              value: "eng",
            },
            {
              label: "Español",
              value: "spa",
            },
          ] ?? [],
        survey: {
          id: Number(params.surveyid),
          form,
          onSubmit,
          logo,
          loading: {
            getSurvey: isLoadingGetSurvey,
            updateSurvey: isPendingUpdateSurvey,
            uploadLogo: logo.loading,
          },
        },
        surveyFlow: { ...surveyFlow, openedFlowElement, setOpenedFlowElId },
        questions,
        email,
        stateRedirect: [redirect, setRedirect],
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

interface ISurveyContext {
  languages: { label: string; value: number | string }[];
  survey: {
    id: number;
    form: UseFormReturn<ISurvey, any, undefined>;
    onSubmit: (data: ISurvey) => void;
    logo: IUseLogo;
    loading: {
      getSurvey: boolean;
      updateSurvey: boolean;
      uploadLogo: boolean;
    };
  };
  surveyFlow: IUseSurveyFlow & {
    openedFlowElement: (ISurveyFlow & IQuestion) | undefined;
    setOpenedFlowElId: (id: number) => void;
  };
  questions: IUseQuestions;
  email: IUseEmail;
  stateRedirect: [boolean, (value: boolean) => void];
}

export { SurveyProvider };
export default SurveyContext;
