"use client";

import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import Loader from "@/app/components/generic/Loader";
import useSoundEffect from "@/app/hooks/useSoundEffect";
import Animations from "@/app/styles/animations";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useRef, useState } from "react";
import SurveyFlowContext from "../context/SurveyFlowContext";
import AudioBase from "./inputs/base-components/AudioBase";
import SmileBase from "./inputs/base-components/SmileBase";
import useRecorder from "@/app/[locale]/survey/[code]/hooks/useRecorder";
import useUploadAudioFeedBack from "@/app/hooks/useUploadAudioFeedBack";

interface Props {
  cerrar: () => void;
  loadingUpload?: boolean;
  src?: string;
}

const RateUs = ({ cerrar, loadingUpload, src }: Props) => {
  const t = useTranslations("SRSurvey");
  const [idRate, setIdRate] = useState<number | null>(null); // Inicializar como null
  const { playSoundEffect } = useSoundEffect();
  const {
    answers: { uploadRateUs, answerCurrentQuestion },
  } = useContext(SurveyFlowContext);

  const answer: number = answerCurrentQuestion?.answer_id ?? 0;
  const [loading1, setLoading1] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string>("nodata");
  const [showAudio, setShowAudio] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState<1 | 2 | 3 | 4 | 5 | null>(null);

  const { uploadAudio, isPendingUploadAudio } = useUploadAudioFeedBack(idRate ?? 0);

  const onFinishedRecording = (mediaBlobUrl: string) => {
    setBlobUrl(mediaBlobUrl);
  };

  const recorderProps = useRecorder({ onFinishedRecording });

  const sendRate = async (rate: number) => {
    try {
      let rating = rate;
      const id: number = await uploadRateUs({ rating, answer }); // Espera la respuesta y asigna el id
      setIdRate(id); // Usa el id retornado para actualizar el estado

      setShowCheck(true);
      setShowAudio(true);
    } catch (error) {
      console.error("Error uploading rate:", error);
    }
  };

  useEffect(() => {
    if (showCheck) {
      const timer = setTimeout(() => {
        setShowCheck(false);
      }, 1250);
      return () => clearTimeout(timer);
    }
  }, [showCheck]);

  const sendSatisfactionAudio = async () => {
    if (!blobUrl || idRate === null) return;
    setLoading1(true);
    await uploadAudio(blobUrl);
    setLoading1(false);
    cerrar();
  };

  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [option, setOption] = useState<0 | 1>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const handleRecord = () => {
    setOption(1);
  };

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (selectedEmojiIndex !== null) {
      timeoutRef.current = setTimeout(() => {
        sendRate(selectedEmojiIndex);
      }, 1250);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selectedEmojiIndex]);

  return (
      <div className={`flex h-[300px] w-[320px] flex-col items-center justify-center gap-3 rounded-xl`}>
        <AnimatePresence>
          {showCheck ? (
              <>
                <motion.div
                    key={"check"}
                    {...Animations.card}
                    className="text-green-600 dark:text-green-400"
                >
                  <MyIcon icon="FiCheckCircle" size={96} />
                </motion.div>
                <p className="secondary-text">{t("RateUs.rate_saved")}</p>
              </>
          ) : (
              <>
                {showAudio ? (
                    <div className="flex flex-col items-center justify-center gap-my-12">
                      <div className="flex w-full flex-col pt-my-12 text-center">
                        <p className="secondary-text">
                          {!selectedEmojiIndex
                              ? ""
                              : selectedEmojiIndex < 3
                                  ? `${t("RateUs.textRateLessThenThree")}`
                                  : selectedEmojiIndex === 4
                                      ? t("RateUs.textRateThreeToFour")
                                      : t("RateUs.textRateMoreThenFour")}
                        </p>
                      </div>
                      <motion.div key={"audio"} {...Animations.card} className="flex flex-col items-center justify-center gap-my-12">
                        <AudioBase
                            onButtonClick={handleRecord}
                            option={option}
                            recorderProps={recorderProps}
                            loading={isPendingUploadAudio}
                            src={recorderProps.mediaBlobUrl || "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3"}
                        />
                      </motion.div>

                      <div className="mt-my-8 flex flex-col items-center gap-1">
                        <MyButton onClick={sendSatisfactionAudio} hierarchy={3} size="small" disabled={!blobUrl}>
                          {loading1 ? <Loader /> : <MyIcon icon="FiSend" />}
                          {t("send")}
                        </MyButton>
                      </div>
                    </div>
                ) : (
                    <>
                      <p className={`secondary-text ${selectedEmojiIndex !== null ? "translate-y-1 duration-300" : ""}`}>
                        {t("RateUs.how_would_you_rate_question")}
                      </p>
                      <SmileBase onChange={(value) => setSelectedEmojiIndex(value)} value={selectedEmojiIndex} centered />
                    </>
                )}
              </>
          )}
        </AnimatePresence>
      </div>
  );
};

export default RateUs;
