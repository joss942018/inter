"use client";

import { useTranslations } from "next-intl";
import { IClusterDescStats, IDescStats } from "../page";
import StatusBadge from "@/app/components/generic/StatusBadge";
import CenteredMessage from "@/app/components/generic/CenteredMessage";
import { Fragment } from "react";
import { Card, Skeleton } from "@mantine/core";

interface Props {
  title: string;
  data?: IClusterDescStats[];
  summary?: boolean;
  loading?: boolean;
}

const DescClusterQuestion = ({ title, data, summary, loading }: Props) => {
  const t = useTranslations("Surveys");

  if (loading)
    return (
      <div className="flex flex-col">
        <SkeletonDescClusterQuestion />
        <SkeletonDescClusterQuestion />
      </div>
    );

  return (
    <div
      className={`relative overflow-hidden rounded-l-my-8
      ${summary ? "" : "w-full flex-1"}
      `}
    >
      <div className="my-scrollbar h-[calc(100%_-_2px)] overflow-y-auto overflow-x-hidden">
        <div className="absolute left-my-12 z-[11] h-m w-my-4 bg-white dark:bg-neutral-800" />
        {!data || (data && !(data.length > 0)) ? (
          <CenteredMessage message={t("no_registered_answers")} />
        ) : (
          <div>
            <table className="ml-my-12 table-auto">
              <thead>
                <tr className="text-small sticky top-0 z-10 h-m border-l-4 bg-white dark:bg-neutral-800">
                  <th className="w-full pl-s text-start">
                    {t("response").toUpperCase().charAt(0)}
                    {t("response").slice(1)}
                  </th>
                  <th className="pr-s">{t("frequency")}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, i) => (
                  <Fragment key={i}>
                    <tr
                      className={`text-body hover:bg-neutral-50 dark:hover:bg-neutral-950
                    ${
                      el.emotion === "positive"
                        ? "border-l-4 border-green-500"
                        : el.emotion === "negative"
                          ? "border-l-4 border-red-500 dark:border-red-400"
                          : "border-l-4 border-neutral-600 dark:border-neutral-300"
                    }`}
                    >
                      <td className={`flex flex-col py-4 pl-s text-start`}>
                        {el.answers.map((el0, i) => (
                          <span key={i} className="text-small">
                            {el0.answer}
                          </span>
                        ))}
                      </td>
                      <td className="pr-s text-center">
                        {Math.trunc(Number(el.percentage) * 100) / 100} %{" "}
                      </td>
                    </tr>
                    {i < data.length - 1 && <tr className="h-my-4" />}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescClusterQuestion;

const SkeletonDescClusterQuestion = () => {
  return (
    <Card
      className="relative grid h-max grid-cols-[4px_2.5fr_1fr] gap-my-16"
      py={"2px"}
      px="md"
    >
      <Skeleton w={4} h="100%" radius={"0"} />
      <div className="flex h-my-96 flex-col justify-center gap-my-12">
        <Skeleton h={16} radius={"xl"} />
        <Skeleton h={16} radius={"xl"} />
        <Skeleton h={16} radius={"xl"} />
      </div>
      <div className="flex h-full items-center justify-center">
        <Skeleton h={50} w={50} circle />
      </div>
    </Card>
  );
};
