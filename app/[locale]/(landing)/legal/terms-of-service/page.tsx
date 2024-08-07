import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("Landing");
  return (
    <div className="bg-white dark:bg-neutral-950 py-24 w-full">
      <div className="max-w-6xl flex flex-col gap-8 mx-auto px-5 md:px-10">
        <h1 className="text-4xl font-medium">{t("terms_of_service")}</h1>
        <p className="text-justify">{t("privacy_policy_desc")}</p>
      </div>
    </div>
  );
};

export default Page;
