interface Props {
  message: string;
}

function CenteredMessage({ message }: Props) {
  return (
    <div className={`w-full h-full flex justify-center items-center min-h-16`}>
      <p className="secondary-text text-center">{message}</p>
    </div>
  );
}

export default CenteredMessage;
