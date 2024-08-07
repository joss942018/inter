"use client";

import Chip from "@/app/components/generic/Chip";
import { useCallback, useContext, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import SurveyContext from "../../context/SurveyContext";

function Emails() {
  const {
    // survey: { surveyData },
    email: { addE, deleteE },
  } = useContext(SurveyContext);
  const emails = useMemo(
    () => [],
    // () => surveyData?.surveyById?.surveyuserSet?.map((el) => el.email) || [],
    [],
    // [surveyData]
  );

  const t = useTranslations("Surveys");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddEmail = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        const email = e.currentTarget.value;
        if (email) {
          if (true) {
            // if (emails.includes(email)) {
            toast.error(t("email_already_added"));
          } else {
            addE(email);
          }
        }
      }
    },
    [t, addE, emails],
  );

  return (
    <div
      className="flex flex-wrap justify-center rounded-xl bg-lightest p-3 dark:bg-neutral-950"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex max-h-52 w-full flex-row flex-wrap gap-1 overflow-y-auto overflow-x-hidden">
        {emails.map((el, i) => (
          <Chip
            key={i}
            className="text-xs"
            label={el}
            onClose={() => deleteE(el)}
          />
        ))}
        <input
          ref={inputRef}
          placeholder={`${t("new_email")} (${t("guests")})`}
          className="h-8 min-w-[50%] flex-1 bg-transparent px-3 py-1 text-sm outline-none dark:text-gray-100 dark:placeholder:text-gray-400"
          onKeyDown={handleAddEmail}
        />
      </div>
    </div>
  );
}

export default Emails;
