import BottomBarPreview from "@/app/[locale]/survey/[code]/components/BottomBarPreview";
import { TopBarPreview } from "@/app/[locale]/survey/[code]/components/TopBarPreview";
import BooleanBase from "@/app/[locale]/survey/[code]/components/inputs/base-components/BooleanBase";
import DateBase from "@/app/[locale]/survey/[code]/components/inputs/base-components/DateBase";
import FileBase from "@/app/[locale]/survey/[code]/components/inputs/base-components/FileBase";
import MCBase from "@/app/[locale]/survey/[code]/components/inputs/base-components/MCBase";
import OpenBase from "@/app/[locale]/survey/[code]/components/inputs/base-components/OpenBase";
import RatingBase from "@/app/[locale]/survey/[code]/components/inputs/base-components/RatingBase";
import TextBase from "@/app/[locale]/survey/[code]/components/inputs/base-components/TextBase";
import { myQuery } from "@/helpers/Fetch";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import SurveyContext from "../../context/SurveyContext";
import { IOption } from "./question/MC";
import LayoutSurvey from "@/app/[locale]/survey/[code]/components/layouts/LayoutSurvey";
import LayoutQuestion from "@/app/[locale]/survey/[code]/components/layouts/LayoutQuestion";

const QuestionPreview = () => {
  const session = useSession();
  const {
    surveyFlow: { openedFlowElement },
  } = useContext(SurveyContext);

  const qT = openedFlowElement?.question_type;

  const { data: mcOptions } = useQuery({
    queryKey: ["/api/v1/survey/option", openedFlowElement?.question_id ?? 0],
    queryFn: myQuery<IOption[]>({
      token: session.data?.user.token,
    }),
    initialData: [],
    enabled:
      openedFlowElement?.question_type === "mc" &&
      !!openedFlowElement?.question_id,
  });

  return (
    <div className="flex h-[calc(100vh_-_96px)] w-[calc(100%_-_48px)] justify-center">
      <LayoutSurvey
        topBar={
          <TopBarPreview preview progress={10} speakerOn={false} step={1} />
        }
        bottomBar={
          <BottomBarPreview
            currentQuestionIndex={0}
            handleContinue={() => {}}
            previousDisabled
            previousQuestion={() => {}}
            questionsLength={1}
            step={1}
          />
        }
      >
        <LayoutQuestion
          id={openedFlowElement?.id}
          question={openedFlowElement?.question_text}
        >
          {qT === "boolean" ? (
            <BooleanBase />
          ) : qT === "credential" ? (
            <TextBase />
          ) : qT === "date" ? (
            <DateBase
              range={openedFlowElement?.date_question?.range}
              withTime={openedFlowElement?.date_question?.include_time}
            />
          ) : qT === "file" ? (
            <FileBase />
          ) : qT === "mc" ? (
            <MCBase options={mcOptions ?? []} />
          ) : qT === "open" ? (
            <OpenBase
              type={openedFlowElement?.open_question?.open_question_type}
            />
          ) : qT === "rating" ? (
            <RatingBase
              type={openedFlowElement?.rating_question?.rating_question_type}
              from={openedFlowElement?.rating_question?.rating_from}
              to={openedFlowElement?.rating_question?.rating_to}
            />
          ) : null}
        </LayoutQuestion>
      </LayoutSurvey>
    </div>
  );
};

export default QuestionPreview;
