"use client";

import MyLink from "@/app/components/MyLink";
import { EnumViewMode } from "@/app/context/ViewContext";
import { useRouter } from "@/internationalization/navigation";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Badge, Card, Table } from "@mantine/core";
import { useTranslations } from "next-intl";
import { LegacyRef, forwardRef } from "react";
import SurveyOptions from "./SurveyOptions";

export interface ISurveyss {
  id: number;
  name: string;
  created_at: string;
  question_count: number;
  answer_count: number;
  active: boolean;
  category: number;
}

interface Props {
  data: ISurveyss;
  onShare: () => void;
  onDelete?: () => void;
  viewMode: EnumViewMode;
}

const Survey = ({ data, onShare, onDelete, viewMode }: Props) => {
  const t = useTranslations("Surveys");
  const router = useRouter();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: data.id.toString(),
    });
  const style = {
    transform: CSS.Transform.toString({
      x: transform ? transform.x : 0,
      y: transform ? transform.y : 0,
      scaleX: 1,
      scaleY: 1,
    }),
  };

  if (viewMode === EnumViewMode.list)
    return (
      <>
        <Table.Tr
          className={`h-xl cursor-default items-center
          ${isDragging ? "opacity-40" : ""}
          `}
          {...attributes}
          {...listeners}
        >
          <Table.Td>
            <MyLink
              hierarchy={4}
              size="medium"
              href={`/surveys/${data.id}${data.answer_count > 0 ? "/stats" : ""}`}
              className="underline"
            >
              {data.name}
            </MyLink>
          </Table.Td>
          <Table.Td>
            <span className="secondary-text">{data.answer_count}</span>
          </Table.Td>
          <Table.Td>
            <div className={`secondary-text flex gap-2`}>
              <p>{new Date(data.created_at).toLocaleDateString()}</p>
              <p className="text-center">
                {new Date(data.created_at)
                  ?.toLocaleTimeString()
                  .substring(
                    0,
                    new Date(data.created_at).toLocaleTimeString().length - 3,
                  )}
              </p>
            </div>
          </Table.Td>

          <Table.Td>
            <Badge color={data.active ? "teal" : "gray"}>
              {t(`${data.active ? "active" : "inactive"}`)}
            </Badge>
          </Table.Td>

          {/* action buttons section */}
          <Table.Td>
            <SurveyOptions
              onShare={onShare}
              level={data.category > 0 ? 2 : 1}
              surveyData={data}
              onDelete={onDelete}
            />
          </Table.Td>
        </Table.Tr>
        {isDragging && (
          <SurveyDragSkeleton ref={setNodeRef} style={style} name={data.name} />
        )}
      </>
    );

  return (
    <>
      <Card
        withBorder
        {...attributes}
        {...listeners}
        className={`${isDragging ? "opacity-40" : ""} h-max w-72 hover:shadow-md`}
        onClick={() =>
          router.push(
            `/surveys/${data.id}${data.answer_count > 0 ? "/stats" : ""}`,
          )
        }
      >
        <div className={`flex cursor-pointer flex-col gap-3 rounded-lg`}>
          <Card.Section withBorder inheritPadding py="xs">
            {data.name}
          </Card.Section>
          <div
            className={`flex flex-col gap-3 text-sm [&>p]:grid [&>p]:grid-cols-2`}
          >
            <p>
              <span className={`text-gray-400 dark:text-gray-300`}>
                {t("responses").charAt(0).toUpperCase() +
                  t("responses").slice(1)}
              </span>
              <span>{data.answer_count}</span>
            </p>
            <p>
              <span className={`text-gray-400 dark:text-gray-300`}>
                {t("created_on")}
              </span>
              <span className={`flex flex-row gap-1 dark:text-slate-100`}>
                <p className="">
                  {new Date(data.created_at).toLocaleDateString()}
                </p>
                <p className="text-center">
                  {new Date(data.created_at)
                    ?.toLocaleTimeString()
                    .substring(
                      0,
                      new Date(data.created_at).toLocaleTimeString().length - 3,
                    )}
                </p>
              </span>
            </p>
          </div>

          {/* action buttons section */}
          <div className="flex flex-row items-center justify-between">
            <Badge color={data.active ? "teal" : "gray"}>
              {t(`${data.active ? "active" : "inactive"}`)}
            </Badge>
            <div className="-mb-my-4 -mr-my-4">
              <SurveyOptions
                level={data.category > 0 ? 2 : 1}
                surveyData={data}
                onShare={onShare}
              />
            </div>
          </div>
        </div>
      </Card>
      {isDragging && (
        <SurveyDragSkeleton ref={setNodeRef} style={style} name={data.name} />
      )}
    </>
  );
};

export default Survey;

const SurveyDragSkeleton = forwardRef(function SurveyDragSkeleton(
  { style, name }: { style: { transform?: string }; name: string },
  ref: LegacyRef<HTMLDivElement>,
) {
  return (
    <div
      className={
        "decorative-border absolute z-[9999] flex h-xl w-64 items-center gap-xs rounded border bg-primary-500 px-s shadow-xl"
      }
      style={style}
      ref={ref}
    >
      <div className="ico-move-outline h-s w-s invert" />
      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-white">
        {name}
      </p>
    </div>
  );
});
