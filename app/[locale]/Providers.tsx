"use client";

import TypesLanguages from "@/types/TypesLanguages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { Slide, ToastContainer } from "react-toastify";
import messagesEN from "../../internationalization/messages/en.json";
import messagesES from "../../internationalization/messages/es.json";
import { ConfirmProvider } from "../context/ConfirmContext";
import { NavbarProvider } from "../context/NavbarContext";
import { ThemeProvider } from "../context/ThemeContext";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
  locale: TypesLanguages;
}

const Providers: React.FC<Props> = ({ children, locale }) => {
  return (
    <>
      <ThemeProvider>
        <NavbarProvider>
          <ConfirmProvider>
            <QueryClientProvider client={queryClient}>
              <SessionProvider>
                <NextIntlClientProvider
                  locale={locale}
                  messages={locale === "es" ? messagesES : messagesEN}
                >
                  {children}
                </NextIntlClientProvider>
              </SessionProvider>
            </QueryClientProvider>
          </ConfirmProvider>
        </NavbarProvider>
      </ThemeProvider>
      <ToastContainer
        position="top-center"
        // autoClose={2000}
        hideProgressBar
        toastClassName={() =>
          "bg-white dark:bg-dark_d shadow-md dark:shadow-sm dark:shadow-medium_d flex flex-row items-center rounded-md p-2 mb-2 text-black dark:text-white border border-light dark:border-medium_d"
        }
        closeButton={false}
        transition={Slide}
      />
    </>
  );
};

export default Providers;
