import Portal from "@/app/components/generic/Portal";
import Details from "./Details";
import { useTranslations } from "next-intl";
import CenteredMessage from "@/app/components/generic/CenteredMessage";
import { useContext } from "react";
import SurveyContext from "../../context/SurveyContext";
import MyLink from "@/app/components/MyLink";

const LayoutDetails = () => {
  const t = useTranslations("Surveys");
  const {
    survey: { id },
  } = useContext(SurveyContext);

  return (
    <>
      <Portal elementId="questions-portal-start">
        <Details />
      </Portal>
      <Portal elementId="questions-portal-center">
        <div className="flex flex-col gap-my-16 items-center">
          <CenteredMessage message={t("click_qst_preview")} />
          <MyLink hierarchy={2} href={`/surveys/${id}?tab=questions`}>
            {t("go_to_questions_editor")}
          </MyLink>
        </div>
      </Portal>
      {/* <Portal elementId="questions-portal-end">
        {id > 0 ? (
          <CenteredMessage message={t("select_qst_branch_tab")} />
        ) : (
          <CenteredMessage message={t("message_specify_title")} />
        )}
      </Portal> */}
    </>
  );
};

export default LayoutDetails;
