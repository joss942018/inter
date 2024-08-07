import MyIcon from "@/app/components/MyIcon";
import Loader from "@/app/components/generic/Loader";
import getEnv from "@/helpers/Env";
import { Suspense } from "react";
import ContactForm, { IPhoneCode } from "./components/ContactForm";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("General");

  const countries: {
    data: {
      id: number;
      name: string;
      phone_code: string;
    }[];
  } = await (
    await fetch(
      `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/user/country/`,
    )
  ).json();
  // const schedules=await(await fetch(`${getEnv('NEXT_PUBLIC_BACKEND_ENDPOINT')}/`)).json();
  // const phoneCodes: any = [];
  const schedules: any = [];

  return (
    <div className="w-full bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto flex w-max max-w-6xl flex-col flex-wrap gap-xl px-5 md:flex-row md:px-10">
        <div className="flex h-max flex-col gap-s rounded-lg bg-neutral-100 p-s dark:bg-neutral-900">
          <h1 className="text-3xl font-semibold">{t("contact_us")}</h1>
          <div className="h-36 w-64 rounded-lg bg-[url('/img/contactLogoLight.svg')] bg-cover bg-center bg-no-repeat dark:bg-[url('/img/contactLogoDark.svg')]" />
          {/*<div className="font-medium p-1 flex flex-col gap-2 text-primary dark:text-primary_d">
            <p className="text-black dark:text-white">{t("phone")}</p>
            <a href="tel:+593993339940">+593 99 333 9940</a>
            <a href="tel:+13025538974">+1 302 553 8974</a>
          </div>*/}
          <div className="flex select-text items-center gap-xs">
            {/* <div className="flex gap-xs items-center">
              <div className="ico-mail-outline w-s h-s dark:invert" />
              <p>{t("email")}</p>
            </div> */}
            <MyIcon icon="FiMail" />
            <a href="mailto:info@grehus.com" className="w-max">
              info@grehus.com
            </a>
          </div>
          {/* <SocialLinks /> */}
        </div>
        <Suspense
          fallback={
            <div className="w-max lg:w-[500px]">
              <Loader />
            </div>
          }
        >
          <ContactForm
            phoneCodes={countries.data.map((el) => ({
              country_id: el.id,
              name: el.name,
              phone_code: el.phone_code,
            }))}
            schedules={schedules}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
