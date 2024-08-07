import Portal from "@/app/components/generic/Portal";
import MagicButtonForm from "./MagicButtonForm";
import MagicButtonCompare, { IQuestionComparison } from "./MagicButtonCompare";
import CenteredMessage from "@/app/components/generic/CenteredMessage";
import { useState } from "react";

interface Props {
  closeDrawer: () => void;
}

const LayoutMagicButton = ({ closeDrawer }: Props) => {
  const [newQuestions, setNewQuestions] = useState<IQuestionComparison[]>([]);
  const loadingState = useState(false);

  return (
    <>
      <Portal elementId="questions-portal-start">
        <MagicButtonForm
          setNewQuestions={setNewQuestions}
          loadingState={loadingState}
          closeDrawer={closeDrawer}
        />
      </Portal>
      <Portal elementId="questions-portal-center">
        <MagicButtonCompare
          newQuestions={newQuestions}
          loading={loadingState[0]}
        />
      </Portal>
      {/* <Portal elementId="questions-portal-end">
        <CenteredMessage message="HELLO" />
      </Portal> */}
    </>
  );
};

export default LayoutMagicButton;
