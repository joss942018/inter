"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import getEnv from "@/helpers/Env";
import MyLink from "@/app/components/MyLink";
import { useSession } from "next-auth/react";

const URL = `${getEnv(
  "NEXT_PUBLIC_BACKEND_ENDPOINT",
)}/payments/paypal/get_current_plan/`;

const CurrentPlan = () => {
  const t = useTranslations("Account");
  const tS = useTranslations("Subscription");
  const session = useSession();
  const [planName, setPlanName] = useState<string | null>(null);
  const [remainingDays, setRemainingDays] = useState<number | 0>(0);

  // useEffect(() => {
  //   fetch(URL + session.data?.user.id + "/")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setPlanName(data.plan_name);
  //       setRemainingDays(data.remaining_days);
  //     })
  //     .catch((error) => console.error("Error:", error));
  // }, []);

  return (
    <div>
      <div className="flex flex-col gap-m pt-8">
        <h3 className="text-heading3">{t("current_plan_title")}</h3>
        <div className="mx-auto flex w-full flex-col gap-s md:w-10/12">
          <div className="mb-4 w-full max-w-5xl border border-light p-8 shadow-sm dark:border-dark_d dark:shadow-dark_d">
            <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-8 text-center md:flex-row md:justify-around">
              {planName ? (
                planName === getEnv("NEXT_PUBLIC_PLUS_NAME") ? (
                  <h2 className="text-2xl font-bold">{tS("plus")}</h2>
                ) : planName === getEnv("NEXT_PUBLIC_BUSINESS_NAME") ? (
                  <h2 className="text-2xl font-bold">{tS("business")}</h2>
                ) : planName === getEnv("NEXT_PUBLIC_ENTERPRISE_NAME") ? (
                  <h2 className="text-2xl font-bold">{tS("enterprise")}</h2>
                ) : null
              ) : (
                <div>
                  <h2 className="text-2xl font-bold">{tS("free")}</h2>
                </div>
              )}
              {planName ? (
                <MyLink
                  className="btn btn-outline btn-circle text-primary px-16 text-xl dark:text-primary_d"
                  href={`/login`}
                >
                  {t("active")}
                </MyLink>
              ) : (
                <MyLink
                  className="btn btn-active w-max rounded-full px-16"
                  href={`/subscription`}
                >
                  {tS("subscribe")}
                </MyLink>
              )}

              {planName && (
                <div className="text-lg">
                  {remainingDays} {t("days_left")}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 text-white md:flex-row md:justify-end">
            {planName && (
              <>
                <MyLink
                  className="btn btn-active w-52 md:mr-2"
                  href={`subscription`}
                >
                  {t("upgrade")}
                </MyLink>
                <MyLink className="btn w-52" href={`myaccount/cancel-plan`}>
                  {t("cancel_plan")}
                </MyLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlan;
