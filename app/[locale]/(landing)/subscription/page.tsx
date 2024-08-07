"use client";
import React, { useContext, useState, useEffect, use } from "react";
import SubscriptionCard from "./components/SubscriptionCard";
import MyLink from "@/app/components/MyLink";
import { useTranslations } from "next-intl";
import getEnv from "@/helpers/Env";
import { useSession } from "next-auth/react";

const URL = `${getEnv(
  "NEXT_PUBLIC_BACKEND_ENDPOINT",
)}/payments/paypal/get_current_plan/`;

const Page = () => {
  const t = useTranslations("Subscription");
  const session = useSession();

  const [planName, setPlanName] = useState<string | null>(null);

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
  //     })
  //     .catch((error) => console.error("Error:", error));
  // }, []);

  console.log(planName);

  const subscriptionDataFree = {
    title: t("free"),
    price: 0,
    questions: 5,
    benefits: [
      t("b_1"),
      t("b_2"),
      t("b_3"),
      t("b_4"),
      t("b_5"),
      t("b_6"),
      t("b_7"),
    ],
    button_tag: t("try_free"),
  };

  const subscriptionDataPlus = {
    title: t("plus"),
    price: 65,
    questions: 100,
    benefits: [
      t("b_1"),
      t("b_2"),
      t("b_3"),
      t("b_4"),
      t("b_5"),
      t("b_6"),
      t("b_7"),
    ],
    button_tag: t("subscribe"),
  };

  const subscriptionDataBusiness = {
    title: t("business"),
    price: 315,
    questions: 500,
    benefits: [
      t("b_1"),
      t("b_2"),
      t("b_3"),
      t("b_4"),
      t("b_5"),
      t("b_6"),
      t("b_7"),
    ],
    button_tag: t("subscribe"),
  };

  const subscriptionDataEnterprise = {
    title: t("enterprise"),
    price: 595,
    questions: 1000,
    benefits: [
      t("b_1"),
      t("b_2"),
      t("b_3"),
      t("b_4"),
      t("b_5"),
      t("b_6"),
      t("b_7"),
    ],
    button_tag: t("subscribe"),
  };

  return (
    <div className="z-40 flex w-full flex-col bg-white pt-24 dark:bg-neutral-950">
      <div className="mx-auto w-full max-w-6xl px-5 text-justify md:px-10">
        <div>
          <h1 className="font-2xl text-start text-4xl text-black dark:text-white">
            {t("title")}
          </h1>
        </div>
        <div className="my-12 flex flex-col justify-center gap-8 md:flex-row">
          <div className="flex flex-col sm:w-full md:w-6/12 lg:w-5/12">
            <div className="h-full rounded-md border border-gray-300 bg-[url('/img/bgSubsCardLight.svg')] bg-no-repeat p-8 dark:bg-[url('/img/bgSubsCardDark.svg')]">
              <SubscriptionCard
                title={subscriptionDataFree.title}
                price={subscriptionDataFree.price}
                number_questions={subscriptionDataFree.questions}
                benefits={subscriptionDataFree.benefits}
              />
              <div className="mt-8">
                {session.data ? (
                  <div>
                    {!planName && (
                      <div>
                        <MyLink href={`/login`} hierarchy={2}>
                          {t("your_plan")}
                        </MyLink>
                      </div>
                    )}
                  </div>
                ) : (
                  <MyLink href={`/login`} hierarchy={2}>
                    {subscriptionDataFree.button_tag}
                  </MyLink>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:w-full md:w-6/12 lg:w-5/12">
            <div className="rounded-md border border-gray-300 bg-[url('/img/bgSubsCardLight.svg')] bg-no-repeat p-8 dark:bg-[url('/img/bgSubsCardDark.svg')]">
              <SubscriptionCard
                title={subscriptionDataPlus.title}
                price={subscriptionDataPlus.price}
                number_questions={subscriptionDataPlus.questions}
                benefits={subscriptionDataPlus.benefits}
              />

              <div className="mt-8">
                {session.data ? (
                  <div>
                    {planName === getEnv("NEXT_PUBLIC_PLUS_NAME") ? (
                      <MyLink
                        className="btn btn-md border-primary text-primary w-full bg-white dark:border-primary_d dark:bg-neutral-950 dark:text-primary_d"
                        href={`/login`}
                        hierarchy={2}
                      >
                        {t("your_plan")}
                      </MyLink>
                    ) : (
                      <MyLink href={`/subscription/plus`} hierarchy={2}>
                        {subscriptionDataPlus.button_tag}
                      </MyLink>
                    )}
                  </div>
                ) : (
                  <MyLink href={`/login`} hierarchy={2}>
                    {subscriptionDataPlus.button_tag}
                  </MyLink>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="my-12 flex flex-col justify-center gap-8 md:flex-row">
          <div className="flex flex-col sm:w-full md:w-6/12 lg:w-5/12">
            <div className="rounded-md border border-gray-300 bg-[url('/img/bgSubsCardLight.svg')] bg-no-repeat p-8 dark:bg-[url('/img/bgSubsCardDark.svg')]">
              <SubscriptionCard
                title={subscriptionDataBusiness.title}
                price={subscriptionDataBusiness.price}
                number_questions={subscriptionDataBusiness.questions}
                benefits={subscriptionDataBusiness.benefits}
              />

              <div className="mt-8">
                {session.data ? (
                  <div>
                    {planName === getEnv("NEXT_PUBLIC_BUSINESS_NAME") ? (
                      <MyLink href={`/login`} hierarchy={2}>
                        {t("your_plan")}
                      </MyLink>
                    ) : (
                      <MyLink href={`/subscription/business`} hierarchy={2}>
                        {subscriptionDataBusiness.button_tag}
                      </MyLink>
                    )}
                  </div>
                ) : (
                  <MyLink href={`/login`} hierarchy={2}>
                    {subscriptionDataBusiness.button_tag}
                  </MyLink>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:w-full md:w-6/12 lg:w-5/12">
            <div className="rounded-md border border-gray-300 bg-[url('/img/bgSubsCardLight.svg')] bg-no-repeat p-8 dark:bg-[url('/img/bgSubsCardDark.svg')]">
              <SubscriptionCard
                title={subscriptionDataEnterprise.title}
                price={subscriptionDataEnterprise.price}
                number_questions={subscriptionDataEnterprise.questions}
                benefits={subscriptionDataEnterprise.benefits}
              />

              <div className="mt-8">
                {session.data ? (
                  <div>
                    {planName === getEnv("NEXT_PUBLIC_ENTERPRISE_NAME") ? (
                      <MyLink href={`/login`} hierarchy={2}>
                        {t("your_plan")}
                      </MyLink>
                    ) : (
                      <MyLink href={`/subscription/enterprise`} hierarchy={2}>
                        {subscriptionDataEnterprise.button_tag}
                      </MyLink>
                    )}
                  </div>
                ) : (
                  <MyLink href={`/login`} hierarchy={2}>
                    {subscriptionDataEnterprise.button_tag}
                  </MyLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
