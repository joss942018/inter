import { motion } from "framer-motion";

interface Props {
  label?: string;
  value: number;
  hidePercentage?: boolean;
  customValue?: number;
}

const MyProgressBar = ({
  label,
  value,
  hidePercentage = false,
  customValue,
}: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-neutral-500 dark:text-neutral-300 text-small">
        {label && <p>{label}</p>}
        {!hidePercentage && (
          <p>{customValue ?? `${Math.round(value * 100)}%`}</p>
        )}
      </div>
      <div className="relative w-full h-my-8 bg-neutral-100 dark:bg-neutral-900 rounded-full">
        <motion.div
          layout
          className="absolute h-full bg-yellow-500 rounded-full"
          style={{ width: `${Math.round(value * 100)}%` }}
        />
      </div>
    </div>
  );
};

export default MyProgressBar;
