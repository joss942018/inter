"use client";

import { useContext } from "react";
import SurveyFlowContext from "../context/SurveyFlowContext";
import { TopBarPreview } from "./TopBarPreview";

const TopBar = () => {
  const {
    survey: { preview, restartSurvey, speakerOn, setSpeakerOn, step },
  } = useContext(SurveyFlowContext);

  return (
    <TopBarPreview
      handleRestartSurvey={restartSurvey}
      preview={preview}
      progress={1}
      setSpeakerOn={setSpeakerOn}
      speakerOn={speakerOn}
      step={step}
    />
  );
};

export default TopBar;
