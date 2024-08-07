import * as Icon from "react-icons/fi";

interface Props {
  icon: keyof typeof Icon;
  size?: 4 | 8 | 12 | 16 | 20 | 24 | 32 | 48 | 64 | 96 | 128 | 192 | 256;
  strokeWidth?: 1 | 2 | 3 | 4;
}

const MyIcon = ({ icon, size, strokeWidth = 2 }: Props) => {
  const MyIco = Icon[icon];
  return <MyIco size={size} strokeWidth={strokeWidth} />;
};

export default MyIcon;

export type TypeFi = React.ComponentProps<typeof MyIcon>["icon"];
