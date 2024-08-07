import { useRouter } from "@/internationalization/navigation";
import useZod from "@/app/hooks/useZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Modal, Select, Switch, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import MyIcon from "@/app/components/MyIcon";
import { useMutation, useQuery } from "@tanstack/react-query";
import { myMutation, myQuery } from "@/helpers/Fetch";

interface IProps {
  stateModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  activeCategory: { id: number; name: string };
}

const NewSurvey = ({ stateModal, activeCategory }: IProps) => {
  const t = useTranslations("Surveys");
  const session = useSession();
  const locale = useLocale();
  const router = useRouter();
  const myZ = useZod();
  const schema = myZ
    .object({
      name: myZ.string().min(1),
      language: myZ.string().min(1),
      active: myZ.boolean(),
    })
    .required();

  type SchemaType = z.infer<typeof schema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: myMutation({
      url: "/api/v1/survey/survey/",
      token: session?.data?.user.token,
    }),
    onSuccess: (data: { name: string; id: number; active: boolean }) => {
      const id = data.id;
      if (id) router.push(`/surveys/${id}`);
      else toast.error(t("error_creating_survey"));
    },
    onError: (error) => console.error(error),
  });

  const onSubmit = (data: SchemaType) => {
    mutate({
      ...data,
      category:
        Number(activeCategory.id ?? 0) > 0 ? activeCategory.id : undefined,
    });
  };

  return (
    <Modal
      onClose={() => stateModal[1](false)}
      opened={stateModal[0]}
      title={t("new_survey")}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextInput
          {...register("name")}
          label={t("survey_s_title")}
          placeholder={t("survey_s_title")}
          error={errors.name?.message}
        />
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label={t("language")}
              placeholder={t("select_a_language")}
              data={[
                {
                  value: "spa",
                  label: "Español",
                },
                {
                  value: "eng",
                  label: "English",
                },
              ]}
              error={errors.language?.message}
              allowDeselect={false}
            />
          )}
        />
        <Switch
          {...register("active")}
          label={watch("active") ? t("active") : t("inactive")}
          className="w-max"
          error={errors.active?.message}
        />
        {activeCategory.id > 0 && (
          <Alert
            title={t("survey_will_be_created_on_category", {
              category: activeCategory.name,
            })}
            icon={<MyIcon icon="FiAlertCircle" />}
          />
        )}
        <Button type="submit" mt={"xs"} loading={isPending}>
          {t("create_survey")}
        </Button>
      </form>
    </Modal>
  );
};

export default NewSurvey;
