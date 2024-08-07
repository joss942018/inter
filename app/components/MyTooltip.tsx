import { Tooltip } from "react-tooltip";

interface Props {
  text?: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

const MyTooltip = ({ text, children, position = "top" }: Props) => {
  return text ? (
    <>
      <div
        data-tooltip-id={text}
        data-tooltip-content={text}
        data-tooltip-place={position}
      >
        {children}
      </div>
      <Tooltip id={text} />
    </>
  ) : (
    <>{children}</>
  );
};

export default MyTooltip;
