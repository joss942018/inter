import IcoMessage from "@/app/components/generic/IcoMessage";
import { Skeleton } from "@mantine/core";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { ICoordinates } from "../MapComponent";
const MapComponent = dynamic(() => import("../../components/MapComponent"), {
  ssr: false,
});

interface Props {
  coordinates: ICoordinates[];
  loading?: boolean;
}

const StatisticsMap = ({ coordinates, loading }: Props) => {
  const t = useTranslations("Surveys");

  return (
    <div className="stats-card decorative-border border">
      <div className="stats-title stats-floating-title">
        <p>{t("answered_from")}</p>
      </div>
      <Skeleton visible={loading} h={"100%"}>
        <div className="relative h-full w-full overflow-hidden rounded-my-8 bg-white">
          {coordinates.length > 0 ? (
            <MapComponent data={coordinates} />
          ) : (
            <div className="flex h-full items-center justify-center text-center">
              <IcoMessage
                ico="ico-earth-outline"
                message={t("locations_couldnt_be_found")}
              />
            </div>
          )}
        </div>
      </Skeleton>
    </div>
  );
};

export default StatisticsMap;
