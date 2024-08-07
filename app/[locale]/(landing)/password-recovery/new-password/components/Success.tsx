import { Link } from "@/internationalization/navigation";
import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Success = () => {
  const t = useTranslations("Session");

  return (
    <div className="flex w-72 flex-col gap-5 dark:text-slate-300">
      <p className="text-3xl font-semibold text-black dark:text-white">
        {t("password_updated_title")}
      </p>
      <Image alt="Check" src={"/ico/check-color.svg"} width={80} height={80} />
      <p className="secondary-text">{t("password_updated")}</p>
      <p className="secondary-text">{t("login_and_start_using_the_app")}</p>
      <Link href={`/login`}>
        <Button className="!w-full">{t("go_to_login")}</Button>
      </Link>
    </div>
  );
};

export default Success;
