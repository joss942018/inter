import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import Loader from "@/app/components/generic/Loader";
import { useContext, useEffect, useRef, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import SurveyFlowContext from "../../context/SurveyFlowContext";

interface IMessage {
  from: "client" | "server";
  message: string;
}

const DiscoverChat = () => {
  const {
    questions: { currentQuestion },
  } = useContext(SurveyFlowContext);

  const [userInput, setUserInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    "wss://elia-v1.onrender.com/ws/context/lobby/"
  );

  useEffect(() => {
    if (readyState !== 1) return;
    sendJsonMessage({
      questionId: 15,
      answeredSurveyId: 23,
    });
  }, [readyState]);

  const sendMessage = () => {
    if (loading || readyState !== 1) return;
    if (userInput.trim() !== "") {
      const message = { message: userInput };
      setMessages((prev) => [...prev, { ...message, from: "client" }]);
      sendJsonMessage(message);
      setUserInput("");
      setLoading(true);
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

  useEffect(() => {
    console.log(lastMessage);
    if (lastMessage && lastMessage.data) {
      try {
        const parsedLastMessage = JSON.parse(lastMessage.data);
        setMessages((prev) => [
          ...prev,
          { ...parsedLastMessage, from: "server" },
        ]);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-[320px] h-[260px]">
      <div className="flex flex-col gap-my-24 overflow-x-hidden overflow-y-auto flex-1 my-scrollbar pt-my-24">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`bubble !min-h-max
            ${
              message.from === "client"
                ? "right bg-primary-300 dark:bg-primary-800"
                : "left bg-neutral-100 dark:bg-neutral-800"
            }`}
          >
            <span>{message.message}</span>
          </div>
        ))}
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
        >
          {loading || readyState !== 1 ? <Loader /> : <MyIcon icon="FiSend" />}
        </MyButton>
      </div>
    </div>
  );
};

export default DiscoverChat;
