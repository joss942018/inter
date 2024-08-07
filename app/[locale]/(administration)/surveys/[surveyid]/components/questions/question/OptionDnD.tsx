import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { Pill } from "@mantine/core";

type Props = {
  id: string;
  orderOfQuestion: number;
  dragging: boolean;
  optionText: string;
  deleteOption: () => void;
};

const OptionDnD = ({ id, dragging, optionText, deleteOption }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id.toString() });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // cursor: "grab",
  };

  return (
    <Pill
      ref={setNodeRef}
      className={`${
        dragging ? "z-50 cursor-grabbing shadow-xl" : "z-0 cursor-grab"
      }`}
      style={style}
      withRemoveButton
      onRemove={() => deleteOption()}
      {...attributes}
      {...listeners}
    >
      {optionText}
    </Pill>
  );
};

export default OptionDnD;
