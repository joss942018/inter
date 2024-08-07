import MyTooltip from "@/app/components/MyTooltip";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  chartType: boolean;
  setChartType: (chartType: boolean) => void;
}

const ChartTypeSelector = ({ chartType, setChartType }: Props) => {
  const t = useTranslations("Surveys");

  return (
    <div className="flex gap-xs m-auto w-max">
      <MyTooltip text={t("pie_chart")} position="bottom">
        <span
          className={`ico-pie-chart-outline w-s h-s opaque-action-button
            ${!chartType ? "invert-0 dark:invert" : ""}`}
          onClick={() => setChartType(false)}
        />
      </MyTooltip>
      <MyTooltip text={t("bar_chart")} position="bottom">
        <span
          className={`ico-bar-chart-outline w-s h-s opaque-action-button
            ${chartType ? "invert-0 dark:invert" : ""}`}
          onClick={() => setChartType(true)}
        />
      </MyTooltip>
    </div>
  );
};

export default ChartTypeSelector;
