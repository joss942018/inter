import React from "react";

interface Props {
  index: number | null;
  size?: 4 | 8 | 12 | 16 | 20 | 24 | 32 | 48 | 64 | 96 | 128 | 192 | 256;
}

const EmojiIndex = ({ index, size = 16 }: Props) => {
  return (
    <span
      style={{ width: size, height: size }}
      className={`${
        index === null
          ? "ico-emoji-question"
          : index < 0.5
          ? "ico-emoji-angry"
          : index < 1.5
          ? "ico-emoji-frown"
          : index < 2.5
          ? "ico-emoji-grin"
          : index < 3.5
          ? "ico-emoji-meh"
          : "ico-emoji-smile-beam"
      }`}
    />
  );
};

export default EmojiIndex;
