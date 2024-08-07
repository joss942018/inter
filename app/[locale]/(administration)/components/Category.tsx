"use client";

import ListExpandedItem from "@/app/components/generic/ListExpandedItem";
import { myMutation } from "@/helpers/Fetch";
import { useDroppable } from "@dnd-kit/core";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import SkeletonCategory from "../surveys/components/SkeletonCategory";
import { useSession } from "next-auth/react";

export interface ICategory {
  id: number;
  name: string;
  survey_count: number;
}

interface Props {
  data: ICategory;
  onClick: (id: number) => void;
  onDelete: () => void;
  active: boolean;
}

const Category = ({ data, onClick, onDelete, active }: Props) => {
  const t = useTranslations("Surveys");
  const { isOver, setNodeRef } = useDroppable({
    id: data.id,
  });

  const session = useSession();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: myMutation({
      url: `/api/v1/survey/category/${data.id}/`,
      token: session.data?.user.token,
      method: "DELETE",
    }),
    onSuccess: () => {
      toast(t("category_deleted"), {
        type: "success",
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/v1/survey/category/"] });
      queryClient.invalidateQueries({
        queryKey: ["/api/v1/survey/category", 0, "survey"],
      });
      onDelete();
    },
  });

  const handleDelete = async () => {
    modals.openConfirmModal({
      title: t("confirm_delete_category"),
      children: <p>{t("surveys_will_be_moved")}</p>,
      labels: { confirm: t("yes"), cancel: t("no") },
      confirmProps: { color: "red" },
      onConfirm: () => mutate({}),
    });
  };

  // if (viewMode === EnumViewMode.list)
  return (
    <>
      {isPending ? (
        <SkeletonCategory />
      ) : (
        <ListExpandedItem
          ref={setNodeRef}
          title={data.name}
          onClick={() => onClick(data.id)}
          actions={[
            {
              ico: "FiTrash2",
              label: t("delete"),
              onClick: handleDelete,
            },
          ]}
          active={active}
          helpText={`${data.survey_count} ${t("survey")}(s)`}
          icoTitle="FiFolder"
          dragOver={isOver}
        />
      )}
    </>
  );
};

export default Category;
