import { useContext, useRef, useState } from "react";
import SurveyFlowContext from "../../context/SurveyFlowContext";
import TextBase from "./base-components/TextBase";
import { isCredential } from "../../helpers/validateTypes";

const Credential = () => {
  const {
    answers: { saveAnswer },
    questions: { currentQuestion },
  } = useContext(SurveyFlowContext);
  const focusedAt = useRef(new Date().toISOString());
  const [error, setError] = useState<string | null>(null);
  const currentQuestionData = isCredential(currentQuestion?.question_type_data);
  const [value, setValue] = useState<string>("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  const handleSaveAnswer = (value: string | undefined) => {
    const credentialType = currentQuestionData?.credential_type;

    if (credentialType === 'email' && !emailRegex.test(value ?? '')) {
      setError('Invalid email format');
      return;
    }

    if (credentialType === 'phone' && !phoneRegex.test(value ?? '')) {
      setError('Invalid phone format');
      return;
    }

    setError(null);
    saveAnswer({
      focused_at: focusedAt.current,
      question_id: currentQuestion?.question_id ?? 0,
      credential_answer: { answer: value ?? "" },
    });
  };

  const handleChange = (value: string) => {
    setValue(value);
    handleSaveAnswer(value);
  };

  console.log("currentQuestionData", currentQuestionData)
  console.log("VALIDAR SEGÚN EL TIPO DE CREDENCIAL!!!!");

  return (
      <div>
        <TextBase
            value={value}
            onChange={handleChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  );
};

export default Credential;
