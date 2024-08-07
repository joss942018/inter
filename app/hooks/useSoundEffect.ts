import { useCallback } from "react";

type TypeSoundEffect = "recording-start" | "recording-stop";

const useSoundEffect = () => {
  const playSoundEffect = useCallback((type: TypeSoundEffect) => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play();
  }, []);

  return { playSoundEffect };
};

export default useSoundEffect;
