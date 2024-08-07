"use client";

import MyIcon from "@/app/components/MyIcon";
import MyLink from "@/app/components/MyLink";
import { myMutation } from "@/helpers/Fetch";
import {
  TypeLanguagesDB,
  TypeUserRolesDB,
  TypeUserTypesDB,
} from "@/types/TypesDB";
import { Alert, RingProgress, Stepper } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import Check from "../../../../../public/ico/check-color.svg";
import { IPhoneCode } from "../../contact/components/ContactForm";
import Signup1 from "./Signup1";
import Signup2 from "./Signup2";

interface IFormData {
  username: string;
  language: TypeLanguagesDB;
  user_type: TypeUserTypesDB;
  first_name: string;
  last_name: string;
  phone: string;
  web_site: string;
  ruc: string;
  country: string;
  user_role: TypeUserRolesDB;
  email: string;
  password: string;
  re_password: string;
}

const initialFormData: IFormData = {
  username: "",
  language: "spa",
  user_type: "WOR",
  first_name: "",
  last_name: "",
  phone: "",
  web_site: "",
  ruc: "",
  country: "",
  user_role: "no_role",
  email: "",
  password: "",
  re_password: "",
};

export type TypeFormSignup = typeof initialFormData;

interface Props {
  countries: IPhoneCode[];
}

export const RegisterForm = ({ countries }: Props) => {
  const t = useTranslations("General");
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const { mutate, isPending, error } = useMutation({
    mutationFn: myMutation<TypeFormSignup>({
      url: "/auth/users/",
    }),
    onSuccess: () => setStep(2),
  });

  const handleSetForm = (data: TypeFormSignup, next: -1 | 0 | 1) => {
    // next: -1: back, 0: submit, 1: next
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);
    if (next === -1) setStep(0);
    else if (next === 1) setStep(1);
    else if (next === 0) mutate(newFormData);
  };

  const locale = useLocale();
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      language: locale === "es" ? "spa" : "eng",
    }));
  }, [locale]);

  return (
    <div className="mx-auto max-w-2xl">
      {step === 2 ? (
        <div className="flex flex-col items-center gap-5">
          <p className="text-2xl font-medium text-black dark:text-white">
            {t("successfull_register")}
          </p>
          <Image alt="Success" src={Check} />
          <p className="text-center">
            {t("email_was_sent_to")}{" "}
            <span className="text-secondary">{formData.email}</span>.{" "}
            {t("please_check_your_email")}.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <p className="hidden text-2xl font-semibold text-black dark:text-white md:block">
            {t("sign_up")}
          </p>
          <div className="flex items-center gap-5 md:hidden">
            <RingProgress
              sections={[{ value: (step + 1) * 50, color: "blue" }]}
              label={
                <p className="text-center font-semibold">
                  {step + 1} {t("of")} 2
                </p>
              }
            />
            <div className="flex flex-col gap-3 pr-3">
              <p className="text-2xl font-semibold text-black dark:text-white">
                {t("sign_up")}
              </p>
              <h2 className="secondary-text text-lg">
                {step === 0
                  ? t("company_information")
                  : step === 1
                    ? t("administrators_information")
                    : ""}
              </h2>
            </div>
          </div>
          <Stepper
            active={step}
            className="hidden w-full md:flex"
            onStepClick={setStep}
            allowNextStepsSelect={false}
          >
            <Stepper.Step
              label={t("step_number", { step: 0 })}
              description={t("company_information")}
            />
            <Stepper.Step
              label={t("step_number", { step: 1 })}
              description={t("administrators_information")}
            />
          </Stepper>

          {step === 0 ? (
            <Signup1
              countries={countries}
              handleSetForm={handleSetForm}
              defaultValues={
                {
                  username: formData.username,
                  ruc: formData.ruc,
                  web_site: formData.web_site,
                  country: formData.country,
                  phone: formData.phone,
                } as TypeFormSignup
              }
            />
          ) : (
            <Signup2
              handleSetForm={handleSetForm}
              defaultValues={
                {
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  email: formData.email,
                  password: formData.password,
                  re_password: formData.re_password,
                } as TypeFormSignup
              }
              isPending={isPending}
            />
          )}
          {error && (
            <Alert
              color="red"
              title={error?.message}
              icon={<MyIcon icon="FiAlertCircle" />}
            />
          )}
          <div className="flex w-full items-center justify-center gap-my-8 text-sm md:justify-start">
            {t("already_have_an_account_question")}
            <MyLink href={`/login`} className="text-blue-600">
              {t("login")}
            </MyLink>
          </div>
        </div>
      )}
    </div>
  );
};
