import ThemeContext from "@/app/context/ThemeContext";
import Colors from "@/helpers/Colors";
import { useTranslations } from "next-intl";
import { useCallback, useContext, useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import SurveyContext from "../../context/SurveyContext";
import ChartTypeSelector from "./ChartTypeSelector";
import SummarySectionContainer from "./summary/SummarySectionContainer";

interface Props {
  title: string;
  id: number;
  summary?: {
    id: number;
    answer: boolean;
    created_at: string;
    updated_at: string;
    question_answer: number;
  }[];
}

const TFQuestion = ({ title, id, summary }: Props) => {
  const t = useTranslations("Surveys");
  const { theme } = useContext(ThemeContext);
  const [chartType, setChartType] = useState(false); // true = bar chart, false = pie chart
  const {
    survey: { id: surveyId },
  } = useContext(SurveyContext);

  // Transformar los datos de summary para obtener los contadores de true y false
  const transformSummaryData = (data) => {
    const counts = data.reduce(
      (acc, curr) => {
        if (curr.answer) {
          acc.trueCount += 1;
        } else {
          acc.falseCount += 1;
        }
        return acc;
      },
      { trueCount: 0, falseCount: 0 }
    );
    return counts;
  };

  const summaryData = transformSummaryData(summary || []);
  const no_true = summaryData.trueCount;
  const no_false = summaryData.falseCount;
  const sum = no_false + no_true;

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as "left" | "top" | "right",
        align: "center" as "center" | "start" | "end",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `${t("frequency")}: ${value}%`;
          },
        },
      },
    },
  };

  const data = {
    labels: [t("yes"), t("no")],
    datasets: [
      {
        data: [
          ((no_true * 100) / sum).toFixed(2),
          ((no_false * 100) / sum).toFixed(2),
        ],
        backgroundColor: Colors.charts.map((color) => `${color}AA`),
        borderColor: "white",
      },
    ],
  };

  return (
    <SummarySectionContainer title={title} summary={summary}>
      <div className={`${summary ? "h-full" : "h-96"} w-full`}>
        <ChartTypeSelector chartType={chartType} setChartType={setChartType} />
        <div className="m-auto h-[88%] w-[88%]">
          {chartType ? (
            <Bar
              data={data}
              options={{
                ...graphOptions,
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          ) : (
            <Pie data={data} options={graphOptions} />
          )}
        </div>
      </div>
    </SummarySectionContainer>
  );
};

export default TFQuestion;
