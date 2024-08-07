import ListExpandedItem from "@/app/components/generic/ListExpandedItem";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import SurveyContext from "../../context/SurveyContext";
import IcoMessage from "@/app/components/generic/IcoMessage";
import { useRouter } from "@/internationalization/navigation";
import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import ConfirmContext from "@/app/context/ConfirmContext";
import Image from "next/image";

export interface IQuestionComparison {
  id: number;
  order: number;
  original: string;
  generated: string;
}

interface Props {
  newQuestions: IQuestionComparison[];
  loading: boolean;
}

const MagicButtonCompare = ({ newQuestions, loading }: Props) => {
  const t = useTranslations("Surveys");
  const { mostrarConfirm } = useContext(ConfirmContext);
  const router = useRouter();
  const {
    survey: { id },
    questions: { questions, updateQ },
  } = useContext(SurveyContext);
  const [selectedQuestions, setSelectedQuestions] = useState<
    { id: number; option: "original" | "generated" }[]
  >([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSelectedQuestions(
      newQuestions.map((el) => ({ id: el.id, option: "generated" })),
    );
  }, [newQuestions]);

  const isChoiceSelected = (id: number, option: "original" | "generated") => {
    return !!selectedQuestions.find(
      (el) => el.id === id && el.option === option,
    );
  };

  const selectQuestion = (id: number, option: "original" | "generated") => {
    setSelectedQuestions(
      selectedQuestions.map((el) => {
        if (el.id === id) {
          return { ...el, option };
        } else {
          return el;
        }
      }),
    );
  };

  const saveSelection = async () => {
    if (!(await mostrarConfirm(t("update_questions_question")))) return;
    const newQ = questions.map((el) => {
      const newQuestion = newQuestions.find((el0) => el0.id === el.question_id);
      if (newQuestion) {
        // const selectedQuestion = selectedQuestions.find(
        //   (el0) => el0.id === el.id
        // );
        // if (selectedQuestion) {
        //   if (selectedQuestion.option === "original") {
        //     return { ...el, question: newQuestion.original };
        //   } else {
        //     return { ...el, question: newQuestion.generated };
        //   }
        // } else {
        //   return el;
        // }
      } else {
        return el;
      }
    });
    // setQuestions(newQ);
    setSaved(true);
  };

  return (
    <div className="my-scrollbar flex h-[calc(100vh_-_144px)] w-full justify-center overflow-y-auto bg-white p-m dark:bg-neutral-900 lg:h-[calc(100vh_-_48px)]">
      {loading ? (
        <IcoMessage
          ico="ico-color-wand-outline"
          message={t("doing_magic") + "..."}
        />
      ) : questions.length === 0 ? (
        <div className="flex flex-col">
          <IcoMessage
            ico="ico-file-tray-outline"
            message={t("add_some_questions")}
            className="my-0"
          />
          <MyButton
            hierarchy={2}
            onClick={() => router.push(`/surveys/${id}?tab=questions`)}
          >
            {t("go_to_questions_editor")}
          </MyButton>
        </div>
      ) : newQuestions.length === 0 ? (
        <IcoMessage
          ico="ico-color-wand-outline"
          message={t("fill_form_magic_button")}
        />
      ) : saved ? (
        <>
          <div className="flex flex-col items-center justify-center gap-5 text-dark dark:text-lightest_d">
            <Image
              alt="Check"
              src={"/ico/check-color.svg"}
              width={80}
              height={80}
            />
            <p>{t("questions_updated")}</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-s">
          <div className="flex w-full flex-col gap-xs">
            <div className="flex items-end gap-xs">
              <div className="ico-color-wand-outline h-l w-l dark:invert" />
              <p className="text-heading3">{t("magic_button")}</p>
            </div>
            <p className="secondary-text">{t("to_keep_original_question")}</p>
          </div>
          <div className="hidden w-full grid-cols-[1fr_40px_1fr] justify-items-center font-bold sm:grid">
            <p>{t("original_questions")}</p>
            <span />
            <p>{t("generated_questions")}</p>
          </div>
          <div className="flex flex-col gap-my-64">
            {newQuestions.map((el) => (
              <div
                key={el.id}
                className="flex w-full flex-col items-center justify-items-center gap-my-8 sm:grid sm:grid-cols-[1fr_40px_1fr] sm:gap-s"
              >
                <div
                  className={`w-full
                ${isChoiceSelected(el.id, "original") ? "" : "opacity-50"}`}
                >
                  <ListExpandedItem
                    title={el.original}
                    onClick={() => selectQuestion(el.id, "original")}
                    active={isChoiceSelected(el.id, "original")}
                    titleOrder={el.order}
                  />
                </div>
                <div className="hidden dark:text-white sm:block">
                  <MyIcon icon="FiChevronRight" size={24} />
                </div>
                {/* <div className="dark:text-white sm:hidden">
                  <MyIcon icon="FiChevronDown" size={24} />
                </div> */}
                <div
                  className={`w-full
                ${isChoiceSelected(el.id, "generated") ? "" : "opacity-50"}`}
                >
                  <ListExpandedItem
                    title={el.generated}
                    onClick={() => selectQuestion(el.id, "generated")}
                    active={
                      !!selectedQuestions.find(
                        (el0) => el0.id === el.id && el0.option === "generated",
                      )
                    }
                    titleOrder={el.order}
                  />
                </div>
              </div>
            ))}
            <MyButton onClick={saveSelection} className="mx-auto">
              {t("save_selection")}
            </MyButton>
            <div className="h-xs" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MagicButtonCompare;
