import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations("Footer");

  return (
    <div className="flex flex-col gap-y-4 justify-center w-full py-m bg-neutral-100 dark:bg-neutral-900">
      <div className="flex justify-center w-full text-sm">
        <p>
          © {new Date().getFullYear()} Grehus. {t("all_rights_reserved")}.
        </p>
      </div>
      <div className="flex flex-wrap justify-center w-full gap-6 text-sm text-dark dark:text-lightest_d">
        {/* <Link
          href={`/legal/privacy-policy`}
          className="whitespace-nowrap hover:underline"
        >
          {t("privacy_policy")}
        </Link>
        <Link
          href={`/legal/terms-of-service`}
          className="whitespace-nowrap hover:underline"
        >
          {t("terms_of_service")}
        </Link> */}
      </div>
      {/* <SocialLinks className="m-auto" /> */}
    </div>
  );
}

export default Footer;
