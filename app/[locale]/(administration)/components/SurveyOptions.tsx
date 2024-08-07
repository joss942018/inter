import MyIcon from "@/app/components/MyIcon";
import ListExpandedItem from "@/app/components/generic/ListExpandedItem";
import { myMutation } from "@/helpers/Fetch";
import { ActionIcon, Menu, Modal, ScrollArea } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { toast } from "react-toastify";
import Anyone from "../surveys/[surveyid]/components/formShareSurvey/Anyone";
import CloneForm from "./CloneForm";
import EmailGrid from "./EmailGrid";
import { ICategory } from "./Category";
import { ISurveyss } from "./Survey";

type Props = {
  surveyData: ISurveyss;
  onDelete?: () => void;
  onShare: () => void;
  level?: 1 | 2; // 1 = survey page,  2 = inside category
};

const SurveyOptions = ({ surveyData, level }: Props) => {
  const t = useTranslations("Surveys");
  const session = useSession();
  const [menuActive, setMenuActive] = useState(false);
  const refCont = useDetectClickOutside({
    onTriggered: () => setMenuActive(false),
  });
  const [opened, { open, close }] = useDisclosure();
  const [openedShare, { open: openShare, close: closeShare }] = useDisclosure();
  const [openedClone, { open: openClone, close: closeClone }] = useDisclosure();
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData(["/api/v1/survey/category/"]) as
    | {
        data?: ICategory[];
      }
    | undefined;

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/v1/survey/category/"] });
    queryClient.invalidateQueries({
      queryKey: ["/api/v1/survey/category", surveyData.category, "survey"],
    });
    queryClient.invalidateQueries({
      queryKey: ["/api/v1/survey/category", 0, "survey"],
    });
  };

  // Delete Survey
  const { mutate: deleteSurvey } = useMutation({
    mutationFn: myMutation({
      url: `/api/v1/survey/survey/${surveyData.id}/`,
      method: "DELETE",
      token: session.data?.user.token,
    }),
    onSuccess: () => {
      invalidateQueries();
      toast(t("survey_deleted"), {
        type: "success",
        position: "top-center",
      });
    },
  });

  const { mutate: moveSurvey } = useMutation({
    mutationFn: myMutation<{ category_id: number }>({
      url: `/api/v1/survey/survey/${surveyData.id}/`,
      method: "PATCH",
      token: session.data?.user.token,
    }),
    onSuccess: () => {
      invalidateQueries();
      setMenuActive(false);
      toast(t("survey_moved"), {
        type: "success",
        position: "top-center",
      });
    },
  });

  // Add survey to category
  const handleAdd = (category_id: number) => {
    moveSurvey({ category_id });
    close();
  };

  const handleDelete = () =>
    modals.openConfirmModal({
      title: t("delete_survey_question"),
      children: <p>{t("confirm_delete_survey")}</p>,
      labels: { confirm: t("yes"), cancel: t("no") },
      confirmProps: { color: "red" },
      onConfirm: () => deleteSurvey({}),
    });

  const handleRemove = () =>
    moveSurvey({
      category_id: 0,
    });

  const handleClone = () => {
    openClone();
  };

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <Menu
        shadow="md"
        width={220}
        opened={menuActive}
        onChange={setMenuActive}
      >
        <Menu.Target>
          <ActionIcon size={"lg"} variant="light" color="gray">
            <MyIcon icon="FiMoreHorizontal" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown ref={refCont}>
          <Menu.Item
            leftSection={<MyIcon icon="FiCopy" />}
            onClick={handleClone}
          >
            {t("clone")}
          </Menu.Item>
          <Menu.Item
            leftSection={<MyIcon icon="FiShare" />}
            onClick={openShare}
            disabled
          >
            {t("share")}
          </Menu.Item>
          <Menu.Item
            leftSection={<MyIcon icon="FiFolderPlus" />}
            onClick={open}
          >
            {t("add_to_folder")}
          </Menu.Item>
          <Menu.Item
            leftSection={<MyIcon icon="FiCornerUpLeft" />}
            onClick={handleRemove}
            disabled={level === 1}
          >
            {t("remove_from_folder")}
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<MyIcon icon="FiTrash2" />}
            onClick={handleDelete}
          >
            {t("delete")}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* Modal - add survey to category (small to medium screen) */}
      <Modal
        opened={opened}
        onClose={close}
        title={t("move_to")}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <ul className="flex flex-col gap-xs overflow-y-auto">
          {categories?.data
            ?.slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((el, i) => (
              <ListExpandedItem
                key={i}
                title={el.name}
                onClick={() => handleAdd(el.id)}
                icoTitle="FiFolder"
                helpText={`${el.survey_count} ${t("survey")}(s)`}
              />
            ))}
        </ul>
      </Modal>

      {/* Modal - share survey */}
      <Modal
        opened={openedShare}
        onClose={closeShare}
        title={t("sharing_survey")}
        fullScreen={isMobile}
        size={"948px"}
      >
        <div className="flex w-full flex-col gap-my-16 lg:flex-row">
          <Anyone surveyIDProp={surveyData.id} />
          <EmailGrid surveyIDProp={surveyData.id} />
        </div>
      </Modal>

      <Modal
        opened={openedClone}
        onClose={closeClone}
        title={t("clone_survey")}
      >
        <CloneForm surveyData={surveyData} close={closeClone} />
      </Modal>
    </div>
  );
};

export default SurveyOptions;
