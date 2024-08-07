import Image from "next/image";
import React, { useContext } from "react";
import ThemeContext, { TypeTheme } from "@/app/context/ThemeContext";
import { Link } from "@/internationalization/navigation";

interface Props {
  onClick?: () => void;
  link?: boolean;
}

const NavbarLogo = ({ onClick, link = false }: Props) => {
  const { theme } = useContext(ThemeContext);

  const getImageUrl = (theme: TypeTheme) => {
    return theme === "dark"
      ? "/img/logoBannerDark.svg"
      : "/img/logoBannerLight.svg";
  };

  const inner = (
    <div className="flex gap-[0.125rem] items-center px-my-12">
      <Image
        alt="Logo"
        src={getImageUrl(theme)}
        width={"0"}
        height={"0"}
        style={{ width: 62, height: 48 }}
        priority
      />
      <div
        className="text-2xl text-primary dark:text-primary_d tracking-tight -mt-[2px]"
        // className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary tracking-tight"
        onClick={onClick}
      ></div>
    </div>
  );

  if (link) return <Link href={`/`}>{inner}</Link>;
  return <div>{inner}</div>;
};

export default NavbarLogo;
