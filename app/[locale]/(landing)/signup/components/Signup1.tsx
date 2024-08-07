import MyIcon from "@/app/components/MyIcon";
import useZod from "@/app/hooks/useZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select, TextInput } from "@mantine/core";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TypeFormSignup } from "./RegisterForm";
import { IPhoneCode } from "../../contact/components/ContactForm";

export interface ISignupProps {
  countries: IPhoneCode[];
  handleSetForm: (formData: TypeFormSignup, next: -1 | 0 | 1) => void;
  defaultValues: TypeFormSignup;
}

const Signup1 = ({ countries, handleSetForm, defaultValues }: ISignupProps) => {
  const t = useTranslations("General");

  const myZ = useZod();
  const schema = myZ
    .object({
      username: myZ.string().min(1),
      ruc: myZ.string().min(10).max(13),
      web_site: myZ.string().min(1),
      country: myZ.string().min(1),
      phone: myZ.string().min(7).max(13),
    })
    .required();

  type SchemaType = z.infer<typeof schema>;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({ defaultValues, resolver: zodResolver(schema) });

  const submit = (data: SchemaType) =>
    handleSetForm({ ...data } as TypeFormSignup, 1);

  return (
    <form
      className="flex w-full flex-col gap-5 px-5 md:grid md:grid-cols-2 md:px-0"
      onSubmit={handleSubmit(submit)}
    >
      <TextInput
        {...register("ruc")}
        label={t("ruc_ssn")}
        placeholder="1700000001"
        error={errors.ruc?.message}
      />
      <TextInput
        {...register("username")}
        label={t("company")}
        placeholder="JP S.A."
        error={errors.username?.message}
      />
      <TextInput
        {...register("web_site")}
        label={t("website")}
        placeholder="www.jp.com"
        error={errors.web_site?.message}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="country"
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            data={countries.map((el) => ({
              value: el.country_id.toString(),
              label: `${el.name} (${el.phone_code})`,
            }))}
            label={t("country")}
            placeholder="Ecuador"
            error={errors.country?.message}
            searchable
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            autoComplete="new-password"
          />
        )}
      />
      <TextInput
        {...register("phone")}
        label={t("phone")}
        placeholder="999999999"
        error={errors.phone?.message}
      />
      <Button
        rightSection={<MyIcon icon={"FiChevronRight"} size={24} />}
        loading={false}
        type="submit"
        className="col-start-1 col-end-3 ml-auto mt-5 w-max"
      >
        {t("next")}
      </Button>
    </form>
  );
};

export default Signup1;
