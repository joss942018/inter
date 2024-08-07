import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import OptionDnD from "./OptionDnD";
import { Loader, Pill, PillsInput } from "@mantine/core";
import { myMutation, myQuery } from "@/helpers/Fetch";
import { useSession } from "next-auth/react";
import getEnv from "@/helpers/Env";
import { useFormContext } from "react-hook-form";
import { Switch } from "react-hook-form-mantine";

export interface IOption {
  id: number;
  option: string;
  order: number;
}

interface Props {
  questionId: number;
}

function MC({ questionId }: Props) {
  const t = useTranslations("Surveys");
  const session = useSession();
  const queryClient = useQueryClient();

  const [newOptionValue, setNewOptionValue] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [options, setOptions] = useState<IOption[]>([]);

  // queries
  const { data: optionsQuery, isLoading } = useQuery({
    queryKey: ["/api/v1/survey/option", questionId],
    queryFn: myQuery<IOption[]>({
      token: session.data?.user.token,
    }),
    initialData: [],
  });

  useEffect(() => {
    setOptions(optionsQuery);
  }, [optionsQuery]);

  const refetchOptions = () =>
    queryClient.invalidateQueries({
      queryKey: ["/api/v1/survey/option", questionId],
    });

  // mutations
  const { mutate: deleteO, isPending: isPendingDelete } = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(
        `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/survey/option/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${session?.data?.user.token}`,
          },
        },
      );
      if (!res.ok) return;
      return res.json();
    },
    onSuccess: refetchOptions,
  });
  const { mutate: newO, isPending: isPendingNew } = useMutation({
    mutationFn: myMutation({
      url: "/api/v1/survey/option/",
      token: session.data?.user.token,
    }),
    onError: (data) => console.error(data),
    onSuccess: () => {
      setNewOptionValue("");
      refetchOptions();
    },
  });
  const { mutate: moveOption, isPending: isPendingMove } = useMutation({
    mutationFn: myMutation({
      url: "/api/v1/survey/option/reorder_option/",
      token: session.data?.user.token,
      method: "POST",
    }),
    onSuccess: refetchOptions,
  });

  const handleDeleteOption = (id: number) => deleteO(id);

  const createOption = useCallback(
    (optionText: string) =>
      newO({
        question: questionId,
        option: optionText,
      }),
    [newO, questionId],
  );

  const handleCreateOption = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const target = e.target as HTMLInputElement;
        if (!target.value || target.value.length <= 0) return;
        createOption(target.value);
      }
    },
    [createOption],
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleCreateButtonClick = () => {
    const target = inputRef.current;
    if (!target || !target.value || target.value.length <= 0) return;
    createOption(target.value);
  };

  const handleDragEnd = useCallback(
    (a: DragEndEvent) => {
      const { active, over } = a;
      if (over && active.id !== over.id) {
        const newIndex0 = [...options]
          .map((el) => el.id.toString())
          .indexOf(over.id.toString());
        const variables = {
          optionId: Number(active.id),
          optionOrder: newIndex0 + 1,
        };

        // moveOption({
        //   variables,
        //   onError: (data) => console.error(data),
        // });
        // setOptions((items) => {
        //   let newItems = [...items];
        //   const mapId = newItems.map((el) => el.id.toString());
        //   const oldIndex = mapId.indexOf(active.id.toString());
        //   const newIndex = mapId.indexOf(over.id.toString());
        //   let temp = arrayMove(newItems, oldIndex, newIndex);
        //   temp = [...temp].map((q, i) => ({
        //     ...q,
        //     order: i + 1,
        //   }));
        //   return temp;
        // });
      }
    },
    [options, moveOption],
  );

  // useEffect(() => {
  //   console.log("options: ", options);
  // }, [options]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { delay: 100, tolerance: 5 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 100, tolerance: 5 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const { control } = useFormContext();

  return (
    <>
      <Switch
        control={control}
        name="mc_question.more_than_one"
        label={t("more_than_one_option")}
      />
      <PillsInput
        label={t("choices")}
        leftSection={isLoading ? <Loader size={"xs"} /> : null}
        disabled={isLoading || isPendingDelete || isPendingMove}
      >
        <DndContext
          onDragEnd={(e) => {
            handleDragEnd(e);
            setActiveId(null);
          }}
          collisionDetection={closestCenter}
          sensors={sensors}
          modifiers={[restrictToWindowEdges]}
          onDragStart={(e) => setActiveId(Number(e.active.id))}
        >
          <Pill.Group>
            <SortableContext items={options.map((el) => el.id.toString())}>
              {options.map((el) => (
                <OptionDnD
                  key={el?.id.toString()}
                  id={el?.id.toString()}
                  orderOfQuestion={el.order}
                  dragging={activeId === el.id}
                  optionText={el.option}
                  deleteOption={() => handleDeleteOption(el.id)}
                />
              ))}
            </SortableContext>
            <PillsInput.Field
              onKeyDown={handleCreateOption}
              placeholder={t("new_choice")}
              onChange={(e) => setNewOptionValue(e.target.value)}
              value={newOptionValue}
              disabled={isPendingNew}
            />
          </Pill.Group>
        </DndContext>
      </PillsInput>
    </>
  );
}

export default MC;
