import MyButton from "@/app/components/MyButton";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { useTranslations } from "next-intl";
import { useCallback, useContext, useEffect, useState } from "react";
import SurveyContext from "../../context/SurveyContext";

type TypeStoredHistory = [number, string, string];

const chipStyle =
  "font-medium cursor-pointer px-3 py-1 rounded-full bg-white dark:bg-dark_d hover:bg-light dark:hover:bg-medium_d";
const activeChipStyle = "text-primary dark:text-primary_d font-semibold";

const BranchLogic = () => {
  const {
    questions: { questions },
    surveyFlow: { openedFlowElement },
  } = useContext(SurveyContext);
  const t = useTranslations("Surveys");

  const [storedMCHistory, setStoredMCHistory] = useLocalStorage<
    TypeStoredHistory[]
  >({
    key: "storedMCHistory",
    fallbackValue: [],
  });
  const [storedTFHistory, setStoredTFHistory] = useLocalStorage<
    TypeStoredHistory[]
  >({
    key: "storedTFHistory",
    fallbackValue: [],
  });

  const [mcOptionSelected, setMCOptionSelected] = useState<string | null>(null);
  const [tfOptionSelected, setTFOptionSelected] = useState<string | null>(null);
  const [questionSelected, setQuestionSelected] = useState<
    [string, number] | null
  >(null);

  const questionId = Number(openedFlowElement?.id);

  useEffect(() => {
    if (questionId && questionId > 0) {
      setQuestionSelected(null);
      setMCOptionSelected(null);
      setTFOptionSelected(null);
    }
  }, [questionId]);

  const handleMCBranching = useCallback(
    (branchQid: number, chosenOption: string, branchedQuestion: string) => {
      // mcQuestionBranch({
      //   variables: {
      //     branchedQuestionId: branchQid,
      //     questionId: questionId,
      //     branchedQuestionMcqLogic: chosenOption,
      //   },
      //   onCompleted: () => {
      //     const message = `${t("for_option")} ${chosenOption}, ${t(
      //       "branched_to"
      //     )} ${branchedQuestion}`;
      //     toast(message, {
      //       type: "success",
      //       position: "top-center",
      //     });
      //     let tempStoredMCHistory = [...storedMCHistory];
      //     tempStoredMCHistory = tempStoredMCHistory.filter(
      //       (el) =>
      //         el[0] !== questionId ||
      //         (el[0] === questionId && el[2] !== chosenOption)
      //     );
      //     tempStoredMCHistory.push([questionId, message, chosenOption]);
      //     setStoredMCHistory(tempStoredMCHistory);
      //   },
      // });
    },
    [
      // mcQuestionBranch,
      // storedMCHistory,
      // questionId,
      // openedQuestionData,
      // setStoredMCHistory,
    ],
  );

  const handleTFBranching = useCallback(
    (branchQid: number, chosenOption: string, branchedQuestion: string) => {
      // tfQuestionBranch({
      //   variables: {
      //     branchedQuestionId: branchQid,
      //     questionId: questionId,
      //     branchedQuestionTfLogic: chosenOption,
      //   },
      //   onCompleted: () => {
      //     const message = `${t("for_option")} ${chosenOption}, ${t(
      //       "branched_to"
      //     )} ${branchedQuestion}`;
      //     toast(message, {
      //       type: "success",
      //       position: "top-center",
      //     });
      //     let tempStoredTFHistory = [...storedTFHistory];
      //     tempStoredTFHistory = tempStoredTFHistory.filter(
      //       (el) =>
      //         el[0] !== questionId ||
      //         (el[0] === questionId && el[2] !== chosenOption)
      //     );
      //     tempStoredTFHistory.push([questionId, message, chosenOption]);
      //     setStoredTFHistory(tempStoredTFHistory);
      //   },
      // });
    },
    [
      // tfQuestionBranch,
      // storedTFHistory,
      // questionId,
      // openedQuestionData,
      // setStoredTFHistory,
    ],
  );
  return (
    <div className="flex h-[calc(100vh_-_144px)] w-full flex-col gap-xs bg-white p-s dark:bg-neutral-900 lg:h-[calc(100vh_-_48px)]">
      <p className="secondary-text">History</p>
      {/* {openedQuestionData?.idQuestionType === 3 ||
      openedQuestionData?.idQuestionType === 10
        ? storedMCHistory
            .filter((el) => el[0] === questionId)
            .map((el, i) => <p key={i}>{el[1]}</p>)
        : storedTFHistory
            .filter((el) => el[0] === questionId)
            .map((el, i) => <p key={i}>{el[1]}</p>)} */}

      <p className="secondary-text">{t("select_option")}</p>

      {/* Option list for TF type question*/}
      {/* {loadingMC ? (
        <Loader />
      ) : (
        (openedQuestionData?.idQuestionType === 2 ||
          openedQuestionData?.idQuestionType === 9) && (
          <div className="flex gap-2 bg-lightest dark:bg-neutral-950 rounded-xl p-3">
            <button
              className={`${chipStyle} ${
                tfOptionSelected === "true" && activeChipStyle
              }`}
              onClick={() => setTFOptionSelected("true")}
            >
              {t("yes")}
            </button>
            <button
              className={`${chipStyle} ${
                tfOptionSelected === "false" && activeChipStyle
              }`}
              onClick={() => setTFOptionSelected("false")}
            >
              {t("no")}
            </button>
          </div>
        )
      )} */}

      {/* Option list for MC type question*/}
      {/* {(openedQuestionData?.idQuestionType === 3 ||
        openedQuestionData?.idQuestionType === 10) && (
        <div className="flex flex-row flex-wrap gap-2 bg-lightest dark:bg-neutral-950 rounded-xl p-3">
          {dataMC?.optionsByQuestionId?.map((el) => (
            <p
              key={el?.id}
              onClick={() => setMCOptionSelected(String(el?.optionText))}
              className={`${chipStyle} ${
                mcOptionSelected === String(el?.optionText) && activeChipStyle
              }`}
            >
              {el?.optionText}
            </p>
          ))}
        </div>
      )} */}

      {/* Question list */}
      {(mcOptionSelected !== null || tfOptionSelected !== null) && (
        <div className="mt-xs flex flex-col gap-xs">
          <p className="secondary-text">{t("select_question")}</p>
          <div className="my-scrollbar flex h-max max-h-80 flex-col gap-1 overflow-y-auto rounded-xl bg-lightest p-3 dark:bg-neutral-950">
            {/* {questions.map((el, i) => (
              <div key={i}>
                {openedQuestionData?.question !== el.question && (
                  <p
                    onClick={() => {
                      setQuestionSelected([String(el?.question), el.id]);
                    }}
                    className={`cursor-pointer hover:text-primary dark:hover:text-primary_d py-1 ${
                      questionSelected?.[0] === String(el?.question) &&
                      "text-primary dark:text-primary_d font-semibold"
                    }`}
                  >
                    {el.orderOfQuestion}. {el.question}
                  </p>
                )}
              </div>
            ))} */}
          </div>
        </div>
      )}

      {questionSelected !== null && (
        <MyButton
          className="m-auto"
          hierarchy={1}
          size="small"
          onClick={() => {
            mcOptionSelected !== null && tfOptionSelected === null ? (
              handleMCBranching(
                questionSelected[1],
                mcOptionSelected,
                questionSelected[0],
              )
            ) : tfOptionSelected !== null && mcOptionSelected === null ? (
              handleTFBranching(
                questionSelected[1],
                tfOptionSelected,
                questionSelected[0],
              )
            ) : (
              <></>
            );
          }}
        >
          {t("confirm")}
        </MyButton>
      )}
    </div>
  );
};

export default BranchLogic;

{
  /* Final result */
}
{
  /* <p>
            <span className="text-primary dark:text-primary_d text-lg">
              {data?.question}
            </span>{" "}
            {t("will_be_branched_to")}{" "}
            <span className="text-primary dark:text-primary_d text-lg">
              {questionSelected[0]}
            </span>{" "}
            {t("for_option")}{" "}
            {data?.idQuestionType === 3 ? (
              <span className="text-primary dark:text-primary_d text-lg">
                {mcOptionSelected}
              </span>
            ) : (
              <span className="text-primary dark:text-primary_d text-lg">
                {tfOptionSelected === "true" ? t("yes") : t("no")}
              </span>
            )}
          </p> */
}
