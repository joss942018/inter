import MyProgressBar from "@/app/components/MyProgressBar";
import { myQuery } from "@/helpers/Fetch";
import { Divider, ScrollArea, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import SurveyContext from "../../../context/SurveyContext";

interface IStat {
  label: string;
  value: number;
  count: number;
}

const DevicesStatistics = () => {
  const t = useTranslations("Surveys.Stats.Devices");
  const {
    survey: { id },
  } = useContext(SurveyContext);

  const { data, isLoading } = useQuery({
    queryKey: ["/statistics/devices_statistics_by_survey", id ?? 0],
    queryFn: myQuery<{
      message: string;
      data: { devices: Record<string, number>; os: Record<string, number> };
    }>(),
  });

  const [formattedData, setFormattedData] = useState<{
    devices: IStat[];
    os: IStat[];
  }>({ devices: [], os: [] });

  const normalize = (val: number, max: number, min: number) =>
    (val - min) / (max - min);

  const formatData = (data: Record<string, number>): IStat[] => {
    const total = Object.keys(data).reduce(
      (total, value) => total + data[value],
      0,
    );
    let finalData: IStat[] = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const el = data[key];
        finalData.push({
          count: el,
          label: key,
          value: el / total,
        });
      }
    }
    const max = Math.max(...finalData.map((el) => el.value));
    const min = Math.min(...finalData.map((el) => el.value));
    for (const el of finalData) {
      el.value = normalize(el.value, max, min);
    }
    return finalData;
  };

  useEffect(() => {
    const devices = formatData({ ...data?.data.devices });
    const os = formatData({ ...data?.data.os });
    setFormattedData({ devices, os });
  }, [data]);

  return (
    <div className="decorative-border stats-card stats-1 border">
      <div className="stats-title flex gap-my-12">
        <p className="flex-1">{t("devices")}</p>
        <div className="h-full w-0" />
        <p className="flex-1">{t("os")}</p>
      </div>
      {isLoading ? (
        <SkeletonDevices />
      ) : (
        <div className="flex gap-my-12 overflow-hidden px-my-16 pb-my-16">
          <div className="flex-1">
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-2">
                {formattedData.devices.map((el) => (
                  <MyProgressBar
                    key={el.label + el.value}
                    label={el.label}
                    value={el.value}
                    customValue={el.count}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="decorative-border h-full w-0 border-l" />
          <div className="flex-1">
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-2">
                {formattedData.os.map((el) => (
                  <MyProgressBar
                    key={el.label + el.value}
                    label={el.label}
                    value={el.value}
                    customValue={el.count}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevicesStatistics;

const SkeletonDevices = () => {
  return (
    <div className="flex w-full px-my-16 pb-my-16">
      <div className="flex flex-1 flex-col gap-4">
        <SkeletonDevicesCell />
        <SkeletonDevicesCell />
        <SkeletonDevicesCell />
        <SkeletonDevicesCell />
      </div>
      <Divider mx={8} orientation="vertical" />
      <div className="flex flex-1 flex-col gap-4">
        <SkeletonDevicesCell />
        <SkeletonDevicesCell />
        <SkeletonDevicesCell />
        <SkeletonDevicesCell />
      </div>
    </div>
  );
};

const SkeletonDevicesCell = () => {
  return (
    <div className="flex flex-col">
      <div className="flex h-6 items-center justify-between">
        <Skeleton w={"50%"} h={10} />
        <Skeleton w={"10%"} h={10} />
      </div>
      <Skeleton h={8} />
    </div>
  );
};
