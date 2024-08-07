import React from "react";
import { IDescStats } from "../page";

interface Props {
  data: IDescStats[0];
  summary?: boolean;
}

const TopicDescStat = ({ data, summary }: Props) => {
  const totalTopics = data.topic.reduce((acc, el) => acc + el[1], 0);

  return (
    <>
      {data.topic.map((el, i) => (
        <div key={i} className="flex flex-row justify-between">
          <p className="">{el[0]}</p>
          <p className="text-gray-600 dark:text-gray-400">
            {Math.round((el[1] / totalTopics) * 100)}%
          </p>
        </div>
      ))}
      {<p>{data.summarizedContext}</p>}
    </>
  );
};

export default TopicDescStat;
