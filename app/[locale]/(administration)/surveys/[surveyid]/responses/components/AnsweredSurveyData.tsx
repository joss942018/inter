import EmojiIndex from "@/app/[locale]/(administration)/components/EmojiIndex";
import MyIcon from "@/app/components/MyIcon";
import CenteredMessage from "@/app/components/generic/CenteredMessage";
import getEnv from "@/helpers/Env";
import axios from "axios";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import UAParser from "ua-parser-js";
import { useSession } from "next-auth/react";

const MapComponent = dynamic(
  () => import("../../stats/components/MapComponent"),
  {
    ssr: false,
  },
);

interface IData {
  os: string;
  ipAddress: string;
  satisfactionIndex?: number | null;
  answeredAt: string;
  finished_at: string;
  timeTaken?: number | null;
  latitude?: number | null;
  longitude?: number | null;
}

interface IUserAgent {
  browser: string | null;
  version: string | null;
  os: string | null;
  osVersion?: string | null;
  deviceType: "desktop" | "mobile";
}

interface Props {
  answeredSurveyId: number;
  surveyId: number;
  data?: IData;
  loadingSurvey: boolean;
  questions: any[];
}

const AnsweredSurveyData = ({ answeredSurveyId, surveyId, data, loadingSurvey, questions }: Props) => {
  const session = useSession();
  const t = useTranslations("Surveys");
  const [blob, setBlob] = useState<string | null>(null);
  const [userAgent, setUserAgent] = useState<IUserAgent>({
    browser: null,
    version: null,
    os: null,
    osVersion: null,
    deviceType: "desktop",
  });
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [formattedTime, setFormattedTime] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<number | null>(null);
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  useEffect(() => {
    if (data && data.finished_at) {
      const finishedAt = new Date(data.finished_at);
      const formattedDate = finishedAt.toLocaleDateString("sv");
      const formattedTime = finishedAt.toLocaleTimeString("sv", {
        hour: '2-digit',
        minute: '2-digit'
      });
      setFormattedDate(formattedDate);
      setFormattedTime(formattedTime);
    } else {
      setFormattedDate("N/A");
      setFormattedTime("N/A");
    }
  }, [data]);

  useEffect(() => {
    const ua = data?.os ?? "";
    const parsedUA = new UAParser(ua).getResult();
    setUserAgent({
      browser: parsedUA.browser.name ?? "",
      version: parsedUA.browser.version ?? "",
      os: parsedUA.os.name ?? "",
      osVersion: parsedUA.os.version ?? "",
      deviceType: parsedUA.device.type
        ? parsedUA.device.type.includes("mobile")
          ? "mobile"
          : "desktop"
        : "desktop",
    });
  }, [data?.os]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/stats/general_statistics/?survey_id=${surveyId}`,
          {
            headers: {
              Authorization: `Token ${session?.data?.user.token}`,
            },
          },
        );
        const location = response.data.answers_locations.find((loc: any) => loc.answer_id === answeredSurveyId);
        if (location) {
          console.log(location);
          setEmotion(location.emotion);
          setLocation({ latitude: location.latitude, longitude: location.longitude });
        }
      } catch (error) {
        console.error("Error fetching survey statistics:", error);
      }
    };

    fetchStatistics();
  }, [surveyId, answeredSurveyId]);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await axios({
          url: `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/client_response/answer_feedback/${answeredSurveyId}/`,
          method: "GET",
          responseType: "blob",
        });
        const blob = new Blob([(await response).data]);
        const blobUrl = window.URL.createObjectURL(blob);
        setBlob(blobUrl);
      } catch (error) {
        setBlob(null);
        console.error("Error:", error);
      }
    };
    fetchAudio();
  }, [answeredSurveyId]);

  return (
    <div className="card dark-shadow flex flex-col overflow-hidden !p-0 shadow-lg dark:!bg-neutral-800 md:grid md:h-80 md:grid-cols-[1fr_320px]">
      <div className="my-scrollbar flex flex-col gap-my-16 overflow-y-auto overflow-x-hidden rounded-2xl bg-transparent p-my-24 text-sm">
        <p className="text-h4">{t("survey_data")}</p>
        {data ? (
          <div className="grid gap-my-16">
            <div className="grid gap-my-16 xl:grid-cols-2">
              <p className="flex flex-col">
                <span className="secondary-text">{t("os")}</span>
                <div className="flex items-center gap-my-16">
                  <span className="text-h6">
                    {userAgent.os} {userAgent.osVersion}
                  </span>
                  <span className="text-neutral-400 dark:text-neutral-200">
                    <MyIcon
                      icon={
                        userAgent.deviceType === "mobile"
                          ? "FiSmartphone"
                          : "FiMonitor"
                      }
                      size={20}
                    />
                  </span>
                </div>
              </p>
              <p className="flex flex-col">
                <span className="secondary-text">{t("browser")}</span>
                <span className="text-h6">
                  {userAgent.browser} {userAgent.version}
                </span>
              </p>
            </div>
            <div className="grid gap-my-16 xl:grid-cols-2">
              <div className="flex flex-col">
                <span className="secondary-text">{t("answered_at")}</span>
                <p className="text-h6 flex gap-xs">
                  <span>{formattedDate ? String(formattedDate) : "N/A"}</span>
                  <span>{formattedTime ? String(formattedTime) : "N/A"}</span>
                </p>
              </div>
              <div className="flex flex-col">
                <span className="secondary-text">
                  {t("satisfaction_index")}
                </span>
                <p className="flex gap-my-16">
                  <span className="text-h6">{data.satisfactionIndex}</span>
                  <EmojiIndex index={emotion} size={24} />
                  {blob && (
                    <audio
                      controls
                      className="h-my-24 w-my-192"
                      controlsList="nodownload noplaybackrate nofullscreen"
                    >
                      <source src={blob} type="audio/ogg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <CenteredMessage message={t("no_data")} />
        )}
      </div>

      {location && (
        <div className="relative mx-auto h-80 w-full">
          <MapComponent
            data={[
              {
                altitude: 0,
                latitude: location.latitude,
                longitude: location.longitude,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default AnsweredSurveyData;
