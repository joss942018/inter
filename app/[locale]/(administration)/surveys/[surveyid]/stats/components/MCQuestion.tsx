/*import ThemeContext from "@/app/context/ThemeContext";
import Colors from "@/helpers/Colors";
import { useTranslations } from "next-intl";
import { useCallback, useContext, useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import SurveyContext from "../../context/SurveyContext";
import { IMcStats } from "../page";
import ChartTypeSelector from "./ChartTypeSelector";
import SummarySectionContainer from "./summary/SummarySectionContainer";

interface Props {
  title: string;
  id: number;
  summary?: boolean;
}

const MCQuestion = ({ title, id, summary }: Props) => {
  const t = useTranslations("Surveys");
  const { theme } = useContext(ThemeContext);
  const [chartType, setChartType] = useState(false); // true = bar chart, false = pie chart
  const {
    survey: { id: surveyId },
  } = useContext(SurveyContext);
  const [mcStatistics, setMcStatistics] = useState<IMcStats>({});

  // const [getMcStats, { data: dataMc, loading: loadingMc }] = useLazyQuery(
  //   MC_STATISTICS_SURVEY_ID,
  //   {
  //     variables: {
  //       surveyId,
  //     },
  //     fetchPolicy: "network-only",
  //   },
  // );
  const findMc = useCallback(
    (id: string | number) => {
      return mcStatistics[Number(id)];
    },
    [mcStatistics],
  );
  const [statsDates, setStatsDates] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  // useEffect(() => {
  //   if (
  //     !(surveyId > 0) ||
  //     !((statsDates[0] && statsDates[1]) || (!statsDates[0] && !statsDates[1]))
  //   )
  //     return;

  //   getMcStats({
  //     variables: {
  //       surveyId,
  //       startDate: statsDates[0]?.toISOString().substring(0, 10),
  //       endDate: statsDates[1]?.toISOString().substring(0, 10),
  //     },
  //     onError: (error) => {
  //       console.error(error);
  //     },
  //   });
  // }, [statsDates, surveyId]);

  // useEffect(() => {
  //   if (dataMc)
  //     setMcStatistics(JSON.parse(dataMc?.mcqStatisticsBySurveyId) as IMcStats);
  // }, [dataMc]);

  const mcData = findMc(id) || {};
  const totalCount = Object.values(mcData).reduce(
    (total, el) => total + el.count,
    0,
  );

  const pieData = Object.values(mcData).map((el) => ({
    option: el.option,
    percentage: ((el.count / totalCount) * 100).toFixed(2),
  }));

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderColor: theme === "dark" ? "#333" : "white",
      },
    },
    plugins: {
      legend: {
        position: "bottom" as "left" | "top" | "right",
        align: "center" as "center" | "start" | "end",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed;
            return `${t("frequency")}: ${value}%`;
          },
        },
      },
    },
  };

  const data = {
    labels: pieData.map((el) => el.option),
    datasets: [
      {
        label: "Frequency(%)",
        data: pieData.map((el) => el.percentage),
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

export default MCQuestion;

{
  /* MC
                  <div className="flex flex-col justify-end">
                    <p>Emotions</p>
                    {emotionsMC?.map((el, i) => (
                      <p key={i}>
                        {el.emotionMC}: {el.countMC}
                      </p>
                    ))}
                  </div> */

                  import ThemeContext from "@/app/context/ThemeContext";
                  import Colors from "@/helpers/Colors";
                  import { useTranslations } from "next-intl";
                  import { useContext, useState } from "react";
                  import { Bar, Pie } from "react-chartjs-2";
                  import SurveyContext from "../../context/SurveyContext";
                  import ChartTypeSelector from "./ChartTypeSelector";
                  import SummarySectionContainer from "./summary/SummarySectionContainer";
                  
                  interface Props {
                    title: string;
                    summary: any;  // No se necesita id, solo el summary
                  }
                  
                  const MCQuestion = ({ title, summary }: Props) => {
                    const t = useTranslations("Surveys");
                    const { theme } = useContext(ThemeContext);
                    const [chartType, setChartType] = useState(false); // true = bar chart, false = pie chart
                    console.log('summary', summary);
                  
                    const {
                      survey: { id: surveyId },
                    } = useContext(SurveyContext);
                    
                    // No es necesario el estado de mcStatistics ya que se pasa directamente el summary
                    const mcStatistics = summary;
                    console.log('mcStatistics', mcStatistics);
                  
                    const totalCount = Object.values(mcStatistics).reduce((total, el: any) => {
                      if (el && el.count) {
                        return total + el.count;
                      }
                      return total;
                    }, 0);
                    console.log('totalCount', totalCount);
                  
                    const pieData = Object.values(mcStatistics).map((el: any) => ({
                      option: el.option,
                      percentage: ((el.count / totalCount) * 100).toFixed(2),
                    }));
                    console.log('pieData', pieData);
                  
                    const graphOptions = {
                      responsive: true,
                      maintainAspectRatio: false,
                      elements: {
                        arc: {
                          borderColor: theme === "dark" ? "#333" : "white",
                        },
                      },
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
                      labels: pieData.map((el: any) => el.option),
                      datasets: [
                        {
                          label: "Frequency(%)",
                          data: pieData.map((el: any) => parseFloat(el.percentage)),
                          backgroundColor: Colors.charts.map((color) => `${color}AA`),
                          borderColor: "white",
                        },
                      ],
                    };
                    console.log('data', data);
                  
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
                  
                  export default MCQuestion;
                  