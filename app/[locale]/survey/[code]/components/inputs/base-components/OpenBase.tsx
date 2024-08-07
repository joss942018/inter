import MyIcon from "@/app/components/MyIcon";
import { TypeOpenQuestion } from "@/types/TypesDB";
import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";
import AudioBase from "./AudioBase";
import TextBase from "./TextBase";
import { IUseRecorder } from "../../../hooks/useRecorder";

interface IProps {
  option?: 0 | 1 | 2;
  setOption?: React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
  type?: TypeOpenQuestion;
  onChange?: (value: string, file?: File) => void;
  value?: string;
  recorderProps?: IUseRecorder;
  loadingUpload?: boolean;
  src?: string;
}

const OpenBase = ({
  option = 0,
  setOption,
  type,
  value,
  onChange,
  recorderProps,
  loadingUpload,
  src,
}: IProps) => {
  const t = useTranslations("SRSurvey");

  const handleRecord = () => {
    setOption && setOption(1);
  };

  const handleText = () => {
    if (setOption) setOption(2);
  };

  const handleCancel = () => {
    if (onChange) onChange("");
    if (setOption) setOption(0);
  };
  console.log("recorderProps", recorderProps);


  return (
    <div className="flex flex-col gap-5">
      {(type === "audio_text" || type === "audio") &&
        (option === 0 || option === 1) && (
          <AudioBase
            onButtonClick={handleRecord}
            option={option}
            recorderProps={recorderProps}
            loading={loadingUpload}
            src={src}
          />
        )}
      {type === "audio_text" &&
        (option === 0 ? (
          <button
            className={`animar-hover relative flex h-14 w-[202px] items-center gap-7 rounded-my-8 border border-primary-800 px-6 text-left text-primary-900 hover:bg-primary-900 hover:text-white dark:bg-primary-700 dark:hover:bg-primary-800`}
            onClick={handleText}
          >
            <MyIcon icon="FiType" size={32} />
            {t("input_text")}
          </button>
        ) : option === 2 ? (
          <TextBase value={value} onChange={onChange} />
        ) : null)}
      {type === "text" && <TextBase value={value} onChange={onChange} />}
      {option !== 0 && (
        <Button
          onClick={handleCancel}
          className="max-w-40"
          variant="light"
          color="red"
        >
          {t("cancel")}
        </Button>
      )}
    </div>
  );
};

export default OpenBase;
