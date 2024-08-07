import ListExpandedItem from "@/app/components/generic/ListExpandedItem";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { modals } from "@mantine/modals";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import SurveyContext from "../../context/SurveyContext";
import { IQuestion } from "../../hooks/useQuestions";

interface Props {
  id: string;
  data: IQuestion;
  orderOfQuestion: number;
  dragging: boolean;
}

const Question = ({ id, data, orderOfQuestion, dragging }: Props) => {
  const t = useTranslations("Surveys");
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.question_id.toString() });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: dragging ? 50 : 0,
  };
  const {
    questions: { deleteQ, loading },
    surveyFlow: { openedFlowElement, setOpenedFlowElId },
  } = useContext(SurveyContext);

  const handleDeleteQuestion = () =>
    modals.openConfirmModal({
      title: t("delete_question_question"),
      labels: { confirm: t("yes"), cancel: t("no") },
      confirmProps: { color: "red" },
      onConfirm: () => deleteQ(data.question_id),
    });

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ListExpandedItem
        helpText={t(`question_types.${data.question_type}`)}
        // helpText={t(renderQuestionTypeById(data.question_type))}
        onClick={() => setOpenedFlowElId(Number(id))}
        title={data.question_text + (data.required ? " *" : "")}
        emptyText={t("set_qst")}
        order={orderOfQuestion}
        active={Number(openedFlowElement?.id) === Number(id)}
        dragging={dragging}
        actions={[
          {
            ico: "FiTrash2",
            label: t("delete"),
            onClick: handleDeleteQuestion,
            loading:
              (loading.deleteQ[0] === data.question_id ||
                loading.updateQ[0] === data.question_id) &&
              (loading.deleteQ[1] || loading.updateQ[1]),
          },
        ]}
      />
    </div>
  );
};

export default Question;
