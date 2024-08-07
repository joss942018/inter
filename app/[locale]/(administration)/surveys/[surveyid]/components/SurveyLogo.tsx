"use client";

import { useContext, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import SurveyContext from "../context/SurveyContext";
import { Loader } from "@mantine/core";

interface Props {
  disabled?: boolean;
}

function SurveyLogo({ disabled = false }: Props) {
  const t = useTranslations("Account");
  const [hovered, setHovered] = useState(false);

  const {
    survey: {
      form: { watch },
      logo,
      loading: { getSurvey, uploadLogo },
    },
  } = useContext(SurveyContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setHovered(false);
    if (event.target.files) {
      const file = event.target.files[0];
      const res = await logo.uploadLogo(file);
      if (res) {
        toast(t("logo_uploaded"), {
          type: "success",
        });
      } else {
        toast(t("logo_upload_error"), {
          type: "error",
        });
      }
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        className="hidden"
        id="input-logo"
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
      />
      <div className="relative flex h-full w-full flex-row items-center justify-center gap-3 overflow-hidden rounded-full p-3">
        {/* {!isDefaultImage && ( */}
        {getSurvey || uploadLogo ? (
          <Loader />
        ) : (
          <>
            <Image
              src={watch("logo") || "/img/letraElia.svg"}
              alt={t("survey_logo")}
              width="0"
              height="0"
              sizes="100vw"
              className="h-auto w-auto rounded-full object-contain"
            />
            {!disabled && (
              <div
                className={`absolute bottom-0 left-0 right-0 top-0 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-full bg-gray-200 bg-opacity-60
          backdrop-blur-sm transition-opacity dark:bg-gray-600 dark:bg-opacity-60
          ${hovered ? "opacity-100" : "opacity-0"}
          `}
                onClick={() => inputRef.current?.click()}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onBlur={() => setHovered(false)}
              >
                <div className="ico-create-outline h-6 w-6 cursor-pointer dark:invert-[1]" />
                <p className="text-xs text-black dark:text-white">
                  {t("edit")}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SurveyLogo;
