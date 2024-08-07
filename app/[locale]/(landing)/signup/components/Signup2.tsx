import MyIcon from "@/app/components/MyIcon";
import useZod from "@/app/hooks/useZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ISignupProps } from "./Signup1";
import { TypeFormSignup } from "./RegisterForm";

const Signup2 = ({
  handleSetForm,
  defaultValues,
  isPending,
}: Omit<ISignupProps, "countries"> & { isPending: boolean }) => {
  const t = useTranslations("General");
  const tS = useTranslations("Session");

  const myZ = useZod();
  const schema = myZ
    .object({
      first_name: myZ.string().min(1),
      last_name: myZ.string().min(1),
      email: myZ.string().email(),
      password: myZ.string().min(1),
      re_password: myZ.string().min(1),
    })
    .required()
    .refine((data) => data.password === data.re_password, {
      message: tS("passwords_must_match"),
      path: ["password", "re_password"],
    });

  type SchemaType = z.infer<typeof schema>;
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<SchemaType>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const submit = (data: SchemaType) =>
    handleSetForm({ ...data } as TypeFormSignup, 0);

  const goBack = (data: SchemaType) =>
    handleSetForm({ ...data } as TypeFormSignup, -1);

  return (
    <form
      className="flex w-full flex-col gap-5 px-5 md:grid md:grid-cols-2 md:px-0"
      onSubmit={handleSubmit(submit)}
    >
      <TextInput
        {...register("first_name")}
        label={t("name")}
        placeholder="John"
        error={errors.first_name?.message}
      />
      <TextInput
        {...register("last_name")}
        label={t("lastName")}
        placeholder="Doe"
        error={errors.last_name?.message}
      />
      <TextInput
        {...register("email")}
        label={t("email")}
        placeholder="john@doe.com"
        error={errors.email?.message}
      />
      <PasswordInput
        {...register("password")}
        label={t("password")}
        placeholder="123"
        error={errors.password?.message}
      />
      <PasswordInput
        {...register("re_password")}
        label={t("passwordConfirmation")}
        placeholder="123"
        error={errors.re_password?.message}
      />
      <div className="col-start-1 col-end-3 mt-5 flex justify-between">
        <Button
          variant="outline"
          leftSection={<MyIcon icon="FiChevronLeft" size={24} />}
          onClick={() => goBack(getValues())}
        >
          {t("back")}
        </Button>
        <Button
          rightSection={<MyIcon icon={"FiCheck"} size={24} />}
          loading={isPending}
          type="submit"
        >
          {t("register")}
        </Button>
      </div>
    </form>
  );
};

export default Signup2;
