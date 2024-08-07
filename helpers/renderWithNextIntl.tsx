import { RenderOptions, render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactElement } from "react";
import messagesEN from "../internationalization/messages/en.json";

export const renderWithNextIntl = (
  ui: ReactElement,
  options?: RenderOptions
) => {
  const Wrapper: React.FC<{ children: ReactElement | ReactElement[] }> = ({
    children,
  }) => (
    <NextIntlClientProvider
      locale="en"
      timeZone="America/Guayaquil"
      messages={messagesEN}
    >
      {children}
    </NextIntlClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};
