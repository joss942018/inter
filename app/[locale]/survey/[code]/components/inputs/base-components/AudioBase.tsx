import MyAudio from "@/app/components/MyAudio";
import MyIcon from "@/app/components/MyIcon";
import MyTooltip from "@/app/components/MyTooltip";
import { Loader } from "@mantine/core";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Wave from "react-wavify";
import { IUseRecorder } from "../../../hooks/useRecorder";

interface IProps {
  disabled?: boolean;
  src?: string;
  option?: 0 | 1;
  hideLabel?: boolean;
  errorMessage?: string | null;
  onButtonClick?: () => void;
  recorderProps?: IUseRecorder;
  loading?: boolean;
}

const AudioBase = ({
  disabled = true,
  src,
  option = 0,
  hideLabel = false,
  errorMessage,
  recorderProps,
  onButtonClick,
  loading,
}: IProps) => {
  const t = useTranslations("SRSurvey");
  return (
    <motion.div
      layout
      animate={{ width: option === 0 ? "202px" : "304px" }}
      onClick={
        !recorderProps?.isRecording && option === 0
          ? () => {
              recorderProps?.toggleRecord();
              onButtonClick && onButtonClick();
            }
          : () => {}
      }
      className={`relative flex h-[82px] rounded-my-8 bg-primary-800 px-[9px] text-white transition-transform dark:bg-primary-700
      ${
        option === 0
          ? "cursor-pointer hover:scale-105 hover:bg-primary-900 active:scale-100 dark:hover:bg-primary-800"
          : ""
      }`}
    >
      <div className={`z-[1] flex flex-row items-center gap-my-12`}>
        {(option === 0 || option === 1) &&
          (option === 1 && errorMessage ? (
            <div className="grid h-[82px] grid-cols-[24px_174px] items-center gap-my-12 overflow-hidden p-my-8">
              <MyIcon icon="FiAlertTriangle" size={24} />
              <p>{errorMessage}</p>
            </div>
          ) : loading ? (
            <div
              className={`relative flex h-my-64 w-my-64 items-center justify-center overflow-hidden rounded-full bg-white`}
            >
              <Loader />
            </div>
          ) : (
            <>
              <MyTooltip
                text={t(recorderProps?.isRecording ? "stop" : "record")}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    recorderProps?.toggleRecord();
                    onButtonClick && onButtonClick();
                  }}
                  className={`relative flex h-my-64 w-my-64 items-center justify-center overflow-hidden rounded-full
                      ${disabled ? "cursor-default" : ""}
                      ${option !== 0 ? "bg-primary-400 hover:bg-primary-500" : ""}
                      `}
                >
                  <div
                    className={`absolute left-1/2 top-1/2 h-my-32 w-my-32 -translate-x-1/2 -translate-y-1/2
                        ${recorderProps?.isRecording ? "bg-red-600" : "bg-transparent"}`}
                  />
                  <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                      recorderProps?.isRecording
                        ? "text-transparent"
                        : "text-white"
                    }`}
                  >
                    <MyIcon icon="FiMic" size={32} />
                  </div>
                </button>
              </MyTooltip>

              {option === 1 && (
                <div className="w-[200px]">
                  {recorderProps?.isRecording && (
                    <p className="flex justify-center gap-my-8">
                      <span className="text-small">{t("recording")}...</span>
                      <span>{recorderProps?.duration}</span>
                    </p>
                  )}
                  {src && !recorderProps?.isRecording && (
                    <MyAudio
                      hiddenControls={["elapsed", "volume"]}
                      src={String(src ?? "")}
                      whiteControls
                      externalDuration={recorderProps?.duration}
                    />
                  )}
                </div>
              )}
            </>
          ))}

        {/* {option !== 0 && (
          <MyTooltip text={t("cancel")}>
            <motion.button
              layout
              className="flex h-my-48 w-my-48 items-center justify-center rounded-full hover:bg-primary-500"
              onClick={(e) => {
                e.stopPropagation();
                if (setOption) setOption(0);
                if (saveAnswer) saveAnswer(undefined);
                if (deleteAudioClose) {
                  deleteAudioClose();
                }
                if (isRecording && handleRecord) {
                  handleRecord();
                }
              }}
            >
              <MyIcon icon="FiX" size={24} />
            </motion.button>
          </MyTooltip>
        )} */}

        {option === 0 && !hideLabel && <p>{t("record_audio")}</p>}
      </div>
      {option === 1 && recorderProps?.isRecording && (
        <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden rounded-lg">
          <Wave
            fill="#3e00b3"
            stroke="solid"
            paused={false}
            style={{ display: "flex" }}
            options={{
              height: 55,
              amplitude: 5,
              speed: 1,
              points: 6,
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default AudioBase;
