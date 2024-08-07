import MyIcon from "@/app/components/MyIcon";
import React from "react";

interface Props {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  onMouseTouchUp: () => void;
}

const EmojiSlider = ({ value, setValue, onMouseTouchUp }: Props) => {
  return (
    <div className="flex items-center gap-my-4 mb-my-4">
      <button onClick={() => setValue((v) => (v - 20 < 0 ? 0 : v - 20))}>
        <MyIcon icon="FiFrown" size={24} />
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
        className={`h-my-16 rounded-lg bg-neutral-300 decorative-border w-[80px] appearance-none cursor-pointer dark:bg-neutral-900 accent-primary-500`}
        onTouchEnd={onMouseTouchUp}
        onMouseUp={onMouseTouchUp}
      />
      <button onClick={() => setValue((v) => (v + 20 > 100 ? 100 : v + 20))}>
        <MyIcon icon="FiSmile" size={24} />
      </button>
    </div>
  );
};

export default EmojiSlider;
