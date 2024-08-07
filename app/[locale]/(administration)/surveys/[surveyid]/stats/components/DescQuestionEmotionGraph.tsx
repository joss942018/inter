import ThemeContext from "@/app/context/ThemeContext";
import { Skeleton } from "@mantine/core";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { Bubble } from "react-chartjs-2";
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export interface IPlotData {
  x: number;
  y: number;
  r: number;
  emotion: string;
}

// const quadrantsColors = {
//   positiveActive: [29, 161, 44],
//   positivePassive: [11, 125, 163],
//   negativeActive: [255, 25, 74],
//   negativePassive: [50, 50, 50],
// };

interface Props {
  data: IPlotData[];
  summary?: boolean;
  loading?: boolean;
}

const DescQuestionEmotionGraph = ({ data, summary, loading }: Props) => {
  const t = useTranslations("Surveys");
  const { theme } = useContext(ThemeContext);

  const calculateColor = (x: number, y: number, opacity: number = 0.5) => {
    let rgbColor = "7f33cc";
    if (x < -0.1) rgbColor = "c33";
    if (x > 0.1) rgbColor = "3c3";
    return `#${rgbColor}`;
  };
  // const calculateColor = (x: number, y: number, opacity: number = 0.5) => {
  //   let rgbColor = quadrantsColors.positiveActive;
  //   if (x < 0 && y < 0) rgbColor = quadrantsColors.negativePassive;
  //   if (x < 0 && y >= 0) rgbColor = quadrantsColors.negativeActive;
  //   if (x >= 0 && y < 0) rgbColor = quadrantsColors.positivePassive;
  //   return `rgba(${rgbColor.join(", ")}, ${opacity})`;
  // };

  const normalizeDataGroup = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    if (max === min) return data;
    return data.map((d) => (d - min) / (max - min));
  };

  const normalizeCoordinates = (data: IPlotData[]) => {
    const x = normalizeDataGroup(data.map((d) => d.x));
    const y = normalizeDataGroup(data.map((d) => d.y));
    const tempData = data.map((d, i) => ({ ...d, x: x[i], y: y[i] }));
    return tempData;
  };

  const plotData = {
    labels: data.map((d) => d.emotion),
    datasets: [
      {
        data: normalizeCoordinates(data).map((d) => ({
          x: d.x,
          y: d.y,
          r: d.r * 2,
        })),
        backgroundColor: data.map((d) => calculateColor(d.x, d.y)),
        borderColor: data.map((d) => calculateColor(d.x, d.y, 1)),
      },
    ],
  };

  return (
    <div
      className={`decorative-border flex flex-col gap-xs border-t sm:border-t-0`}
    >
      <Skeleton visible={loading} w={"90%"} mx="auto">
        <p className="text-small h-m text-center font-bold leading-8">
          {t("emotions")}
        </p>
        <div
          className={`
      ${summary ? "h-[250px] w-[240px]" : "h-96 w-full"}
      decorative-border relative mx-auto flex items-center justify-center`}
        >
          <span className="secondary-text text-small absolute -right-4 top-1/2 -translate-y-1/2 -rotate-90">
            {t("positive")}
          </span>
          <span className="secondary-text text-small absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90">
            {t("negative")}
          </span>
          <span className="secondary-text text-small absolute left-1/2 top-0 -translate-x-1/2">
            {t("active_male")}
          </span>
          <span className="secondary-text text-small absolute bottom-0 left-1/2 -translate-x-1/2">
            {t("pasive")}
          </span>
          <div className="h-[90%] w-[90%]">
            <Bubble
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    min: -1.25,
                    max: 1.25,
                    position: "center",
                    // title: {
                    //   display: true,
                    //   text: t("intensity"),
                    //   align: "end",
                    //   font: {
                    //     weight: "bold",
                    //   },
                    // },
                    border: {
                      color: theme === "dark" ? "#555" : "#ddd",
                    },
                    grid: {
                      display: false,
                    },
                    ticks: {
                      stepSize: 1,
                      display: false,
                    },
                  },
                  y: {
                    min: -1.25,
                    max: 1.25,
                    position: "center",
                    // title: {
                    //   display: true,
                    //   text: t("positivity"),
                    //   font: {
                    //     weight: "bold",
                    //   },
                    // },
                    border: {
                      color: theme === "dark" ? "#555" : "#ddd",
                    },
                    grid: {
                      display: false,
                    },
                    ticks: {
                      stepSize: 1,
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
              data={plotData}
            />
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default DescQuestionEmotionGraph;
