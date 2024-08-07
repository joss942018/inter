"use client";

import TypesLanguages from "@/types/TypesLanguages";
import i18next from "i18next";
import { useLocale } from "next-intl";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translationEn from "zod-i18n-map/locales/en/zod.json";
import translationEs from "zod-i18n-map/locales/es/zod.json";

// lng and resources key depend on your locale.
const useZod = () => {
  const locale = useLocale();

  i18next.init({
    lng: locale,
    resources: {
      es: { zod: translationEs },
      en: { zod: translationEn },
    },
  });
  z.setErrorMap(zodI18nMap);
  return z;
};

// export configured zod instance
export default useZod;
