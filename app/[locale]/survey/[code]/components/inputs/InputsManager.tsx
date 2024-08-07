import { useContext } from "react";
import SurveyFlowContext from "../../context/SurveyFlowContext";
import Open from "./Open";
import DateInput from "./Date";
import File from "./File";
import MC from "./MC";
import Rate from "./Rate";
import Boolean from "./Boolean";
import Credential from "./Credential";

const InputsManager = () => {
  const {
    questions: { currentQuestion },
  } = useContext(SurveyFlowContext);

  if (!currentQuestion) return null;

  const questionType = currentQuestion?.question_type;

  switch (questionType) {
    case "boolean":
      return <Boolean />;
    case "credential":
      return <Credential />;
    case "date":
      return <DateInput />;
    case "file":
      return <File />;
    case "mc":
      return <MC />;
    case "open":
      return <Open />;
    case "rating":
      return <Rate />;
    default:
      return null;
  }
};

export default InputsManager;
