"use client";

import { useState } from "react";
import useWebSocket from "react-use-websocket";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    "wss://elia-v1.onrender.com/ws/context/lobby/"
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (userInput.trim() !== "") {
      const message = { message: userInput };
      sendJsonMessage(message);
      setUserInput("");
    }
  };

  // Intenta parsear lastMessage solo si no es undefined
  let parsedLastMessage = null;
  if (lastMessage && lastMessage.data) {
    try {
      parsedLastMessage = JSON.parse(lastMessage.data);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Write your Prompt here!</label>
        <input
          type="text"
          name="prompt"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      <div>
        <p>Sent: {userInput}</p>
        <p>
          Received:{" "}
          {parsedLastMessage ? parsedLastMessage.message : "No messages yet"}
        </p>
        <p>WebSocket Ready State: {readyState}</p>
      </div>
    </>
  );
};

export default App;
