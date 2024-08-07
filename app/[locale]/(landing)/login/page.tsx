import MyLink from "@/app/components/MyLink";
import Loader from "@/app/components/generic/Loader";
import TypesLanguages from "@/types/TypesLanguages";
import { Button, Card } from "@mantine/core";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import LoginForm from "./components/LoginForm";
import { Link } from "@/internationalization/navigation";

interface Props {
  params: {
    locale: TypesLanguages;
  };
}

const Page = ({ params }: Props) => {
  const t = useTranslations("General");
  const tL = useTranslations("Login");

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-50 py-my-64 dark:bg-neutral-950">
      <Card>
        <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2">
          <Suspense
            fallback={
              <div className="w-80">
                <Loader />
              </div>
            }
          >
            <LoginForm locale={params.locale} />
          </Suspense>
          <div className="flex min-h-64 w-72 flex-col items-center justify-center gap-my-16 rounded bg-primary-100 dark:bg-primary-900">
            <h4 className="text-h4">{t("dont_have_an_account_question")}</h4>
            <p>{tL("start_journey_with_us")}</p>
            <Link href={`/signup`}>
              <Button variant="outline">{tL("register_here")}</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Page;
