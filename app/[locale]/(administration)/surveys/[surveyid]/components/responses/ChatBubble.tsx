interface Props {
  text: string;
  highlight: string[];
}

const ChatBubble = ({ text, highlight }: Props) => {
  const pattern = new RegExp("\\b(" + highlight.join("|") + ")\\b");
  const parts = text.split(new RegExp(pattern, "gi"));

  return (
    <div className="text-sm w-max max-w-full">
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            className={`${
              highlight.find(
                (text) => text.toLowerCase() === part.toLowerCase()
              )
                ? "text-black dark:text-white font-medium"
                : ""
            }`}
          >
            {part}
          </span>
        ))}
      </span>
    </div>
  );
};

export default ChatBubble;
