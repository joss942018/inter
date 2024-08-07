"use client";

import { useContext } from "react";
import ThemeContext, { TypeTheme } from "@/app/context/ThemeContext";
import Image from "next/image";

interface LogoSwitcherProps {
  darkImageSrc: string;
  lightImageSrc: string;
}

const LogoSwitcher: React.FC<LogoSwitcherProps> = ({
  darkImageSrc,
  lightImageSrc,
}) => {
  const { theme } = useContext(ThemeContext);

  // Función para obtener la URL de la imagen en función del tema.
  const getImageUrl = (theme: TypeTheme) => {
    return theme === "dark" ? darkImageSrc : lightImageSrc;
  };

  // Utiliza la función para obtener la URL de la imagen.
  const imageUrl = getImageUrl(theme);

  return (
    <div>
      <Image
        src={imageUrl}
        alt="Elia's logo"
        width={"0"}
        height={"0"}
        className="md:row-[1/3] md:col-[2/3] max-w-xs md:max-w-none"
        style={{ width: 400, height: 300 }}
      />
    </div>
  );
};

export default LogoSwitcher;
