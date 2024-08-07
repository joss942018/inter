"use client";

import getEnv from "@/helpers/Env";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | number | undefined | null;
  fetchData?: () => void;
}

const useLogo = ({ id, fetchData }: Props): IUseLogo => {
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const uploadLogo = useCallback(
    async (file: File | null | undefined) => {
      setLoading(true);
      if (file) {
        const formData = new FormData();
        formData.append("survey", id?.toString() ?? "");
        formData.append("logo", file);
        const response = await fetch(
          `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/survey/survey/add_logo/`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Token ${session.data?.user.token}`,
            },
          },
        );
        setLoading(false);
        if (response.ok) {
          if (fetchData) fetchData();
          return true;
        } else {
          return false;
        }
        //   .catch((error) => {
        //     // console.error("Error:", error);

        //   });
      } else {
        setLoading(false);
        return false;
      }
    },
    [id, session.data?.user.token],
  );

  return {
    uploadLogo,
    loading,
  };
};
export default useLogo;

export interface IUseLogo {
  uploadLogo: (file: File | null | undefined) => Promise<boolean>;
  loading: boolean;
}
