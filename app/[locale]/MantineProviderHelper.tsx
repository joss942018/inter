"use client";

import { Card, MantineProvider, createTheme } from "@mantine/core";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const myTheme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: [
      "hsl(238, 100%, 95%)",
      "hsl(241, 100%, 91%)",
      "hsl(243, 100%, 83%)",
      "hsl(245, 100%, 73%)",
      "hsl(252, 100%, 62%)",
      "hsl(257, 100%, 54%)",
      "hsl(259, 100%, 50%)",
      "hsl(259, 100%, 50%)",
      "hsl(259, 100%, 45%)",
      "hsl(261, 100%, 35%)",
      "hsl(262, 100%, 10%)",
    ],
  },
  cursorType: "pointer",
  components: {
    Card: Card.extend({
      defaultProps: {
        padding: "xl",
        withBorder: true,
      },
    }),
  },
});

interface IProps {
  children: React.ReactNode;
}

const MantineProviderHelper = ({ children }: IProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <MantineProvider theme={myTheme} forceColorScheme={theme}>
      {children}
    </MantineProvider>
  );
};

export default MantineProviderHelper;
