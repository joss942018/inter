import { useMutation, useQuery } from "@tanstack/react-query";
import { IPerson } from "../[locale]/(administration)/components/EmailGrid";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

interface Props {
  id: number;
}

const useEmail = ({ id }: Props): IUseEmail => {
  const session = useSession();
  const { mutate: assignUserToSurvey } = useMutation({});
  const { mutate: removeSurveyedUserFromSurvey } = useMutation({});
  const {
    mutate: sendInvitationsEmail,
    isPending: isPendingSendInvitationsEmail,
  } = useMutation({});
  const { data, isLoading } = useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      return {};
    },
  });

  const addE = useCallback(
    async (email: string) => {
      const res = await assignUserToSurvey();
      // if (!res.errors) await getSurvey();
    },
    [id, assignUserToSurvey],
  );

  const deleteE = useCallback(
    async (email: string) => {
      const res = await removeSurveyedUserFromSurvey();
      // if (!res.errors) await getSurvey();
    },
    [id, removeSurveyedUserFromSurvey],
  );

  const sendInvitations = async (people: IPerson[]) => {
    // const res = await sendInvitationsEmail({});
    // if (res.errors) return false;
    // else return true;
    return false;
  };

  return {
    addE,
    deleteE,
    sendInvitations,
    isPendingSendInvitationsEmail,
  };
};

export default useEmail;

export interface IUseEmail {
  addE: (email: string) => void;
  deleteE: (email: string) => void;
  sendInvitations: (people: IPerson[]) => Promise<boolean>;
  isPendingSendInvitationsEmail: boolean;
}
