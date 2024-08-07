import { useContext } from "react";
import SurveyContext from "../../../context/SurveyContext";
import { useFormContext } from "react-hook-form";
import { Select } from "react-hook-form-mantine";
import { useTranslations } from "next-intl";

const Open = () => {
  const t = useTranslations("Surveys");

  const {
    questions: { openQuestionTypes },
  } = useContext(SurveyContext);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      // @ts-ignore
      control={control}
      name="open_question.open_question_type"
      label={t("type")}
      data={openQuestionTypes}
      allowDeselect={false}
      // @ts-ignore
      error={errors?.open_question?.open_question_type?.message}
    />
  );
};

export default Open;
