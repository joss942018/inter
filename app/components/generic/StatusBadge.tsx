interface Props {
  status: 1 | 0 | -1;
  text: string;
  className?: string;
}

const StatusBadge = ({ status, text, className = "" }: Props) => {
  return (
    <div
      className={`w-max rounded-full border-2 px-my-8
      ${className}
              ${
                status === 1
                  ? "border-green-600 bg-green-100 dark:bg-green-950"
                  : status === 0
                    ? "border-neutral-600 bg-neutral-100 dark:border-neutral-300 dark:bg-neutral-950"
                    : "border-red-500 bg-red-100 dark:bg-red-950"
              }`}
    >
      <p
        className={`text-xsmall font-bold uppercase tracking-wide
                ${
                  status === 1
                    ? "text-green-600"
                    : status === 0
                      ? "text-neutral-600 dark:text-neutral-300"
                      : "text-red-500"
                }`}
      >
        {text}
      </p>
    </div>
  );
};

export default StatusBadge;
