import CenteredMessage from "@/app/components/generic/CenteredMessage";
import { useTranslations } from "next-intl";
import { useContext, useRef } from "react";
import SurveyContext from "../../context/SurveyContext";

type Props = {};

const Branch = (props: Props) => {
  const t = useTranslations("Surveys");
  const {
    questions: { questions },
  } = useContext(SurveyContext);

  const filteredQuestions = questions.filter(
    (question) => false,
    // question.idQuestionType === 2 ||
    // question.idQuestionType === 3 ||
    // question.idQuestionType === 9 ||
    // question.idQuestionType === 10
  );

  // Branch logic pop up modal for small size screen
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  return (
    <>
      <div
        className={`flex flex-col gap-my-16 p-my-16
        ${
          filteredQuestions.length === 0
            ? "h-[calc(100%_-_96px)] justify-center"
            : ""
        }`}
      >
        {filteredQuestions.length === 0 && (
          <CenteredMessage message={t("create_mc_tf_branch")} />
        )}
        {/* {filteredQuestions.map((el) => (
          <ListExpandedItem
            key={el.id}
            active={openedQuestionId === el.id}
            onClick={() => {
              setOpenedQuestionId(el.id);
              openModal();
            }}
            title={el.question}
            order={el.orderOfQuestion}
            helpText={t(renderQuestionTypeById(el.idQuestionType))}
          />
        ))} */}
      </div>
    </>
  );
};

export default Branch;
