"use client";
import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentButton from "../components/PaymentButton";
import getEnv from "@/helpers/Env";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("Subscription");

  return (
    <div className="w-full mx-auto shadow-md dark:shadow-darkest pt-24 pb-8 dark:bg-neutral-950 bg-white">
      <div className="max-w-6xl w-full mx-auto text-justify px-5 md:px-10">
        <h1 className="text-4xl font-2xl text-black dark:text-white text-justify">
          {t("business_title")}
        </h1>
        <div className="mx-auto my-8 max-w-5xl w-full shadow-sm dark:shadow-dark_d border border-light dark:border-dark_d">
          <div className="text-center border-b border-light max-w-5xl w-full mx-auto dark:border-dark_d">
            <h2 className="text-2xl font-bold px-4 py-8 md:px-8">
              {t("payment_methods")}
            </h2>
          </div>
          <div className="flex items-baseline justify-center text-primary dark:text-primary_d pt-8 pb-4">
            <p className="text-6xl md:text-8xl">$315</p>
            <p className="text-base md:text-xl font-semibold ml-1 pb-2">
              {t("taxes")}
            </p>
          </div>
          <div className="mb-8 flex items-baseline justify-center">
            <p className="text-sm font-semibold w-10 h-10 rounded-full shadow-md dark:border-dark_d py-3 px-2">
              500
            </p>
            <p className="text-sm ml-1">{t("questions_available")}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-around pt-10 pb-4 border-t border-light dark:border-t-dark_d px-4 py-8">
            <div className="flex flex-col w-full md:w-4/12 md:mx-2">
              <PayPalScriptProvider
                options={{
                  clientId: `${getEnv("NEXT_PUBLIC_CLIENT_ID")}`,
                  components: "buttons",
                  intent: "subscription",
                  vault: true,
                }}
              >
                <PaymentButton
                  type="subscription"
                  plan={getEnv("NEXT_PUBLIC_BUSINESS_ID")}
                  name={getEnv("NEXT_PUBLIC_BUSINESS_NAME")}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
