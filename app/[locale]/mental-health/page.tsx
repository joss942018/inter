"use client";

import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import Loader from "@/app/components/generic/Loader";
import Modal from "@/app/components/generic/Modal";
import StatusBadge from "@/app/components/generic/StatusBadge";
import ThemeSwitcher from "@/app/components/generic/ThemeSwitcher";
import ThemeContext from "@/app/context/ThemeContext";
import Animations from "@/app/styles/animations";
import getEnv from "@/helpers/Env";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

interface IMessage {
  from: "client" | "server";
  message: string;
  user_ip?: string | null;
}
const readyState = 1;
const initialMessages: IMessage[] = [
  {
    from: "server",
    message:
      "🌟 ¡Hola, soy EliaVeris! Bienvenido a tu espacio de bienestar emocional. Como tu asesor virtual de salud mental, estoy aquí para escucharte, asesorarte y acompañarte en cada situación que nos necesites. Queremos verte saludable y feliz. 🌿✨",
    user_ip: null,
  },
];

const Page = () => {
  const [userInput, setUserInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);
  const [finished, setFinished] = useState(false);
  const userIp = useRef<string | null>(null);
  const { theme } = useContext(ThemeContext);

  const getIpAddress = useCallback(
    () =>
      fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => (userIp.current = data.ip))
        .catch((err) => console.error(err)),
    []
  );

  useEffect(() => {
    getIpAddress();
  }, [getIpAddress]);

  const sendMessage = async (message?: string) => {
    if (userInput.trim() !== "" || message) {
      const message0 = { message: message ?? userInput };
      setMessages((prev) => [
        ...prev,
        { ...message0, from: "client", user_ip: userIp.current },
      ]);
      setUserInput("");
      setLoading(true);
      axios
        .post(
          `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/chatbot/chat_bot_api`,
          {
            user_message: message ?? userInput,
            user_ip: userIp.current,
          }
        )
        .then((res) => {
          if (res.data.conversation_history.length > 0) {
            const message = {
              message: res.data.conversation_history[0].bot_reply,
            };
            setMessages((prev) => [...prev, { ...message, from: "server" }]);
            setUserInput("");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // const handleClickStart = (message: string) => {
  //   setIsMounted(true);
  //   sendMessage(message);
  // };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-[100dvw] h-[100dvh] md:p-my-24 flex justify-center">
      <div className="max-w-3xl bg-white dark:bg-neutral-800 p-my-24 md:card w-full border decorative-border">
        <div className="flex gap-my-16 items-center pb-my-24 border-b decorative-border">
          <Image
            src="/img/letraElia.svg"
            width={60}
            height={60}
            alt="Logo Elia"
          />
          <h1 className="text-h6 sm:text-h4">Tu Asesor de Salud Mental</h1>
          <div className="flex flex-col gap-my-8 items-center">
            <StatusBadge status={-1} text="ALPHA" />
            <ThemeSwitcher />
          </div>
          <MyButton
            hierarchy={2}
            squared
            className="ml-auto"
            onClick={() => setFinished(true)}
          >
            <MyIcon icon="FiX" />
          </MyButton>
        </div>
        <div className="flex flex-col h-[calc(100%_-_88px)]">
          <div className="flex flex-col gap-my-24 overflow-x-hidden overflow-y-auto flex-1 my-scrollbar pt-my-24">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  layout
                  {...Animations.card}
                  transition={{ duration: 0.3 }}
                  className={`bubble !min-h-max !max-w-sm
                  ${
                    message.from === "client"
                      ? "right bg-primary-200 dark:bg-primary-800"
                      : "left bg-neutral-100 dark:bg-neutral-900"
                  }`}
                >
                  <span>{message.message}</span>
                </motion.div>
              ))}
              {/* {!isMounted && (
                <motion.div
                  {...Animations.card}
                  className="flex flex-col w-max self-end gap-my-12 items-end"
                >
                  {[
                    {
                      id: 1,
                      message: "Quiero conversar con alguien",
                    },
                    // {
                    //   id: 2,
                    //   message: "Agendar una cita psicológica",
                    // },
                    {
                      id: 3,
                      message: "Otro",
                    },
                  ].map((el) => (
                    <p
                      key={el.id}
                      className="border-2 border-primary-600 text-primary-600 py-my-8 px-my-16 rounded-my-24 w-max hover:bg-primary-600 hover:text-white cursor-pointer"
                      onClick={() => handleClickStart(el.message)}
                    >
                      {el.message}
                    </p>
                  ))}
                </motion.div>
              )} */}
            </AnimatePresence>
            <div ref={endRef} />
          </div>
          <div className="input !p-0 flex items-center rounded-[5px] non-decorative-border box-content">
            <input
              className="flex-1 px-my-12 outline-none w-full h-full rounded-my-8 bg-transparent"
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={userInput}
            />
            <MyButton
              hierarchy={3}
              squared
              disabled={loading || readyState !== 1 || userInput.trim() === ""}
              className={`${
                loading || readyState !== 1 || userInput.trim() === ""
                  ? "!bg-transparent"
                  : ""
              }`}
              onClick={() => sendMessage()}
            >
              {loading || readyState !== 1 ? (
                <div className="text-black dark:text-white">
                  <Loader size={24} />
                </div>
              ) : (
                <MyIcon icon="FiSend" />
              )}
            </MyButton>
          </div>
        </div>
      </div>
      <Modal active={finished}>
        <div className="flex flex-col items-center gap-my-24 pb-my-24 px-my-24">
          <Image
            src={`/img/${
              theme === "dark" ? "logoEliaDark" : "logoEliaLight"
            }.svg`}
            width={100}
            height={100}
            alt="Logo Elia"
          />
          <h6 className="text-h6">Elia se preocupa por tu salud mental</h6>
          <MyButton
            onClick={() => {
              setFinished(false);
              setMessages(initialMessages);
            }}
          >
            Reiniciar chat
          </MyButton>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
