"use client";

import ViewContext, { EnumViewMode } from "@/app/context/ViewContext";
import { useTranslations } from "next-intl";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Survey, { ISurveyss } from "../components/Survey";

import MyBreadcrumbs from "@/app/components/MyBreadcrumbs";
import MyButton from "@/app/components/MyButton";
import { MyDrawer } from "@/app/components/MyDrawer";
import MyIcon from "@/app/components/MyIcon";
import MyTabs from "@/app/components/MyTabs";
import MyTooltip from "@/app/components/MyTooltip";
import CenteredMessage from "@/app/components/generic/CenteredMessage";
import Chip from "@/app/components/generic/Chip";
import ListExpandedItem from "@/app/components/generic/ListExpandedItem";
import Portal from "@/app/components/generic/Portal";
import useWindowSize from "@/app/hooks/useWindowSize";
import { myMutation, myQuery } from "@/helpers/Fetch";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import {
  ActionIcon,
  Button,
  Loader,
  Modal,
  Table,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Category, { ICategory } from "../components/Category";
import NewCategoryForm from "./components/NewCategoryForm";
import NewSurvey from "./components/NewSurvey";
import SkeletonCategory from "./components/SkeletonCategory";

const Page = () => {
  // HOOKS
  const session = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedShare, { open: openShare, close: closeShare }] =
    useDisclosure(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const t = useTranslations("Surveys");

  // DRAWER
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newSurveyModal, setNewSurveyModal] = useState(false);

  // CATEGORIES
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["/api/v1/survey/category/"],
    queryFn: myQuery<{ data: ICategory[] } | undefined>({
      token: session.data?.user.token,
    }),
  });

  // SURVEYS
  const [surveysFiltered, setSurveysFiltered] = useState<ISurveyss[]>([]);
  const { data: surveys, isLoading: isLoadingSurveys } = useQuery({
    queryKey: ["/api/v1/survey/category", activeCategory, "survey"],
    queryFn: myQuery<ISurveyss[] | undefined>({
      token: session.data?.user.token,
    }),
  });

  const { mutate: moveSurveyToCategory } = useMutation({
    mutationFn: myMutation({ url: "/api/v1/surveys/move_survey_to_category" }),
    onSuccess: (data) => {
      toast(
        `${t("survey")} "${"surveyId"}" ${t(
          "sent_to_category",
        )} "${"categoryId"}"`,
        {
          type: "success",
          position: "top-center",
        },
      );
    },
  });

  // FILTERS
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (!surveys) return;
    let tempSurveys = [...surveys];
    tempSurveys = tempSurveys.filter(
      (el) => (el.category ?? 0) === activeCategory,
    );
    if (searchTerm.length > 0) {
      tempSurveys = tempSurveys.filter((el) =>
        el.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setSurveysFiltered(tempSurveys);
  }, [activeCategory, searchTerm, surveys]);

  // VIEW
  const { view, toggleView, setView } = useContext(ViewContext);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize.width && windowSize.width < 1024) {
      setView(EnumViewMode.grid);
    }
  }, [windowSize.width]);
  useEffect(() => {
    setDrawerOpen(false);
  }, [activeCategory]);
  useEffect(() => {
    if (windowSize.width && windowSize.width > 1024) setDrawerOpen(true);
  }, [windowSize.width]);

  // DRAG AND DROP
  const [dragging, setDragging] = useState(false);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setDragging(false);
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
        const categoryId = Number(over.id);
        const surveyId = Number(active.id);
        moveSurveyToCategory({
          categoryId,
          surveyId,
        });
      }
    },
    [moveSurveyToCategory],
  );
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 8,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  // SHARE SURVEY WITH COLLABORATORS
  const [activeTab, setActiveTab] = useState(0); //0=editor 1=viewer
  const [editorEmails, setEditorEmails] = useState<string[]>([]);
  const [viewerEmails, setViewerEmails] = useState<string[]>([]);
  const [shareSurveyPopup, setShareSurveyPopup] = useState(false);
  const [email, setEmail] = useState("");
  const handleShareSurveyPopup = () => {
    setEmail("");
    setShareSurveyPopup(!shareSurveyPopup);
  };
  const handleEnter = () => {
    if (activeTab === 0) {
      setEditorEmails([...editorEmails, email]);
    } else if (activeTab === 1) {
      setViewerEmails([...viewerEmails, email]);
    }
    setEmail("");
  };

  return (
    <>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        modifiers={[snapCenterToCursor]}
        onDragStart={() => setDragging(true)}
      >
        <MyDrawer
          firstColOpen={drawerOpen}
          closeFirstCol={() => setDrawerOpen(false)}
          firstCol={
            <div
              className={`text-base-content flex min-h-full w-full flex-col gap-my-16 px-my-16 pt-my-48`}
            >
              {/* Sidebar content here */}
              {/* header */}

              <div className="flex h-my-48 items-center justify-between">
                <h4 className="text-h5">{t("categories")}</h4>
                <div className="flex items-center gap-5">
                  <Tooltip label={t("add_folder")}>
                    <ActionIcon variant="" onClick={open}>
                      <MyIcon icon="FiPlus" />
                    </ActionIcon>
                  </Tooltip>
                  <MyButton
                    onClick={() => setDrawerOpen(false)}
                    hierarchy={4}
                    className="lg:!hidden"
                  >
                    <MyIcon size={24} icon="FiX" />
                  </MyButton>
                </div>
              </div>
              <ListExpandedItem
                title={t("see_all_surveys")}
                // icoTitle="FiFile"
                onClick={() => setActiveCategory(0)}
                active={activeCategory === 0}
              />
              <div
                className={`flex flex-col gap-my-16 pb-4 transition-transform
                    ${
                      dragging
                        ? "non-decorative-border scale-95 rounded-my-12 border-4 border-dashed"
                        : ""
                    }`}
              >
                {isLoadingCategories ? (
                  <SkeletonCategory />
                ) : (
                  categories?.data
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((el) => (
                      <Category
                        key={el.id}
                        data={el}
                        onClick={setActiveCategory}
                        active={activeCategory === el.id}
                        onDelete={() => setActiveCategory(0)}
                      />
                    ))
                )}
              </div>
            </div>
          }
          secondCol={
            <div
              className={`relative flex min-h-screen w-full flex-col pt-[150px] lg:pt-my-48`}
            >
              {isLoadingSurveys ? (
                <div className="m-auto p-10">
                  <Loader />
                </div>
              ) : (
                <>
                  {surveys?.length === 0 && categories?.data.length === 0 ? (
                    <div className="m-auto">
                      <CenteredMessage message={t("no poll create")} />
                    </div>
                  ) : (surveys?.length ?? 0) > 0 &&
                    surveysFiltered.length === 0 ? (
                    <div className="m-auto">
                      <CenteredMessage message={t("no poll found")} />
                    </div>
                  ) : view === EnumViewMode.list ? (
                    <Table
                      stickyHeader
                      stickyHeaderOffset={48}
                      withRowBorders={false}
                      highlightOnHover
                      horizontalSpacing="lg"
                      className="w-full bg-white dark:bg-neutral-950"
                    >
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>{t("name")}</Table.Th>
                          <Table.Th>{t("Responses")}</Table.Th>
                          <Table.Th>{t("created_on")}</Table.Th>
                          <Table.Th>{t("status")}</Table.Th>
                          <Table.Th></Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {surveysFiltered
                          .sort((a, b) => Number(b.id) - Number(a.id))
                          .map((el) => (
                            <Survey
                              key={el.id}
                              data={el}
                              viewMode={EnumViewMode.list}
                              onShare={() => {}}
                              // onShare={() => handleShareSurvey(el.id.toString())}
                            />
                          ))}
                      </Table.Tbody>
                    </Table>
                  ) : (
                    <div
                      className={`flex w-full flex-wrap justify-center gap-s p-s`}
                    >
                      {/* <AnimatePresence> */}
                      {surveysFiltered
                        .sort((a, b) => Number(b.id) - Number(a.id))
                        .map((el) => (
                          <Survey
                            key={el.id}
                            data={el}
                            viewMode={EnumViewMode.grid}
                            onShare={handleShareSurveyPopup}
                          />
                        ))}
                      {/* </AnimatePresence> */}
                    </div>
                  )}
                </>
              )}
            </div>
          }
        />
      </DndContext>

      {/* portales */}
      <Portal elementId={"navbar-start-portal"}>
        <div className="flex h-my-48 items-center gap-my-4">
          <MyBreadcrumbs
            list={
              activeCategory > 0
                ? [
                    { onClick: () => setActiveCategory(0), link: t("surveys") },
                    {
                      link:
                        categories?.data.find((el) => el.id === activeCategory)
                          ?.name ?? "",
                    },
                  ]
                : [{ href: "/surveys", link: t("surveys") }]
            }
          />
        </div>
      </Portal>
      <Portal elementId={"navbar-center-portal"}>
        <TextInput
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mx-my-12 mb-my-12 w-full lg:mb-0"
          variant="filled"
          placeholder={t("search")}
          leftSection={<MyIcon icon="FiSearch" />}
        />
      </Portal>
      <Portal elementId={"navbar-end-portal"}>
        <div className="my-auto ml-auto hidden flex-row items-center gap-my-8 lg:flex">
          <MyTooltip text={t("change_view")} position="bottom">
            <MyButton onClick={toggleView} hierarchy={3} squared>
              {view === "grid" ? (
                <MyIcon icon="FiGrid" size={20} />
              ) : (
                <MyIcon icon="FiList" size={20} />
              )}
            </MyButton>
          </MyTooltip>
          <NewSurveyButton setNewSurveyModal={setNewSurveyModal} />
        </div>
        <div className="my-my-12 h-max w-full lg:hidden">
          <div className="mx-my-12 flex items-center justify-between">
            <MyButton
              hierarchy={4}
              size="small"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MyIcon icon="FiBookOpen" />
              {t("categories")}
            </MyButton>
            <NewSurveyButton setNewSurveyModal={setNewSurveyModal} />
          </div>
        </div>
      </Portal>

      {/* modal to create a new category */}
      <Modal
        opened={opened}
        onClose={close}
        title={String(t("new_category"))}
        size={"sm"}
      >
        <NewCategoryForm close={close} />
      </Modal>

      {/* modal to share a survey */}
      <Modal
        opened={openedShare}
        onClose={closeShare}
        title={String(t("share_survey"))}
      >
        <div className="flex flex-col gap-s">
          <MyTabs
            activeTab={activeTab}
            selectTab={setActiveTab}
            className="mx-auto"
            tabs={[{ text: t("editor") }, { text: t("viewer") }]}
          />
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-s"
          >
            <div className="rounded-lg bg-lightest outline-none dark:bg-dark_d">
              <div className="flex flex-col gap-xxs">
                {(activeTab === 0 ? editorEmails : viewerEmails).map(
                  (el, i) => (
                    <Chip
                      key={i}
                      className="mx-xxs mt-xxs text-xs"
                      label={el}
                      onClose={() => {}}
                    />
                  ),
                )}
              </div>
              <TextInput
                autoFocus
                type="text"
                name="new_email"
                label={t("new_email")}
                value={email}
                className=" h-12 w-full rounded-lg bg-lightest px-3 py-1 text-sm outline-none dark:bg-dark_d"
              />
            </div>

            <Button leftSection={<MyIcon icon="FiSend" />} loading={true}>
              {t("send_invitations")}
            </Button>
          </form>
        </div>
      </Modal>
      <NewSurvey
        stateModal={[newSurveyModal, setNewSurveyModal]}
        activeCategory={{
          id: activeCategory,
          name:
            categories?.data.find((el) => el.id === activeCategory)?.name ?? "",
        }}
      />
    </>
  );
};

export default Page;

const NewSurveyButton = ({
  setNewSurveyModal,
}: {
  setNewSurveyModal: React.Dispatch<boolean>;
}) => {
  const t = useTranslations("Surveys");

  return (
    <MyButton onClick={() => setNewSurveyModal(true)} size="small">
      <MyIcon icon="FiPlus" />
      <p>{String(t("survey"))}</p>
    </MyButton>
  );
};
