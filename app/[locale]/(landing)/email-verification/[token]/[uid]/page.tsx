import MyLink from "@/app/components/MyLink";
import getEnv from "@/helpers/Env";
import { Link } from "@/internationalization/navigation";
import { Button, Card } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface IProps {
  params: {
    token: string;
    uid: string;
  };
}

const Page = async ({ params }: IProps) => {
  const t = await getTranslations("Session");
  const res = await fetch(
    `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/auth/users/activation/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: params.uid,
        token: params.token,
      }),
    },
  );
  let success = false;
  if (res.ok) success = true;

  return (
    <div className="flex h-screen w-full items-center justify-center bg-lightest dark:bg-neutral-950">
      <Card>
        <div className="flex w-72 flex-col items-center gap-5 text-center  md:w-96">
          <h2 className="text-3xl font-semibold">{t("email_verification")}</h2>
          {success ? (
            <>
              <Image
                alt="Success"
                src={"/ico/check-color.svg"}
                width={80}
                height={80}
              />
              <p className="dark:text-slate-400">
                {t("the_email")} {t("was_successfully_verified")}
              </p>
              <Link href={`/login`}>
                <Button>{t("go_to_login")}</Button>
              </Link>
            </>
          ) : (
            <>
              <Image
                alt="Error"
                src={"/ico/error-color.svg"}
                width={80}
                height={80}
              />
              <p className="dark:text-slate-400">
                {t("the_email")} {t("couldnt_be_verified")}
              </p>
              {/* {error && <p className="errorMessage">{error.message}</p>} */}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Page;
