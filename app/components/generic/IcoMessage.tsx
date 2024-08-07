interface Props {
  ico: string;
  message: string;
  className?: string;
}

const IcoMessage = ({ ico, message, className = "" }: Props) => {
  return (
    <div
      className={`m-auto flex flex-col items-center gap-xs p-s
      ${className}
      `}
    >
      <div
        className={`${ico} w-xl h-xl darkColorFilter dark:lightest_dColorFilter`}
      />
      <p className="secondary-text">{message}</p>
    </div>
  );
};

export default IcoMessage;
