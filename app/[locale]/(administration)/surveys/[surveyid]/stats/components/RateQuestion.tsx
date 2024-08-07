/*import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import SummarySectionContainer from "./summary/SummarySectionContainer";
import Colors from "@/helpers/Colors";

export interface IRateStats {
  questionId: number;
  rating: [number, number][];
}

interface Props {
  title: string;
  data?: IRateStats;
  summary?: boolean;
}

const RateQuestion = ({ title, data, summary }: Props) => {
  const t = useTranslations("Surveys");
  const chartData =
    data?.rating.map((el) => ({
      x: el[0].toString(),
      y: el[1],
    })) || [];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t("rating"),
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: t("count"),
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <SummarySectionContainer title={title} summary={summary}>
      {data && (
        <div className={`h-full ${summary ? "" : "h-96 w-full"} p-my-16`}>
          <Bar
            data={{
              labels: chartData.map((el) => el.x),
              datasets: [
                {
                  label: "Rating",
                  data: chartData.map((el) => el.y),
                  backgroundColor: Colors.charts.map((color) => `${color}AA`),
                  borderColor: "white",
                },
              ],
            }}
            options={chartOptions}
          />
        </div>
      )}
    </SummarySectionContainer>
  );
};

export default RateQuestion;
*/
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import SummarySectionContainer from "./summary/SummarySectionContainer";
import Colors from "@/helpers/Colors";

export interface IRateStats {
  questionId: number;
  rating: [number, number][];
}

interface Props {
  title: string;
  data?: IRateStats;
  summary?: boolean;
}

const RateQuestion = ({ title, data, summary }: Props) => {
  const t = useTranslations("Surveys");
  const chartData =
    data?.rating.map((el) => ({
      x: el[0].toString(),
      y: el[1],
    })) || [];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t("rating"),
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: t("count"),
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <SummarySectionContainer title={title} summary={summary}>
      {data && (
        <div className={`h-full ${summary ? "" : "h-96 w-full"} p-my-16`}>
          <Bar
            data={{
              labels: chartData.map((el) => el.x),
              datasets: [
                {
                  label: "Rating",
                  data: chartData.map((el) => el.y),
                  backgroundColor: Colors.charts.map((color) => `${color}AA`),
                  borderColor: "white",
                },
              ],
            }}
            options={chartOptions}
          />
        </div>
      )}
    </SummarySectionContainer>
  );
};

export default RateQuestion;
