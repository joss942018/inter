import Confirm from "../components/generic/Confirm";
import { Questrial } from "next/font/google";
import TypesLanguages from "@/types/TypesLanguages";
import Providers from "./Providers";
import { ColorSchemeScript } from "@mantine/core";
import MantineProviderHelper from "./MantineProviderHelper";
import { ModalsProvider } from "@mantine/modals";

interface Props {
  children: React.ReactNode;
  params: {
    locale: TypesLanguages;
  };
}

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Layout = ({ children, params }: Props) => {
  return (
    <html lang={params.locale}>
      <head>
        <title>Elia</title>
        <ColorSchemeScript />
      </head>
      <body
        className={`my-scrollbar h-full min-h-screen w-full select-none overflow-y-auto bg-neutral-50 text-black dark:bg-neutral-950 dark:text-white
        ${questrial.className}`}
      >
        <Providers locale={params.locale}>
          <MantineProviderHelper>
            <ModalsProvider>
              {children}
              <Confirm />
            </ModalsProvider>
          </MantineProviderHelper>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
