"use client";

import Tabs from "@/app/components/generic/Tabs";
import { useState } from "react";
import ChatBubble from "../../components/responses/ChatBubble";
import Chip from "@/app/components/generic/Chip";
import { useTranslations } from "next-intl";
import { IDescStats } from "../page";
import TopicDescStat from "./TopicsDescStat";

interface Props {
  data: IDescStats[0];
  summary?: boolean;
}

const DescQuestion = ({ data, summary }: Props) => {
  const t = useTranslations("Surveys");
  const [highlightWords, setHighlightWords] = useState<string[]>([]);

  const [screen, setScreen] = useState(0);

  const handleChip = (word: string) => {
    if (highlightWords.includes(word)) {
      setHighlightWords((prev) => prev.filter((el) => el !== word));
    } else {
      setHighlightWords((prev) => [...prev, word]);
    }
  };

  return (
    <>
      {data &&
        data.summarized_answers &&
        data.summarized_answers.length === 0 && (
          <p
            className={`text-center ${
              summary ? "text-slate-500 card w-max" : ""
            }`}
          >
            {t("no_registered_answers")}
          </p>
        )}

      {data &&
        data.summarized_answers &&
        data.summarized_answers.length > 0 && (
          <div
            className={`m-auto w-full overflow-hidden flex flex-col gap-2 border ${
              summary
                ? "max-w-lg card h-full md:h-80"
                : "h-full md:card md:max-w-xl bg-white dark:bg-dark_d rounded-2xl py-4 px-2"
            }`}
          >
            {!summary && (
              <Tabs
                lista={[
                  String(t("adjectives")),
                  String(t("nouns")),
                  String(t("verbs")),
                  String(t("emotions")),
                  String(t("topics")),
                ]}
                selected={screen}
                setSelected={setScreen}
                nivel={2}
              />
            )}
            <div
              className={` ${
                summary
                  ? "hidden"
                  : "flex flex-row flex-nowrap gap-1 py-1 overflow-x-auto overflow-y-hidden my-scrollbar"
              }`}
            >
              {screen !== 4 &&
                data[
                  screen === 0
                    ? "adjectives"
                    : screen === 1
                    ? "nouns"
                    : screen === 2
                    ? "verbs"
                    : screen === 3
                    ? "emotions"
                    : "topic"
                ].map((el, i) => (
                  <Chip
                    key={i}
                    label={`${el[0]}  ${el[1]}`}
                    className="text-xs"
                    onClick={() => handleChip(el[0])}
                    selected={highlightWords.includes(el[0])}
                  />
                ))}
            </div>

            <div
              className={`${
                summary ? "h-fit" : "h-72"
              } flex flex-col gap-4 h-72 overflow-x-hidden overflow-y-auto my-scrollbar`}
            >
              {screen === 4 || summary ? (
                <TopicDescStat data={data} />
              ) : (
                data.summarized_answers.map((el, i) => (
                  <ChatBubble key={i} text={el} highlight={highlightWords} />
                ))
              )}
            </div>
          </div>
        )}
    </>
  );
};

export default DescQuestion;
