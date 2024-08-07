import { motion } from "framer-motion";

interface Props {
  step: number;
  totalSteps: number;
}

const MyStepper = ({ step, totalSteps }: Props) => {
  return (
    <div className="flex justify-between relative h-my-32">
      <div
        className={`absolute bg-neutral-300 h-my-8 top-my-12 rounded-full w-full`}
      />
      <motion.div
        layout
        className={`z-[1] absolute bg-primary-500 h-my-8 top-my-12 rounded-full`}
        style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
      />
      {Array.from(Array(totalSteps).keys()).map((i) => (
        <div
          key={i}
          className={`z-[2] w-my-32 h-my-32 flex items-center justify-center text-white rounded-full ${
            i + 1 <= step ? "bg-primary-500" : "bg-neutral-300"
          }`}
        >
          <span> {i + 1}</span>
        </div>
      ))}
    </div>
  );
};

export default MyStepper;
