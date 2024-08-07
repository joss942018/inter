"use client";

import MyBreadcrumbs from "@/app/components/MyBreadcrumbs";
import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import MyTooltip from "@/app/components/MyTooltip";
import Portal from "@/app/components/generic/Portal";
import StatusBadge from "@/app/components/generic/StatusBadge";
import { EnumErrorType } from "@/helpers/Questions";
import { usePathname, useRouter } from "@/internationalization/navigation";
import { Badge, Loader, Modal, ScrollArea, Tabs } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { toast } from "react-toastify";
import FormShareSurvey from "./components/FormShareSurvey";
import SurveyContext, { SurveyProvider } from "./context/SurveyContext";

interface Props {
  children: React.ReactNode;
  params: {
    surveyid: string;
  };
}

const InnerLayout = ({ children, params }: Props) => {
  const t = useTranslations("Surveys");
  const pathname = usePathname();
  const [opened, { open, close }] = useDisclosure();
  const {
    survey: { id: surveyId, loading, form },
    questions: { allQuestionsValidation },
  } = useContext(SurveyContext);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const screen = pathname.includes("stats")
    ? 2
    : pathname.includes("responses")
      ? 1
      : 0;
  const router = useRouter();

  return (
    <>
      <div className="h-full min-h-screen">{children}</div>
      <Portal elementId="navbar-start-portal">
        <div className="flex items-center gap-my-24">
          <MyBreadcrumbs
            list={[
              { link: t("surveys"), href: "/surveys" },
              // { link: form.formData.name },
            ]}
          />
        </div>
      </Portal>
      <Portal elementId="navbar-center-portal">
        <div className="flex w-full items-center justify-between px-my-12 lg:justify-end">
          <div id="drawer-portal-action-buttons" className="flex gap-s" />
          <Badge
            color={
              loading.getSurvey
                ? "cyan"
                : loading.updateSurvey || loading.uploadLogo
                  ? "blue"
                  : form.formState.isDirty
                    ? "green"
                    : "gray"
            }
            leftSection={
              loading.getSurvey ||
              loading.updateSurvey ||
              loading.uploadLogo ? (
                <Loader size={16} color="white" />
              ) : null
            }
            size="lg"
          >
            {t(
              loading.getSurvey
                ? "fetching"
                : loading.updateSurvey
                  ? "updating"
                  : loading.uploadLogo
                    ? "updating"
                    : form.formState.isDirty
                      ? "pending_changes"
                      : "saved",
            )}
          </Badge>
          <div className="flex w-max">
            <MyTooltip text={t("preview")} position="bottom">
              <MyButton
                hierarchy={4}
                onClick={() => {
                  if (allQuestionsValidation.validado) {
                    window.open(`/survey/${surveyId}?preview=1`, "_blank");
                  } else if (
                    allQuestionsValidation.errorType ===
                    EnumErrorType.zero_questions
                  ) {
                    toast(t("must_add_at_least_1_question"), { type: "error" });
                  } else {
                    toast(t("some_questions_texts_are_empty"), {
                      type: "error",
                    });
                  }
                }}
                squared
              >
                <MyIcon icon="FiEye" size={24} />
              </MyButton>
            </MyTooltip>
            <MyTooltip text={t("share")} position="bottom">
              <MyButton hierarchy={4} onClick={open} squared>
                <MyIcon icon="FiShare" size={24} />
              </MyButton>
            </MyTooltip>
          </div>
        </div>
      </Portal>
      <Portal elementId="navbar-end-portal">
        <Tabs
          value={
            screen === 2
              ? `${params.surveyid}/stats`
              : screen === 1
                ? `${params.surveyid}/responses`
                : `${params.surveyid}`
          }
          onChange={(value) => router.push(`/surveys/${value}`)}
          className="mx-auto"
        >
          <Tabs.List justify="center">
            {[
              {
                text: t("Questions"),
                href: `${params.surveyid}`,
              },
              {
                text: t("Responses"),
                href: `${params.surveyid}/responses`,
              },
              {
                text: t("statistics"),
                href: `${params.surveyid}/stats`,
              },
            ].map((el) => (
              <Tabs.Tab key={el.text} value={el.href}>
                {el.text}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </Portal>
      <Modal
        opened={opened}
        fullScreen={isMobile}
        size={"948px"}
        onClose={close}
        scrollAreaComponent={ScrollArea.Autosize}
        title={t("sharing_survey")}
      >
        <FormShareSurvey />
      </Modal>
    </>
  );
};

const Layout = ({ children, params }: Props) => {
  return (
    <SurveyProvider>
      <InnerLayout params={params}>{children}</InnerLayout>
    </SurveyProvider>
  );
};

export default Layout;
