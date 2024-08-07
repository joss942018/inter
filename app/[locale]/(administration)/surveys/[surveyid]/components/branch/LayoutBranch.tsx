import CenteredMessage from "@/app/components/generic/CenteredMessage";
import Portal from "@/app/components/generic/Portal";
import { useContext } from "react";
import SurveyContext from "../../context/SurveyContext";
import Branch from "../questions/Branch";
import BranchLogic from "../questions/BranchLogic";

const LayoutBranch = () => {
  const {
    surveyFlow: { openedFlowElement },
  } = useContext(SurveyContext);

  return (
    <>
      <Portal elementId="questions-portal-start">
        <Branch />
      </Portal>
      <Portal elementId="questions-portal-center">
        {Number(openedFlowElement?.id ?? 0) > 0 ? (
          <BranchLogic />
        ) : (
          <CenteredMessage message="Branch" />
        )}
      </Portal>
      {/* <Portal elementId="questions-portal-end">
        <CenteredMessage message="Branch" />
      </Portal> */}
    </>
  );
};

export default LayoutBranch;
