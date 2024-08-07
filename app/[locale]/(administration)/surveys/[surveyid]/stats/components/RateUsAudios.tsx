import MyAudio from "@/app/components/MyAudio";
import IcoMessage from "@/app/components/generic/IcoMessage";
import { myQuery } from "@/helpers/Fetch";
import { Divider, ScrollArea, Skeleton, Spoiler } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Fragment, useContext } from "react";
import SurveyContext from "../../context/SurveyContext";
import SummarySectionContainer from "./summary/SummarySectionContainer";

const RateUsAudios = () => {
  const t = useTranslations("Surveys");
  const {
    survey: { id },
  } = useContext(SurveyContext);

  const { data, isLoading } = useQuery({
    queryKey: ["/statistics/record_satisfaction_by_survey", id ?? 0],
    queryFn: myQuery<{
      message: string;
      data: { answered_survey_id: number; audio_url: string }[];
    }>(),
  });

  const { data: dataTranscription, isLoading: isLoadingTranscriptions } =
    useQuery({
      queryKey: [
        "/statistics/record_satisfaction_transcription_by_survey",
        id ?? 0,
      ],
      queryFn: myQuery<{
        message: string;
        data: {
          id: number;
          text: string;
          with_emotion: boolean;
          record_satisfaction: {
            answered_survey_id: number;
          };
        }[];
      }>(),
    });

  return (
    <SummarySectionContainer title={t("satisfaction_audios")}>
      {isLoading ? (
        <SkeletonAudios />
      ) : !data?.data || data?.data.length === 0 ? (
        <IcoMessage
          ico="ico-file-tray-outline"
          message={t("this_survey_wasnt_rated_with_audio")}
          className="text-center"
        />
      ) : (
        <ScrollArea>
          <div className="px-my-8">
            {data?.data.map((el, i) => (
              <Fragment key={el.answered_survey_id}>
                <div className="flex flex-col">
                  <MyAudio src={el.audio_url} />
                  {!!dataTranscription?.data.find(
                    (el0) =>
                      el0.record_satisfaction.answered_survey_id ===
                      el.answered_survey_id,
                  )?.text ? (
                    <Spoiler
                      maxHeight={65}
                      showLabel={t("show_more")}
                      hideLabel={t("hide")}
                    >
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">
                          {t("transcription")}
                        </p>
                        <p>
                          {dataTranscription?.data.find(
                            (el0) =>
                              el0.record_satisfaction.answered_survey_id ===
                              el.answered_survey_id,
                          )?.text ?? t("no_transcription")}
                        </p>
                      </div>
                    </Spoiler>
                  ) : null}
                </div>
                {i < data.data.length - 1 ? (
                  <Divider my={"xs"} />
                ) : (
                  <div className="h-my-8" />
                )}
              </Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </SummarySectionContainer>
  );
};

export default RateUsAudios;

const SkeletonAudios = () => {
  return (
    <div className="px-my-8">
      <Skeleton height={44} />
      <Divider my={10} />
      <Skeleton height={44} />
      <Divider my={10} />
      <Skeleton height={44} />
      <Divider my={10} />
      <Skeleton height={44} />
    </div>
  );
};
