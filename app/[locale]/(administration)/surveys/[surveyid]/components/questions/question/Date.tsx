import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { Switch } from "react-hook-form-mantine";

const Date = () => {
  const t = useTranslations("Surveys");

  const { control } = useFormContext();

  return (
    <>
      <Switch control={control} name="date_question.range" label={t("range")} />
      <Switch
        control={control}
        name="date_question.include_time"
        label={t("with_time")}
      />
    </>
  );
};

export default Date;
