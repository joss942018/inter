"use client";

import MyIcon from "@/app/components/MyIcon";
import useZod from "@/app/hooks/useZod";
import { myMutation } from "@/helpers/Fetch";
import { Link } from "@/internationalization/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const Form = () => {
  const t = useTranslations("Session");
  const [success, setSuccess] = useState(false);

  const myZ = useZod();
  const schema = myZ.object({
    email: myZ.string().email(),
  });
  type TypeSchema = z.infer<typeof schema>;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TypeSchema>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: myMutation({ url: "/auth/users/reset_password/" }),
    onSuccess: () => setSuccess(true),
    onError: (error) =>
      toast(error.message, {
        type: "error",
        position: "top-center",
      }),
  });

  const submit = (data: TypeSchema) => mutate(data);

  return (
    <div>
      {success ? (
        <div className="flex w-72 flex-col gap-5 dark:text-slate-300">
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            {t("password_reset")}
          </h1>
          <Image
            alt="Check"
            src={"/ico/check-color.svg"}
            width={80}
            height={80}
          />
          <p className="secondary-text">{t("email_sent")}</p>
          <p className="secondary-text">{t("check_inbox")}</p>
          <Link href={"/login"}>
            <Button className="!w-full">{t("go_to_login")}</Button>
          </Link>
        </div>
      ) : (
        <form
          className="flex w-72 flex-col justify-center gap-5"
          onSubmit={handleSubmit(submit)}
        >
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            {t("password_reset")}
          </h1>
          <p className="secondary-text">{t("enter_email")}</p>
          <TextInput
            {...register("email")}
            label="Email"
            placeholder="name@domain.com"
            error={errors.email?.message}
          />
          <Button
            loading={isPending}
            type="submit"
            leftSection={<MyIcon icon="FiSend" />}
          >
            {t("continue")}
          </Button>
        </form>
      )}
    </div>
  );
};

export default Form;
