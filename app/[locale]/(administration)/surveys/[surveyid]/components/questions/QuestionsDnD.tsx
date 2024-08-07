"use client";

import MyIcon from "@/app/components/MyIcon";
import IcoMessage from "@/app/components/generic/IcoMessage";
import {
  DndContext,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useContext, useRef, useState } from "react";
import SurveyContext from "../../context/SurveyContext";
import Question from "./Question";

const QuestionsDnD = () => {
  const t = useTranslations("Surveys");

  const [activeId, setActiveId] = useState<string | null>(null);
  const { questions, surveyFlow, survey } = useContext(SurveyContext);
  const endRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: DragOverEvent) => {
    setActiveId(e.active.id.toString());
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { delay: 250, tolerance: 8 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 8 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const handleNewQ = () => {
    questions.newQ();
    setTimeout(() => {
      endRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 500);
  };

  return (
    <div
      className={`flex flex-col gap-my-16 p-my-16
      ${questions.questions.length === 0 ? "h-full justify-center" : ""}`}
    >
      {/* <p className="max-w-[100px]">
        {JSON.stringify(
          surveyFlow.flow.map((el) => ({ id: el.id, order: el.order })),
        )}
      </p>
      <p>{JSON.stringify(questions.questions.map((el) => el.question_id))}</p> */}
      {questions.questions.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => {
            surveyFlow.handleDragEnd(e);
            setActiveId(null);
          }}
          onDragOver={handleDragOver}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={surveyFlow.flow.map((el) => el.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            {surveyFlow.flow.slice().map((el) => {
              const q = questions.questions.find(
                (q) => q.question_id === el.question,
              );
              if (q) {
                return (
                  <Question
                    key={el.id.toString()}
                    id={el.id.toString()}
                    data={q}
                    orderOfQuestion={el.order}
                    dragging={activeId === el.id.toString()}
                  />
                );
              }
              return null;
            })}
            {/* {questions.questions.map((el, i) => (
              <Question
                key={el.question_id.toString()}
                id={el.question_id.toString()}
                data={el}
                orderOfQuestion={1}
                dragging={activeId === el.question_id.toString()}
              />
            ))} */}
          </SortableContext>
        </DndContext>
      ) : (
        <div className="h-max">
          <IcoMessage
            ico="ico-file-tray-outline"
            message={t("add_some_questions")}
          />
        </div>
      )}
      {survey.id > 0 && (
        <Button
          onClick={handleNewQ}
          className={`mx-auto mb-s w-max
          ${questions.questions.length > 0 ? "mt-s" : "mt-0"}`}
          leftSection={<MyIcon icon="FiPlus" />}
          loading={questions.loading.newQ}
        >
          {t("add_question")}
        </Button>
      )}
      <div ref={endRef} />
    </div>
  );
};

export default QuestionsDnD;
