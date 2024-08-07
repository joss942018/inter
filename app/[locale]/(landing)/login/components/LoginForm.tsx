"use client";

import MyIcon from "@/app/components/MyIcon";
import MyLink from "@/app/components/MyLink";
import useZod from "@/app/hooks/useZod";
import { locales, useRouter } from "@/internationalization/navigation";
import TypesLanguages from "@/types/TypesLanguages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  locale: TypesLanguages;
}

const LoginForm = ({ locale }: Props) => {
  const t = useTranslations("General");
  const tL = useTranslations("Login");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const myZ = useZod();
  const FormSchema = myZ.object({
    email: myZ.string().email(),
    password: myZ.string().min(1),
  });
  type SchemaType = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status !== "loading" && session.data?.user?.email)
      router.push("/surveys");
  }, [session, router]);

  const handleLogin = useCallback(
    async (data: SchemaType) => {
      let callbackUrl = searchParams.get("callbackUrl") || "/surveys";

      if (RegExp(`\/(${locales.join("|")})`).test(callbackUrl.substring(0, 3)))
        callbackUrl = callbackUrl.substring(3);

      setLoading(true);
      const res = await signIn("credentials", {
        ...data,
        callbackUrl,
        redirect: false,
        locale,
      });
      setLoading(false);

      if (res?.ok) router.push(callbackUrl);
      else setError(res?.error ?? tL("couldnt_login"));
    },
    [tL, searchParams, locale, router],
  );

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex h-max w-72 flex-col"
    >
      <h1 className="mb-my-24 text-3xl font-semibold">{t("login")}</h1>
      <div className="flex w-full flex-col gap-my-24">
        <TextInput
          {...register("email")}
          label={String(t("email"))}
          placeholder="name@domain.com"
          error={errors.email?.message}
        />
        <div className="flex w-full flex-col">
          <PasswordInput
            {...register("password")}
            label={t("password")}
            type="password"
            placeholder="********"
            error={errors.password?.message}
          />
          <MyLink href={`/password-recovery`} className="text-small m-auto">
            {t("forgot_password_question")}
          </MyLink>
        </div>
      </div>
      <Button
        type="submit"
        loading={loading || session.status === "loading"}
        leftSection={<MyIcon icon="FiLogIn" />}
        className="mt-6"
      >
        {t("login")}
      </Button>
      {error && <p className="errorMessage m-auto my-2">{error}</p>}
      {/* <div className="flex flex-col items-center w-full">
        <p className="text-small secondary-text divider w-full uppercase my-my-24">
          {tL("or")}
        </p>
        <MyButton
          onClick={() => signIn("google")}
          hierarchy={2}
          size="small"
          className="!border-red-400 !text-red-400 !rounded-full hover:!bg-red-400 hover:!text-white"
        >
          <BsGoogle />
          <span>{tL("signin_with_google")}</span>
        </MyButton>
      </div> */}
    </form>
  );
};

export default LoginForm;
