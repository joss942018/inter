import { myMutation, myQuery } from "@/helpers/Fetch";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface ISurveyFlow {
  id: number;
  question?: number | null;
  survey_media?: number | null;
  order: number;
}

interface IReorder {
  id: number;
  order: number;
}

interface IProps {
  surveyid: number;
}

const useSurveyFlow = ({ surveyid }: IProps): IUseSurveyFlow => {
  const session = useSession();
  const queryClient = useQueryClient();

  const [flow, setFlow] = useState<ISurveyFlow[]>([]);
  //   const fetchFlow = useCallback(async () => {
  //     setIsLoading(true);
  //     const res = await fetch(
  //       `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/survey/survey_flow/${surveyid}/`,
  //       {
  //         headers: {
  //           Authorization: `Token ${session.data?.user.token}`,
  //         },
  //       },
  //     );
  //     setIsLoading(false);
  //     if (!res.ok) return;
  //     const data = await res.json();
  //     setFlow(data.sort((a: ISurveyFlow, b: ISurveyFlow) => a.order - b.order));
  //   }, [surveyid, session.data?.user.token]);

  const { data, isLoading } = useQuery({
    queryKey: [`/api/v1/survey/survey_flow`, surveyid],
    queryFn: myQuery<ISurveyFlow[]>({
      token: session?.data?.user.token,
    }),
    initialData: [],
  });

  useEffect(() => {
    if (data) {
      setFlow(data.sort((a: ISurveyFlow, b: ISurveyFlow) => a.order - b.order));
    }
  }, [data]);

  const { mutate: reorder } = useMutation({
    mutationFn: myMutation<IReorder>({
      url: "/api/v1/survey/question/reorder_question_or_media/",
      token: session.data?.user.token,
    }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [`/api/v1/survey/survey_flow`, surveyid],
      }),
  });

  const handleDragEnd = (a: DragEndEvent) => {
    const { active, over } = a;
    if (over && active.id !== over.id) {
      let newIndex = 0;
      setFlow((items) => {
        const mapId = [...items].map((el) => el.id.toString());
        const oldIndex = mapId.indexOf(active.id.toString());
        newIndex = mapId.indexOf(over.id.toString());
        let temp = arrayMove(items, oldIndex, newIndex);
        temp = temp.map((q, i) => ({
          ...q,
          order: i + 1,
        }));
        return temp;
      });
      setTimeout(() => {
        reorder({
          id: Number(active.id),
          order: Number(newIndex + 1),
        });
      }, 50);
    }
  };

  return {
    flow,
    handleDragEnd,
    loading: {
      fetchFlow: isLoading,
    },
  };
};

export default useSurveyFlow;

export interface IUseSurveyFlow {
  flow: ISurveyFlow[];
  handleDragEnd: (a: DragEndEvent) => void;
  loading: {
    fetchFlow: boolean;
  };
}
