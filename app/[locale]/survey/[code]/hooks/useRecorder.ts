import useSoundEffect from "@/app/hooks/useSoundEffect";
import { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder-2";

interface IProps {
  onFinishedRecording?: (mediaBlobUrl: string) => void;
}

const useRecorder = ({
                       onFinishedRecording,
                     }: Partial<IProps> = {}): IUseRecorder => {
  const { playSoundEffect } = useSoundEffect();
  const [seconds, setSeconds] = useState(0);

  // audio recording features
  const { startRecording, stopRecording, mediaBlobUrl, status } =
      useReactMediaRecorder({ audio: true, video: false, screen: false });
  const isRecording = status === "recording";

  const [duration, setDuration] = useState("");

  useEffect(() => {
    setDuration(formatTimeDuration(seconds));
  }, [seconds]);

  useEffect(() => {
    if (mediaBlobUrl) {
      onFinishedRecording && onFinishedRecording(mediaBlobUrl);
      const audioElement = new Audio(mediaBlobUrl);

      audioElement.addEventListener("ended", function () {
        console.log("FINALIZADOOOOOOOOOOOO", mediaBlobUrl);
      });
    }
  }, [mediaBlobUrl]);

  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    interval.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return interval;
  };

  const stopTimer = () => {
    if (interval.current) clearInterval(interval.current);
  };

  const resetTimer = () => {
    setSeconds(0);
  };

  const toggleRecord = () => {
    if (isRecording) {
      stopRecording();
      stopTimer();
      playSoundEffect("recording-stop");
    } else {
      startRecording();
      startTimer();
      playSoundEffect("recording-start");
      resetTimer();
    }
  };
  return {
    toggleRecord,
    duration,
    isRecording,
    mediaBlobUrl,
  };
};

export default useRecorder;

export interface IUseRecorder {
  toggleRecord: () => void;
  duration: string;
  isRecording: boolean;
  mediaBlobUrl?: string;
}

export const formatTimeDuration = (duration?: number) => {
  if (!duration) return "0:00";
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~(duration % 60);

  let ret = "";
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
};

export const convertTimeToSeconds = (time: string): number => {
  // Split the string by the colon
  const parts = time.split(':');

  // Convert the parts to numbers
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);

  // Calculate the total seconds
  const totalSeconds = (minutes * 60) + seconds;

  return totalSeconds;
}
