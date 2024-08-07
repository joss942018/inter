"use client";

import { createContext, useRef, useState } from "react";

const NavbarContext = createContext({} as INavbarContext);

interface Props {
  children: React.ReactNode;
}

const NavbarProvider = ({ children }: Props) => {
  const [mobilePortalsVisible, setMobilePortalsVisible] = useState(true);

  return (
    <NavbarContext.Provider
      value={{ mobilePortalsVisible, setMobilePortalsVisible }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

interface INavbarContext {
  mobilePortalsVisible: boolean;
  setMobilePortalsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export { NavbarProvider };
export default NavbarContext;
