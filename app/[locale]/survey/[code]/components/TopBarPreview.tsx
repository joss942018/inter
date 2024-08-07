import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import MyTooltip from "@/app/components/MyTooltip";
import ProgressBar from "@/app/components/generic/ProgressBar";
import ThemeSwitcher from "@/app/components/generic/ThemeSwitcher";
import { useTranslations } from "next-intl";
import LogoPrototype from "./LogoPrototype";

interface IProps {
  progress: number;
  step: number;
  handleRestartSurvey?: () => void;
  preview: boolean;
  speakerOn: boolean;
  setSpeakerOn?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopBarPreview = ({
  handleRestartSurvey,
  progress,
  step,
  setSpeakerOn,
  preview,
  speakerOn,
}: IProps) => {
  const t = useTranslations("SRSurvey");

  return (
    <div
      className={
        "flex flex-col text-center w-full h-full gap-my-12 items-center"
      }
    >
      <ProgressBar progress={progress} /> {/* 12px */}
      <div className="grid grid-cols-[1fr_2fr_1fr] w-full items-center px-my-12 h-my-32">
        {step === 1 && (
          <MyButton
            hierarchy={4}
            size="small"
            className="col-span-1"
            onClick={handleRestartSurvey}
          >
            <MyIcon icon="FiX" size={24} />
          </MyButton>
        )}
        {preview && (
          <p className="font-medium text-sm text-blue-700 dark:text-blue-300 whitespace-nowrap animate-pulse">
            {t("preview")}
          </p>
        )}
        <div className="col-start-3 col-end-4 justify-self-end flex items-center gap-my-16">
          <MyTooltip
            text={t(speakerOn ? "mute_questions" : "listen_questions")}
          >
            <MyButton
              hierarchy={4}
              size="small"
              onClick={() =>
                setSpeakerOn ? setSpeakerOn(!speakerOn) : () => {}
              }
            >
              <MyIcon icon={speakerOn ? "FiVolume2" : "FiVolumeX"} size={32} />
            </MyButton>
          </MyTooltip>
          <ThemeSwitcher />
        </div>
      </div>
      {step > 0 && <LogoPrototype fontSize={24} />}
    </div>
  );
};
