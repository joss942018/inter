import MySelect from "@/app/components/MySelect";
import { useTranslations } from "next-intl";
import { IStatsFilters } from "../page";
import { AnimatePresence, motion } from "framer-motion";
import Animations from "@/app/styles/animations";
import { useEffect, useState } from "react";
import MyIcon from "@/app/components/MyIcon";
import useWindowSize from "@/app/hooks/useWindowSize";

interface Props {
  filters: IStatsFilters;
  setFilters: React.Dispatch<React.SetStateAction<IStatsFilters>>;
}

const StatsFilters = ({ filters, setFilters }: Props) => {
  const t = useTranslations("Surveys.Stats.Filter");
  const [opened, setOpened] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (!width) return;
    if (width < 768) setOpened(false);
    else setOpened(true);
  }, [width]);

  useEffect(() => {
    if (filters.stage === "connected")
      setFilters((f) => ({ ...f, emotion: "all" }));
  }, [filters.stage]);

  return (
    <div className="decorative-border flex w-full flex-col items-center justify-between border-b bg-white dark:bg-neutral-950 md:h-my-64 md:flex-row">
      <div
        className="flex w-full items-center justify-between px-my-12 py-my-12 pb-my-12 text-neutral-500 dark:text-neutral-300 md:w-max md:py-0 md:pb-0"
        onClick={() => setOpened(width && width > 768 ? true : !opened)}
      >
        <div className="flex items-center gap-my-8">
          <MyIcon icon="FiFilter" />
          <h6 className="text-h6">{t("filters")}</h6>
        </div>
        <div className="md:hidden">
          <MyIcon icon="FiChevronDown" size={24} />
        </div>
      </div>
      <AnimatePresence>
        {opened && (
          <motion.div
            {...Animations.dropdown}
            className={`flex w-full flex-col justify-end gap-my-12 px-my-12 md:grid md:w-max md:grid-cols-[160px_160px_280px]`}
          >
            <MySelect
              placeholder={t("emotions")}
              name="emotion"
              onChange={(_, value: any) =>
                setFilters({ ...filters, emotion: value })
              }
              options={[
                { label: t("all"), value: "all" },
                { label: t("positive"), value: "positive" },
                { label: t("neutral"), value: "neutral" },
                { label: t("negative"), value: "negative" },
              ]}
              value={filters.emotion}
              disabled={filters.stage === "connected"}
              icon={
                filters.stage === "connected"
                  ? "FiLock"
                  : filters.emotion === "neutral"
                    ? "FiMeh"
                    : filters.emotion === "negative"
                      ? "FiFrown"
                      : "FiSmile"
              }
            />
            <MySelect
              placeholder={t("stages")}
              name="stage"
              onChange={(_, value: any) =>
                setFilters({ ...filters, stage: value })
              }
              options={[
                { label: t("connected"), value: "connected" },
                { label: t("engaged"), value: "engaged" },
                { label: t("listened"), value: "listened" },
              ]}
              value={filters.stage}
              icon="FiGitCommit"
            />
            {/* <DateTimeRangePicker
              icon="FiCalendar"
              name="startDate"
              onChange={(_, value) =>
                setFilters({ ...filters, dateRange: value })
              }
              value={filters.dateRange}
              placeholder={t("date_range")}
            /> */}
            {/* I use this instead of a padding bottom because it produces a bounce on the animation */}
            <div className="h-0 w-full md:hidden" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatsFilters;
