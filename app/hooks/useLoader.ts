"use client";

import { useCallback, useRef, useState } from "react";

interface Props {
  messages?: string[];
  cantLoaders: number;
}

const useLoader = ({ messages, cantLoaders }: Props) => {
  const currentLoader = useRef<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const increaseLoader = useCallback(() => {
    if (currentLoader.current >= cantLoaders) return;
    currentLoader.current++;
    setPercentage(Math.round((currentLoader.current / cantLoaders) * 100));
    if (messages)
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, [messages, cantLoaders]);

  return [percentage, message, increaseLoader] as const;
};
export default useLoader;
