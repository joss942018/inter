import Colors from "@/helpers/Colors";
import { Skeleton } from "@mantine/core";
import {
  BarController,
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { Line } from "react-chartjs-2";
import SurveyContext from "../../context/SurveyContext";
import { ILogsStats } from "../page";
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Filler,
);

const options: React.ComponentProps<typeof Line>["options"] = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 5,
      hoverRadius: 7,
    },
  },
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
};

interface Props {
  logsStats: ILogsStats;
  loading: boolean;
}

const CompletionRate = ({ logsStats, loading }: Props) => {
  const t = useTranslations("Surveys");
  const {
    questions: { questions },
    survey: { loading: loadingQuestions },
  } = useContext(SurveyContext);

  // const fetchInfo = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/statistics/completion_rate/${id}/`
  //     );
  //     const data = response.data.completion_rate;
  //     setCompletionRateData(data);
  //   } catch (error) {
  //     console.error("Error fetching completion rate:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchInfo();
  // }, [id]);

  // // Calculate the sum of numbers after colons (":")
  // const sumOfNumbersAfterColons = Object.values<number>(completionRateData)
  //   .map((answeredCount) => parseInt(String(answeredCount), 10))
  //   .reduce((accumulator, answeredCount) => accumulator + answeredCount, 0);

  // // Initialize the adjustedSum with the sum of numbers after colons
  // let adjustedSum = sumOfNumbersAfterColons;

  const labels = [
    t("invited"),
    t("opened"),
    t("visited"),
    t("started"),
    ...questions.map((_, index) => `Q${index + 1}`),
    t("end"),
  ];

  // const displaySums: number[] = [];
  // Object.entries(completionRateData).forEach(([questionId, answeredCount]) => {
  //   const numberAfterColon = parseInt(String(answeredCount), 10);
  //   const displaySum = adjustedSum;
  //   adjustedSum -= numberAfterColon;
  //   displaySums.push(displaySum);
  // });

  const dataInsideBar = [
    logsStats.invited,
    logsStats.opened,
    logsStats.visited,
    logsStats.press_start_button,
    ...logsStats.questions_reached.map((el) => el.count),
    logsStats.finished,
  ];

  const dataBar: ChartData<"line", any[], string> = {
    labels: labels,
    datasets: [
      {
        label: t("no_of_people"),
        data: dataInsideBar,
        borderColor: Colors.charts[1],
        fill: "origin",
      },
    ],
  };

  return (
    <div
      className={`stats-card stats-1 2xl:stats-2 decorative-border border 2xl:col-span-2`}
    >
      <div className="stats-title">
        <p>{t("completion_graph")}</p>
      </div>
      <div className="h-full w-[inherit] p-my-16 pt-0">
        {loading || loadingQuestions ? (
          <Skeleton h="100%" />
        ) : (
          <Line data={dataBar} options={options} />
        )}
      </div>
    </div>
  );
};

export default CompletionRate;
