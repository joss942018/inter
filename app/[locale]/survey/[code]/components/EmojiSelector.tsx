import Image from "next/image";
import { motion } from "framer-motion";

const emojis: { value: 1 | 2 | 3 | 4 | 5; emoji: string }[] = [
  { value: 1, emoji: "/ico/emoji-angry.svg" },
  { value: 2, emoji: "/ico/emoji-frown.svg" },
  { value: 3, emoji: "/ico/emoji-meh.svg" },
  { value: 4, emoji: "/ico/emoji-smile-beam.svg" },
  { value: 5, emoji: "/ico/emoji-grin-beam.svg" },
];

interface Props {
  value: 1 | 2 | 3 | 4 | 5 | null;
  setValue: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4 | 5 | null>>;
}

const EmojiSelector = ({ value, setValue }: Props) => {
  return (
    <div className="flex gap-my-24 items-center justify-items-center h-my-48">
      {emojis.map((el) => (
        <motion.div
          key={el.value}
          layout
          animate={{
            width: value === el.value ? 48 : 32,
            height: value === el.value ? 48 : 32,
          }}
          className="animar-hover rounded-full"
          onClick={() => setValue(el.value)}
        >
          <Image
            alt="emoji"
            src={el.emoji}
            className={`m-auto
            ${
              value === el.value || value === null
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
            width={value === el.value ? 48 : 32}
            height={value === el.value ? 48 : 32}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default EmojiSelector;
