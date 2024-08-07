"use client";

import MyIcon from "@/app/components/MyIcon";
import useZod from "@/app/hooks/useZod";
import { myMutation } from "@/helpers/Fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Success from "./Success";

interface Props {
  token: string;
}

const Form = ({ token }: Props) => {
  const t = useTranslations("Session");
  const [success, setSuccess] = useState(false);

  const myZ = useZod();
  const schema = myZ
    .object({
      new_password: myZ.string().min(8),
      confirm_password: myZ.string().min(8),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: t("passwords_must_match"),
      path: ["confirm_password"],
    });
  type TypeSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeSchema>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: myMutation({ url: "/auth/users/reset_password_confirm/" }),
  });
  const [email, setEmail] = useState("");

  const submit = () => {
    mutate({
      variables: {
        uid: "string",
        token: "string",
        new_password: "string",
      },
      onCompleted: () => {
        setSuccess(true);
      },
    });
  };

  return (
    <>
      {success ? (
        <Success />
      ) : (
        <form
          className={`flex w-72 flex-col justify-center gap-5 dark:bg-neutral-950`}
          onSubmit={handleSubmit(submit)}
        >
          <p className="text-3xl font-semibold text-black dark:text-white">
            {t("new_password")}
          </p>
          <p className="secondary-text">
            {t("please_create_new_password")}{" "}
            <span className="text-blue-600">{email}</span>
          </p>
          <PasswordInput
            {...register("new_password")}
            label={t("new_password")}
            placeholder="********"
            error={errors.new_password?.message}
          />
          <PasswordInput
            {...register("confirm_password")}
            label={t("confirm_password")}
            placeholder="********"
            error={errors.confirm_password?.message}
          />
          <div className="mt-3 flex flex-col gap-2">
            {isError && <p className="errorMessage">{error.message}</p>}
          </div>
          <div className="self-center">
            <Button
              type="submit"
              loading={isPending}
              leftSection={<MyIcon icon="FiSend" />}
            >
              {t("continue")}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default Form;
