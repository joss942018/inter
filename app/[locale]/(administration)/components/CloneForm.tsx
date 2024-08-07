import MyIcon from "@/app/components/MyIcon";
import useZod from "@/app/hooks/useZod";
import { myMutation } from "@/helpers/Fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { ICategory } from "./Category";
import { ISurveyss } from "./Survey";
import { useSession } from "next-auth/react";

interface IProps {
  surveyData: ISurveyss;
  close: () => void;
}

const CloneForm = ({ surveyData, close }: IProps) => {
  const t = useTranslations("Surveys");
  const session = useSession();

  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData(["/api/v1/survey/category/"]) as
    | {
        data?: ICategory[];
      }
    | undefined;

  const myZ = useZod();
  const schema = myZ.object({
    name: myZ.string(),
    category: myZ.string().optional().nullable(),
  });

  type TypeSchema = z.infer<typeof schema>;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TypeSchema>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: myMutation<TypeSchema & { survey_id: number }>({
      url: "/api/v1/survey/survey/clone_survey/",
      token: session.data?.user.token,
    }),
    onSuccess: () => {
      close();
      toast(t("survey_duplicated"), {
        type: "success",
        position: "top-center",
      });
    },
  });

  const submit = (data: TypeSchema) =>
    mutate({ ...data, survey_id: surveyData.id });

  useEffect(() => {
    reset({ name: surveyData.name + " - Copy" });
  }, [surveyData.name]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
      <TextInput
        {...register("name")}
        label={t("survey_s_title")}
        error={errors.name?.message}
      />
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            data={categories?.data?.map((el) => ({
              value: el.id.toString(),
              label: el.name,
            }))}
            label={t("category")}
            placeholder={t("add_category")}
            error={errors.category?.message}
            clearable
          />
        )}
      />
      <Button
        type="submit"
        leftSection={<MyIcon icon="FiCheck" />}
        loading={isPending}
      >
        {t("clone")}
      </Button>
    </form>
  );
};

export default CloneForm;
