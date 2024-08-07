"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LayoutDetails from "./components/details/LayoutDetails";
import LayoutQuestions from "./components/questions/LayoutQuestions";
import LayoutMagicButton from "./components/magicbutton/LayoutMagicButton";
import LayoutBranch from "./components/branch/LayoutBranch";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/internationalization/navigation";
import SurveyContext from "./context/SurveyContext";
import { MyDrawer } from "@/app/components/MyDrawer";
import MyTabs from "@/app/components/MyTabs";
import Portal from "@/app/components/generic/Portal";
import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import useWindowSize from "@/app/hooks/useWindowSize";

export type ActiveTab = "Details" | "Questions" | "Branch" | "MagicButton";

const Page = () => {
  const { width } = useWindowSize();
  const t = useTranslations("Surveys");
  const {
    survey: { id },
    surveyFlow: { openedFlowElement },
  } = useContext(SurveyContext);

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "details";
  const activeTab =
    tab === "questions"
      ? 1
      : tab === "magic_button"
        ? 2
        : tab === "branch"
          ? 3
          : 0;
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(true);
  const [thirdColOpen, setThirdColOpen] = useState(false);

  const [secondColElementId, setSecondColElementId] = useState(
    "questions-portal-center",
  );

  const [thirdColElementId, setThirdColElementId] = useState(
    "questions-portal-center",
  );

  useEffect(() => {
    setDrawerOpen(false);
  }, [openedFlowElement]);

  useEffect(() => {
    if (activeTab === 0 || activeTab === 1) setDrawerOpen(true);

    // Change elementId
    const secondElementId =
      width && width < 1024 / 2
        ? "questions-portal-end"
        : "questions-portal-center";
    setSecondColElementId(secondElementId);

    const thirdElementId =
      width && width < 1024 / 2
        ? "questions-portal-center"
        : "questions-portal-end";
    setThirdColElementId(thirdElementId);
  }, [activeTab, width]);

  const closeMobileDrawer = useCallback(() => {
    if (drawerOpen) setDrawerOpen(false);
  }, [drawerOpen]);

  return (
    <>
      <MyDrawer
        firstColOpen={drawerOpen}
        thirdColOpen={thirdColOpen}
        closeFirstCol={() => setDrawerOpen(false)}
        closeThirdCol={() => setThirdColOpen(false)}
        fab={
          activeTab === 1
            ? {
                text: t("preview_question"),
                icon: "FiEye",
                onClick: () => setThirdColOpen(!thirdColOpen),
              }
            : undefined
        }
        firstCol={
          <div className="grid min-h-full w-full grid-rows-[48px_1fr] pt-my-48">
            {/* <div className="overflow-x-scroll overflow-y-hidden my-scrollbar flex items-end mx-auto"> */}
            <div className="my-scrollbar flex w-full items-end overflow-y-hidden overflow-x-scroll">
              <MyTabs
                activeTab={activeTab}
                tabs={[
                  {
                    text: t("details"),
                    onClick: () => router.push(`/surveys/${id}?tab=details`),
                  },
                  {
                    text: t("Questions"),
                    onClick: () => router.push(`/surveys/${id}?tab=questions`),
                  },
                  // {
                  //   text: t("magic_button"),
                  //   onClick: () =>
                  //     router.push(`/surveys/${id}?tab=magic_button`),
                  // },
                  // {
                  //   text: t("branch"),
                  //   onClick: () => router.push(`/surveys/${id}?tab=branch`),
                  // },
                ]}
                hierarchy={2}
              />
            </div>
            <div
              className="my-scrollbar lg:overflow-y-auto lg:overflow-x-hidden"
              id="questions-portal-start"
            />
          </div>
        }
        secondCol={
          <div
            className="flex min-h-full w-full items-center justify-center bg-white pt-[110px] dark:bg-neutral-950 md:bg-neutral-50 md:pt-[144px] lg:pt-my-48"
            id={"questions-portal-center"}
            // id={secondColElementId}
          />
        }
        thirdCol={
          tab === "questions" && (
            <div
              className="flex h-screen w-full justify-center lg:pt-my-48"
              id={"questions-portal-end"}
              // id={thirdColElementId}
            />
          )
        }
      />
      <Portal elementId="drawer-portal-action-buttons">
        <div className="lg:hidden">
          <MyButton size="small" onClick={() => setDrawerOpen(true)}>
            <MyIcon icon="FiBookOpen" />
            Menu
          </MyButton>
        </div>
      </Portal>
      {tab === "details" ? (
        <LayoutDetails />
      ) : tab === "questions" ? (
        <LayoutQuestions />
      ) : tab === "magic_button" ? (
        <LayoutMagicButton closeDrawer={closeMobileDrawer} />
      ) : tab === "branch" ? (
        <LayoutBranch />
      ) : null}
    </>
  );
};

export default Page;
