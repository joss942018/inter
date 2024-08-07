import useZod from "@/app/hooks/useZod";
import { myMutation } from "@/helpers/Fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface IProps {
  close: () => void;
}

const NewCategoryForm = ({ close }: IProps) => {
  const t = useTranslations("Surveys");
  const myZ = useZod();
  const schema = myZ
    .object({
      name: myZ.string().min(1),
    })
    .required();

  type SchemaType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const session = useSession();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: myMutation({
      url: "/api/v1/survey/category/",
      token: session.data?.user.token,
    }),
    onSuccess: () => {
      toast(t("category_created"), {
        type: "success",
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/v1/survey/category/"] });
    },
  });

  const submit = useCallback(
    (data: SchemaType) => {
      mutate(data);
      reset();
      close();
    },
    [reset, close, mutate],
  );

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
      <TextInput
        {...register("name")}
        error={errors.name?.message}
        placeholder={t("folder_name")}
        autoFocus
      />
      <Button type="submit">{t("add_folder")}</Button>
    </form>
  );
};

export default NewCategoryForm;
