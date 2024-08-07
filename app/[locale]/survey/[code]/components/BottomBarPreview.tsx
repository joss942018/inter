import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import { useTranslations } from "next-intl";

interface IProps {
  questionsLength: number;
  step: number;
  currentQuestionIndex: number;
  previousDisabled: boolean;
  previousQuestion: () => void;
  handleContinue: () => void;
}

const BottomBarPreview = ({
  currentQuestionIndex,
  previousDisabled,
  previousQuestion,
  questionsLength,
  step,
  handleContinue,
}: IProps) => {
  const t = useTranslations("SRSurvey");

  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-2 items-center px-my-16">
      {step === 1 && questionsLength > 1 && currentQuestionIndex > 0 && (
        <MyButton
          hierarchy={4}
          onClick={previousQuestion}
          disabled={previousDisabled}
          className="col-start-1 col-end-2 !bg-transparent !px-my-24"
        >
          <MyIcon icon="FiChevronLeft" size={24} />
          {t("back")}
        </MyButton>
      )}
      {step === 1 && (
        <MyButton
          hierarchy={4}
          onClick={handleContinue}
          className="col-start-2 col-end-3 justify-self-end !bg-transparent !px-my-24"
        >
          {t(currentQuestionIndex >= questionsLength - 1 ? "finish" : "next")}
          <MyIcon
            icon={
              currentQuestionIndex >= questionsLength - 1
                ? "FiCheck"
                : "FiChevronRight"
            }
            size={24}
          />
        </MyButton>
      )}
    </div>
  );
};

export default BottomBarPreview;
