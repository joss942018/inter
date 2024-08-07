import { ActionIcon, Slider } from "@mantine/core";
import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import MyIcon from "./MyIcon";
import { convertTimeToSeconds, formatTimeDuration } from "../[locale]/survey/[code]/hooks/useRecorder";

interface Props {
  src?: string;
  hiddenControls?: ("volume" | "elapsed" | "duration")[];
  whiteControls?: boolean;
  externalDuration?: string;
}

const MyAudio = ({ src, hiddenControls, whiteControls = false, externalDuration }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const player = useRef<ReactPlayer>(null);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (externalDuration) {
      const newDuration = convertTimeToSeconds(externalDuration);
      if (newDuration !== duration) {
        setDuration(newDuration);
      }
    }
  }, [externalDuration]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    setCurrentTime(e.playedSeconds);
  };

  const handleSeekChange = (value: number) => {
    setCurrentTime((value / 100) * duration);
    player.current?.seekTo(value / 100);
  };

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  const handleSeekMouseUp = () => {
    setIsSeeking(false);
  };

  const handleDurationChange = (duration: number) => {
    if (!externalDuration) {
      setDuration(duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
      <div className="w-full rounded-my-4">
        <ReactPlayer
            ref={player}
            url={src}
            playing={isPlaying && !isSeeking}
            volume={volume}
            muted={isMuted}
            onDuration={handleDurationChange}
            height={0}
            width={0}
            onProgress={handleProgressChange}
            controls
            onEnded={handleEnded}
        />
        <div className="grid grid-cols-[max-content_max-content_1fr_max-content_max-content] items-center">
          <ActionIcon
              variant="subtle"
              color={whiteControls ? "white" : "black"}
              size="xl"
              onClick={togglePlayPause}
          >
            <MyIcon icon={isPlaying ? "FiPause" : "FiPlay"} />
          </ActionIcon>
          {hiddenControls?.includes("elapsed") ? (
              <span />
          ) : (
              <span className="w-my-48 text-center text-[12px]">
            {formatTimeDuration(currentTime)}
          </span>
          )}
          <Slider
              value={progress}
              label={null}
              onChange={handleSeekChange}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
              thumbSize={20}
              color={whiteControls ? "red" : "primary"}
          />
          {hiddenControls?.includes("duration") ? (
              <span />
          ) : (
              <span className="w-my-48 text-center text-[12px]">
            {formatTimeDuration(duration)}
          </span>
          )}
          {hiddenControls?.includes("volume") ? (
              <span />
          ) : (
              <ActionIcon
                  onClick={toggleMute}
                  variant="subtle"
                  size="xl"
                  color={whiteControls ? "white" : "black"}
              >
                <MyIcon icon={isMuted ? "FiVolumeX" : "FiVolume2"} />
              </ActionIcon>
          )}
        </div>
      </div>
  );
};

export default MyAudio;
