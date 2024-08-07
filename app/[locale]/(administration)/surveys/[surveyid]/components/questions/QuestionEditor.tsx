import AutoSave from "@/app/components/AutoSave";
import MyIcon from "@/app/components/MyIcon";
import useZod from "@/app/hooks/useZod";
import { TypeQuestion } from "@/types/TypesDB";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { Form, FormProvider, useForm, useWatch } from "react-hook-form";
import { Select, Switch, Textarea } from "react-hook-form-mantine";
import { z } from "zod";
import SurveyContext from "../../context/SurveyContext";
import Credential from "./question/Credential";
import Date from "./question/Date";
import File from "./question/File";
import MC from "./question/MC";
import Open from "./question/Open";
import Rating from "./question/Rating";

const QuestionEditor = () => {
  const t = useTranslations("Surveys");
  const {
    questions: { deleteQ, updateQ, questionTypes },
    surveyFlow: { openedFlowElement },
  } = useContext(SurveyContext);

  const myZ = useZod();
  const schema = myZ.object({
    question_id: myZ.number(),
    question_text: myZ.string().min(1),
    question_type: myZ.string().min(1),
    required: myZ.boolean(),
    mc_question: myZ
      .object({
        more_than_one: myZ.boolean(),
      })
      .optional()
      .nullable(),
    date_question: myZ
      .object({
        range: myZ.boolean(),
        include_time: myZ.boolean(),
      })
      .optional()
      .nullable(),
    credential_question: myZ
      .object({
        credential_type: myZ.string().min(1),
      })
      .optional()
      .nullable(),
    open_question: myZ
      .object({
        open_question_type: myZ.string().min(1),
      })
      .optional()
      .nullable(),
    rating_question: myZ
      .object({
        rating_question_type: myZ.string().min(1),
        rating_from: myZ.number(),
        rating_to: myZ.number(),
      })
      .optional()
      .nullable(),
    file_question: myZ
      .object({
        multiple: myZ.boolean(),
      })
      .optional()
      .nullable(),
  });

  type TypeSchema = z.infer<typeof schema>;

  const form = useForm<TypeSchema>({
    resolver: zodResolver(schema),
  });
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = form;

  const watchData = useWatch<TypeSchema>({
    control,
  });

  useEffect(() => {
    reset({
      ...watchData,
      question_id: openedFlowElement?.question_id ?? 0,
      question_text: openedFlowElement?.question_text ?? "",
      question_type: openedFlowElement?.question_type ?? "",
      required: openedFlowElement?.required ?? false,
      mc_question: openedFlowElement?.mc_question,
      date_question: openedFlowElement?.date_question,
      credential_question: openedFlowElement?.credential_question,
      open_question: openedFlowElement?.open_question,
      rating_question: openedFlowElement?.rating_question,
      file_question: openedFlowElement?.file_question,
    });
  }, [
    openedFlowElement?.question_text,
    openedFlowElement?.question_type,
    openedFlowElement?.required,
    openedFlowElement?.mc_question,
    openedFlowElement?.date_question,
    openedFlowElement?.credential_question,
    openedFlowElement?.open_question,
    openedFlowElement?.rating_question,
    openedFlowElement?.file_question,
  ]);

  const handleDeleteQuestion = async () =>
    modals.openConfirmModal({
      title: t("delete_question_question"),
      labels: { confirm: t("yes"), cancel: t("no") },
      confirmProps: { color: "red" },
      onConfirm: () => deleteQ(openedFlowElement?.question_id ?? 0),
    });

  const renderQuestionType = () => {
    switch (watchData.question_type as TypeQuestion) {
      // switch (openedFlowElement?.question_type as TypeQuestion) {
      case "mc":
        return <MC questionId={openedFlowElement?.question_id ?? 0} />;
      case "open":
        return <Open />;
      case "rating":
        return <Rating />;
      case "date":
        return <Date />;
      case "file":
        return <File />;
      case "credential":
        return <Credential />;
      default:
        return null;
    }
  };

  const submit = (data: TypeSchema) => updateQ(data as any);

  const resetExcept = (question_type: TypeQuestion) => {
    let tempData: any = {
      ...watchData,
      question_type,
      mc_question: undefined,
      date_question: undefined,
      credential_question: undefined,
      open_question: undefined,
      rating_question: undefined,
      file_question: undefined,
    };
    switch (question_type) {
      case "mc":
        tempData.mc_question = {
          more_than_one: false,
        };
        break;
      case "open":
        tempData.open_question = {
          open_question_type: "audio_text",
        };
        break;
      case "rating":
        tempData.rating_question = {
          rating_question_type: "num",
          rating_from: 1,
          rating_to: 5,
        };
        break;
      case "date":
        tempData.date_question = {
          range: false,
          include_time: false,
        };
        break;
      case "file":
        tempData.file_question = {
          multiple: false,
        };
        break;
      case "credential":
        tempData.credential_question = {
          credential_type: "email",
        };
        break;
      case "boolean":
        break;
      default:
        break;
    }
    reset(tempData);
    setTimeout(() => {
      handleSubmit(submit)();
    }, 500);
  };

  return (
    <FormProvider {...form}>
      <Form control={control} className="flex w-full flex-col gap-xs p-s">
        <AutoSave onSubmit={submit} />
        <div className="flex items-center justify-between">
          <h4 className="text-heading4">{openedFlowElement?.order}</h4>
          <Tooltip label={t("delete")}>
            <ActionIcon
              variant="light"
              size={"lg"}
              color="red"
              onClick={handleDeleteQuestion}
            >
              <MyIcon icon="FiTrash2" />
            </ActionIcon>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-5">
          <Textarea
            control={control}
            name="question_text"
            error={errors.question_text?.message}
            label={String(t("question"))}
            autosize
          />
          <Switch
            control={control}
            name="required"
            error={errors.required?.message}
            label={t("required")}
          />
          <Select
            control={control}
            name="question_type"
            label={t("question_type")}
            allowDeselect={false}
            data={questionTypes.map((el) => ({
              value: el.value,
              label: t(`question_types.${el.value}`),
            }))}
            error={errors.question_type?.message}
            onChange={(e) => {
              resetExcept(e as TypeQuestion);
            }}
          />
          {renderQuestionType()}
        </div>
      </Form>
    </FormProvider>
  );
};

export default QuestionEditor;
