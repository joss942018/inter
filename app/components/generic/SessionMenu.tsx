"use client";

import SurveyLogo from "@/app/[locale]/(administration)/surveys/[surveyid]/components/SurveyLogo";
import useLogo from "@/app/hooks/useLogo";
import getEnv from "@/helpers/Env";
import { useRouter } from "@/internationalization/navigation";
import { Avatar, Button, Popover, Tooltip } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import MyIcon from "../MyIcon";
import MyLink from "../MyLink";
import { useMutation } from "@tanstack/react-query";
import { myMutation } from "@/helpers/Fetch";

const URL = `${getEnv(
  "NEXT_PUBLIC_BACKEND_ENDPOINT",
)}/payments/paypal/get_current_plan/`;

function SessionMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Navbar");
  const tS = useTranslations("Subscription");
  const router = useRouter();

  const session = useSession();

  const { loading, uploadLogo } = useLogo({
    // logoFrom: "organization",
    id: session.data?.user.id,
  });
  const ref = useDetectClickOutside({ onTriggered: () => setOpen(false) });
  const id = useId();

  const handleClick = (callback?: () => void) => {
    setOpen(false);
    if (callback) callback();
  };

  const [planName, setPlanName] = useState<string | null>(null);

  const { mutate: logOut, isPending } = useMutation({
    mutationFn: myMutation({
      url: "/auth/token/logout/",
      token: session.data?.user.token,
    }),
    onSettled: () => signOut(),
  });

  const handleLogOut = () => logOut({});

  return (
    <Popover shadow="lg" position="bottom-end">
      <Popover.Target>
        <Tooltip label={t("session_menu")} position="bottom">
          <Avatar color="indigo" className="cursor-pointer">
            {session.data?.user.first_name[0].toUpperCase()}
          </Avatar>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown>
        <div>
          <div>
            {/* TOP COLOR BAR */}
            <div className="relative bg-primary-600">
              <div className="absolute bottom-0 left-1/2 h-my-64 w-my-64 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white bg-primary-100">
                {/* {isDefaultImage ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="text-h4 !font-bold !text-primary-600 dark:text-darkest_d">
                      {session.data?.user.first_name.charAt(0).toUpperCase()}
                    </p>
                  </div>
                ) : (
                  <SurveyLogo
                    id={session.data?.user.id}
                    logoFrom="organization"
                  />
                )} */}
              </div>
              <div className="flex flex-col items-center px-my-24 pb-my-48 pt-my-24">
                <h3 className="text-h6 w-full overflow-hidden overflow-ellipsis text-center !font-bold uppercase tracking-widest !text-white">
                  {session.data?.user.first_name} {session.data?.user.last_name}
                </h3>
                <p className="text-small tracking-wide !text-white">
                  {session.data?.user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-center">
              <p className="text-md text-black dark:text-white"></p>
            </div>
          </div>

          <div className="mx-auto mb-my-16 mt-my-48 w-max">
            <MyLink
              href={`/subscription`}
              // onClick={toggleMobileMenu}
              hierarchy={2}
              // size={desktop ? "small" : "medium"}
              className={`btn btn-sm join-item !w-full justify-center lg:!w-max`}
            >
              {planName ? (
                <>
                  {planName === getEnv("NEXT_PUBLIC_PLUS_NAME") && tS("plus")}
                  {planName === getEnv("NEXT_PUBLIC_BUSINESS_NAME") &&
                    tS("business")}
                  {planName === getEnv("NEXT_PUBLIC_ENTERPRISE_NAME") &&
                    tS("enterprise")}
                </>
              ) : (
                tS("free")
              )}
            </MyLink>
          </div>
          <div className="flex flex-col">
            <Button
              leftSection={<MyIcon icon="FiSettings" size={16} />}
              onClick={() => handleClick(() => router.push(`/myaccount`))}
              variant="subtle"
              justify="start"
              className="!dark:text-neutral-100 !text-neutral-800"
            >
              {t("my_account")}
            </Button>
            <Button
              color="red"
              variant="subtle"
              justify="start"
              leftSection={<MyIcon icon="FiLogOut" size={16} />}
              onClick={() => handleClick(handleLogOut)}
              loading={isPending}
            >
              {t("log_out")}
            </Button>
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}

export default SessionMenu;
