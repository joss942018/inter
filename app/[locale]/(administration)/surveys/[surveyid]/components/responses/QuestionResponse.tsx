import CenteredMessage from "@/app/components/generic/CenteredMessage";
import StatusBadge from "@/app/components/generic/StatusBadge";
import { useTranslations } from "next-intl";

interface Props {
  questionText: string;
  type: string;
  children?: React.ReactNode;
  emotion?: string | null;
}

const QuestionResponse = ({ questionText, type, children, emotion }: Props) => {
  const t = useTranslations("Surveys");

  return (
    <div className="flex flex-col gap-my-16">
      <div className="bubble left -ml-my-16 bg-white dark:bg-neutral-800">
        <span className="font-medium">
          {questionText} <span className="secondary-text text-xs">{type}</span>
        </span>
      </div>

      <div
        className={`bubble right -mr-my-16
        ${
          children
            ? "bg-primary-200 dark:bg-primary-900"
            : "bg-neutral-200 dark:bg-neutral-900"
        }`}
      >
        {children ? (
          <div className="flex flex-col">
            <p className="text-gray-700 dark:text-gray-200">{children}</p>
            {emotion && emotion.length > 0 && (
              <StatusBadge text={emotion.slice(0, 35)} status={0} />
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="secondary-text text-small">{t("no_data")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionResponse;
