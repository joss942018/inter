import EmojiIndex from "@/app/[locale]/(administration)/components/EmojiIndex";
import MyIcon from "@/app/components/MyIcon";
import useWindowSize from "@/app/hooks/useWindowSize";
import { Skeleton } from "@mantine/core";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { IAudioCount, ILogsStats } from "../../page";

interface Props {
  dataKpi?: any;
  audioCount: IAudioCount;
  logsStats: ILogsStats;
  loaders: {
    dataKpi: boolean;
    audioCount: boolean;
    logsStats: boolean;
  };
}

const statStyle =
  "p-s rounded-md border decorative-border bg-white dark:bg-dark_d flex flex-col gap-my-4";
const statTitle =
  "secondary-text whitespace-nowrap text-small uppercase tracking-wider";
const fabStyle =
  "bg-primary-500 rounded-full shadow-xl p-2 absolute z-[1] top-1/2 -translate-y-1/2 hover:bg-primary-400 text-white flex items-center justify-center w-my-32 h-my-32";

const GeneralStatistics = ({
  dataKpi,
  audioCount,
  logsStats,
  loaders,
}: Props) => {
  const t = useTranslations("Surveys");
  const contRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const [x, setX] = useState(0);
  const { scrollXProgress } = useScroll({ container: contRef });
  const [scrollPosition, setScrollPosition] = useState<
    "start" | "middle" | "end" | "none"
  >("start");

  useMotionValueEvent(scrollXProgress, "change", (myx) => {
    setX(myx);
  });

  useEffect(() => {
    let sP: typeof scrollPosition = "start";
    if (x < 0.03) {
      sP = "start";
    } else if (x > 0.97) {
      sP = "end";
    } else {
      sP = "middle";
    }
    if (
      contRef.current &&
      contRef.current?.scrollWidth <= contRef.current?.clientWidth
    ) {
      sP = "none";
    }
    setScrollPosition(sP);
  }, [x, width]);

  const calculateAverageTime = () => {
    let total = 0;
    const avgTime = { ...dataKpi?.kpiAverageTime?.averageTime };
    for (const key in avgTime) {
      if (Object.prototype.hasOwnProperty.call(avgTime, key)) {
        const element = avgTime[key as any];
        const avgEl = Number(element.average_time);
        if (!isNaN(avgEl)) {
          total += avgEl;
        }
      }
    }
    return new Date(total * 1000).toISOString().slice(14, 19);
  };

  const satisfactionIndex =
    Math.round(Number(dataKpi?.kpiSatisfactionIndex?.average) * 10) / 10;

  const audioCountPercentage = Math.round(
    (audioCount.count / Number(logsStats.visited)) * 100,
  );

  const answerIndex = Math.round(
    (Number(logsStats.finished) / Number(logsStats.press_start_button)) * 100,
  );

  return (
    <div className="relative mx-auto flex h-max w-full flex-col gap-my-24 overflow-hidden lg:max-w-max">
      <div
        ref={contRef}
        className="relative flex flex-col gap-xs overflow-x-auto overflow-y-hidden px-my-24 scrollbar-none sm:grid sm:grid-cols-2 md:flex md:flex-row md:flex-nowrap"
      >
        <div className="absolute left-0" ref={startRef} />
        {/* Attempted rate */}
        <div className={statStyle}>
          {loaders.logsStats ? (
            <SkeletonStat label={t("attempted_surveys")} />
          ) : (
            <>
              <p className={statTitle}>{t("attempted_surveys")}</p>
              <p className="text-heading2">{Number(logsStats.visited)}</p>
            </>
          )}
        </div>

        {/* Completion rate */}
        <div className={statStyle}>
          {loaders.logsStats ? (
            <SkeletonStat label={t("completed_surveys")} />
          ) : (
            <>
              <p className={statTitle}>{t("completed_surveys")}</p>
              <p className="text-heading2">{Number(logsStats.finished)}</p>
            </>
          )}
        </div>

        {/* Completion percentage, brand index, visited/finished */}
        <div className={statStyle}>
          {loaders.logsStats ? (
            <SkeletonStat label={t("brand_index")} />
          ) : (
            <>
              <p className={statTitle}>{t("brand_index")}</p>
              <p className="text-heading2">
                {logsStats.visited && logsStats.finished > 0
                  ? (
                      (Number(logsStats.finished) / Number(logsStats.visited)) *
                      100
                    ).toFixed(0)
                  : 0}
                %
              </p>
            </>
          )}
        </div>

        {/* answer index, pressed_start/finished */}
        <div className={statStyle}>
          {loaders.logsStats ? (
            <SkeletonStat label={t("answer_index")} />
          ) : (
            <>
              <p className={statTitle}>{t("answer_index")}</p>
              <p className="text-heading2">{answerIndex}%</p>
            </>
          )}
        </div>

        {/* Avergate time per survey */}
        <div className={statStyle}>
          {loaders.dataKpi ? (
            <SkeletonStat label={`${t("average_time")} (mm:ss)`} />
          ) : (
            <>
              <p className={statTitle}>{t("average_time")} (mm:ss)</p>
              <p className="text-heading2">{calculateAverageTime()}</p>
            </>
          )}
        </div>

        {/* Satisfaction index */}
        <div className={statStyle}>
          {loaders.dataKpi ? (
            <SkeletonStat label={t("satisfaction_index")} />
          ) : (
            <>
              <p className={statTitle}>{t("satisfaction_index")}</p>
              <p className="text-heading2 flex items-center">
                <span className="mr-xs">{satisfactionIndex}</span>
                {satisfactionIndex > 0 && (
                  <EmojiIndex index={satisfactionIndex} size={24} />
                )}
              </p>
            </>
          )}
        </div>

        {/* audio count */}
        <div className={statStyle}>
          {loaders.audioCount || loaders.logsStats ? (
            <SkeletonStat label={t("rated_with_audio")} />
          ) : (
            <>
              <p className={statTitle}>{t("rated_with_audio")}</p>
              <p className="flex items-center">
                <span className="text-heading2 mr-xs">
                  {audioCountPercentage}%
                </span>
                <span className="text-heading4 secondary-text mr-xs whitespace-nowrap">
                  ({audioCount.count} {t("surveys").toLowerCase()})
                </span>
              </p>
            </>
          )}
        </div>

        {/* total answers count */}
        <div className={statStyle}>
          {loaders.audioCount || loaders.logsStats ? (
            <SkeletonStat label={t("answers")} />
          ) : (
            <>
              <p className={statTitle}>{t("answers")}</p>
              <p className="flex items-center">
                <span className="text-heading2 mr-xs">
                  {logsStats.questions_reached.reduce(
                    (total, el) => el.count + total,
                    0,
                  )}
                </span>
              </p>
            </>
          )}
        </div>

        <div className="absolute right-0 md:relative" ref={endRef} />
      </div>

      {(scrollPosition === "middle" || scrollPosition === "end") && (
        <button
          className={`${fabStyle} left-my-24`}
          onClick={() =>
            startRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            })
          }
        >
          <MyIcon icon="FiChevronLeft" size={24} />
        </button>
      )}

      {(scrollPosition === "middle" || scrollPosition === "start") && (
        <button
          className={`${fabStyle} right-my-24`}
          onClick={() =>
            endRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            })
          }
        >
          <MyIcon icon="FiChevronRight" size={24} />
        </button>
      )}
    </div>
  );
};

export default GeneralStatistics;

const SkeletonStat = ({ label }: { label: string }) => (
  <div className="flex flex-col gap-1">
    <Skeleton h={24}>
      <p className={statTitle}>{label}</p>
    </Skeleton>
    <Skeleton h={24} w="30%" />
  </div>
);
