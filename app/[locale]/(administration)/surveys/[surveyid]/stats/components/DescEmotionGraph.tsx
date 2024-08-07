import { Skeleton } from "@mantine/core";
import { useTranslations } from "next-intl";
import { Bar } from "react-chartjs-2";

export interface IEmotionGraph {
  positive: number;
  negative: number;
  neutral: number;
}

interface IProps {
  data?: IEmotionGraph;
  summary?: boolean;
  loading?: boolean;
}

const DescEmotionGraph = ({ data = { positive: 0, neutral: 0, negative: 0 }, summary, loading = false }: IProps) => {
  const t = useTranslations("Surveys");

  const plotData = {
    labels: [t("positive"), t("neutral"), t("negative")],
    datasets: [
      {
        label: t("emotions"),
        data: [data.positive, data.neutral, data.negative],
        backgroundColor: [
          "rgba(29, 161, 44, 0.8)",
          "rgba(50, 50, 120, 0.8)",
          "rgba(255, 25, 74, 0.8)",
        ],
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
        <div className="h-[89%] w-[90%]">
          <Bar
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
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
            }}
            data={plotData}
          />
        </div>
      </Skeleton>
    </div>
  );
};

export default DescEmotionGraph;
