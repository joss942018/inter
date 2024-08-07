"use client";

import getEnv from "@/helpers/Env";
import TypesLanguages from "@/types/TypesLanguages";
import axios from "axios";
import { useCallback, useEffect, useState, useRef } from "react";
//@ts-ignore
import { CPromise } from "c-promise2";

// all in seconds
const speakTimes = {
  en: {
    timePerLetter: 0.0525,
    timePerDot: 1,
    timePerComma: 0.22,
  },
  es: {
    timePerLetter: 0.058,
    timePerDot: 1,
    timePerComma: 0.22,
  },
};

interface Props {
  onSpeakFinished?: () => void;
  onSpeakStarted?: () => void;
  language: TypesLanguages;
}

const useTTS = (props?: Props) => {
  const [message, setMessage] = useState("");
  const [liveText, setLiveText] = useState("");
  const language0 = useRef<TypesLanguages>("en");
  const [speaking, setSpeaking] = useState(false);
  const synth = useRef<SpeechSynthesis | null>(null);
  const voice = useRef<SpeechSynthesisVoice | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);

  // text animations
  const esperar = (s: number) => {
    return new Promise((resolve) => setTimeout(resolve, s * 1000));
  };

  // const animatingText = useRef(false);
  // const exitLoop = useRef(false);

  const prom = useRef<any>(null);

  const animateText = useCallback(async (message: string) => {
    prom.current?.cancel();
    setLiveText("");
    await esperar(0.6);
    const textArray = message.split(" ");
    const sayHello = CPromise.promisify(function* () {
      for (const word of textArray) {
        setLiveText((prev) => prev + word + " ");
        yield CPromise.delay(
          1000 *
            (speakTimes[language0.current].timePerLetter * word.length +
              speakTimes[language0.current].timePerDot *
                (word.includes(".") ? 1 : 0) +
              speakTimes[language0.current].timePerComma *
                (word.includes(",") ? 1 : 0))
        );
      }
    });

    prom.current = sayHello();
  }, []);
  // end of text animations

  const updateVoices = useCallback(() => {
    if (!synth.current) return;
    const voices = synth.current.getVoices();
    for (const voice0 of voices) {
      if (
        voice0.name ===
          (language0.current === "en"
            ? "Microsoft Aria Online (Natural) - English (United States)"
            : "Microsoft Dalia Online (Natural) - Spanish (Mexico)") ||
        voice0.name ===
          (language0.current === "en"
            ? "Google US English"
            : "Google español de Estados Unidos") ||
        voice0.name === (language0.current === "en" ? "Samantha" : "Paulina")
      ) {
        voice.current = voice0;
        return;
      }
    }
  }, []);

  useEffect(() => {
    audioElement.current = new Audio();
    synth.current = window.speechSynthesis;
  }, []);

  const handleSpeakFinished = useCallback(() => {
    setSpeaking(false);
    if (props?.onSpeakFinished) props.onSpeakFinished();
  }, [props]);

  const stopSpeaking = useCallback(() => {
    if (synth.current?.speaking) synth.current.cancel();
    handleSpeakFinished();
  }, [handleSpeakFinished]);

  const eraseEmojis = (text: string) => {
    const emojiRegex = /[\p{Extended_Pictographic}]/gu;
    return text.replace(emojiRegex, "");
  };

  const getAudioFromServer = useCallback(
    async (text: string, lng: string): Promise<boolean> => {
      if (!audioElement.current) return false;
      try {
        const res = await axios.post(
          `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/streaming/generate_voice/`,
          {
            text: eraseEmojis(text),
            language: lng === "es" ? "es-US" : "en-US",
          },
          {
            responseType: "blob",
          }
        );
        if (res.status === 200) {
          const audioUrl = URL.createObjectURL(res.data);
          audioElement.current.src = audioUrl;
          audioElement.current.onended = () => {
            handleSpeakFinished();
          };
          setSpeaking(true);
          audioElement.current.play();
          props?.onSpeakStarted && props.onSpeakStarted();
          animateText(text);
          return true;
        } else {
          console.error("Error en la solicitud:", res);
          return false;
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        return false;
      }
    },
    [handleSpeakFinished]
  );

  const speak = useCallback(
    async (message: string) => {
      setMessage(message);
      // REPRODUCCIÓN DESDE EL SERVIDOR
      const audioResponse = await getAudioFromServer(
        message,
        language0.current
      );
      if (audioResponse) return;

      // REPRODUCCIÓN NATIVA
      // reproducción de audio
      if (synth.current === null) return;

      const play = () => {
        if (synth.current === null) return;
        if (synth.current.speaking) synth.current.cancel();
        const utterThis = new SpeechSynthesisUtterance(eraseEmojis(message));
        utterThis.lang = language0.current === "en" ? "en-US" : "es-MX";
        utterThis.rate = language0.current === "en" ? 1 : 1.1;
        utterThis.onend = () => {
          handleSpeakFinished();
        };

        updateVoices();
        utterThis.voice = voice.current;

        try {
          setSpeaking(true);
          synth.current.speak(utterThis);
          props?.onSpeakStarted && props.onSpeakStarted();
          animateText(message);
        } catch (error) {
          console.error(error);
        }
      };
      play();
    },
    [handleSpeakFinished, getAudioFromServer, updateVoices, animateText, props]
  );

  useEffect(() => {
    if (synth.current?.speaking) synth.current.cancel();
    return () => {
      if (synth.current?.speaking) synth.current.cancel();
    };
  }, []);

  const changeLanguageTTS = useCallback((language: TypesLanguages) => {
    language0.current = language;
  }, []);

  return {
    message,
    speak,
    stopSpeaking,
    // isSpeaking,
    changeLanguageTTS,
    speaking,
    liveText,
  };
};

export default useTTS;
