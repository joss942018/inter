"use client";

import MyIcon from "@/app/components/MyIcon";
import useZod from "@/app/hooks/useZod";
import { myMutation } from "@/helpers/Fetch";
import Check from "@/public/ico/check-color.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Select, TextInput, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export interface IPhoneCode {
  country_id: number;
  name: string;
  phone_code: string;
}

interface ISchedule {
  schedule_id: number;
  schedule: string;
}

interface IProps {
  phoneCodes: IPhoneCode[];
  schedules: ISchedule[];
}

const ContactForm = ({ phoneCodes, schedules }: IProps) => {
  const t = useTranslations("General");

  const myZ = useZod();
  const schema = myZ.object({
    organization_name: myZ.string().min(1),
    name: myZ.string().min(1),
    email: myZ.string().email(),
    country_id: myZ.string().min(1),
    phone: myZ.string().min(1),
    date: myZ.date(),
    schedule_id: myZ.string().min(1),
    message: myZ.string().min(1),
    contact_on_whatsapp: myZ.boolean(),
  });
  type TypeSchema = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TypeSchema>({ resolver: zodResolver(schema) });
  const [sent, setSent] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: myMutation<TypeSchema>({
      url: "",
    }),
    onSuccess: () => {
      setSent(true);
      reset();
    },
  });

  const submit = (data: TypeSchema) => mutate(data);

  return (
    <div className="w-72 flex-1 lg:w-[500px]">
      {sent ? (
        <div className="flex w-80 flex-col gap-s">
          <Image alt="Success" src={Check} />
          <h1 className="text-heading4 text-black dark:text-white">
            {t("message_sent")}
          </h1>
          <p className="secondary-text">{t("thanks_for_contacting_us")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-s">
          <h1 className="text-h3">{t("schedule_a_meeting")}</h1>
          <TextInput
            {...register("organization_name")}
            label={t("organization")}
            placeholder="JP S.A."
            error={errors.organization_name?.message}
          />
          <TextInput
            {...register("name")}
            label={t("name")}
            placeholder="John Doe"
            error={errors.name?.message}
          />
          <TextInput
            {...register("email")}
            label={t("email")}
            placeholder="name@domain.com"
            error={errors.email?.message}
          />
          <div className="grid grid-cols-2 gap-3">
            <Controller
              control={control}
              name="country_id"
              render={({ field }) => (
                <Select
                  {...field}
                  searchable
                  data={phoneCodes.map((el) => ({
                    label: `${el.name} (${el.phone_code})`,
                    value: el.country_id.toString(),
                  }))}
                  label={t("country")}
                  error={errors.country_id?.message}
                  autoComplete={"new-password"}
                />
              )}
            />
            <TextInput
              {...register("phone")}
              label={t("phone")}
              placeholder="999999999"
              error={errors.phone?.message}
              className="w-full"
            />
          </div>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePickerInput
                {...field}
                label={t("date")}
                placeholder="4/4/2024"
                valueFormat="DD/MM/YYYY"
                error={errors.date?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="schedule_id"
            render={({ field }) => (
              <Select
                {...field}
                data={schedules.map((el) => ({
                  label: el.schedule,
                  value: el.schedule_id.toString(),
                }))}
                label={t("schedule") + " (GMT-5)"}
                error={errors.schedule_id?.message}
              />
            )}
          />
          <Textarea
            {...register("message")}
            label={t("message")}
            placeholder={t("message")}
            error={errors.message?.message}
            autosize
          />
          <Checkbox
            {...register("contact_on_whatsapp")}
            label={String(t("i_want_to_be_contacted_by_whatsapp"))}
          />
          <Button
            type="submit"
            loading={isPending}
            leftSection={<MyIcon icon="FiSend" />}
          >
            {t("send")}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
