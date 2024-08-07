import { useTranslations } from "next-intl";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { Select } from "react-hook-form-mantine";
import SurveyContext from "../../../context/SurveyContext";

const Credential = () => {
  const t = useTranslations("Surveys");

  const {
    questions: { credentialTypes },
  } = useContext(SurveyContext);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Select
        // @ts-ignore
        control={control}
        name="credential_question.credential_type"
        data={credentialTypes}
        allowDeselect={false}
        // @ts-ignore
        error={errors?.credential_question?.credential_type?.message}
        label={t("type")}
      />
    </>
  );
};

export default Credential;
