"use client";

import {
  Select,
  Switch,
  TextInput,
  DateTimePicker,
} from "react-hook-form-mantine";
import { Accordion, Card, Tabs } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { Controller, Form, FormProvider } from "react-hook-form";
import SurveyContext from "../../context/SurveyContext";
import SurveyLogo from "../SurveyLogo";
import AutoSave from "@/app/components/AutoSave";
import ThemeSelector from "../questions/ThemeSelector";

const Details = () => {
  const t = useTranslations("Surveys");

  const {
    survey: { id, form, onSubmit },
  } = useContext(SurveyContext);
  const {
    formState: { errors },
    watch,
    control,
  } = form;

  return (
    <FormProvider {...form}>
      <Form control={control}>
        <AutoSave onSubmit={onSubmit} />
        <Accordion defaultValue="details">
          <Accordion.Item value={"details"}>
            <Accordion.Control>
              <h5 className="text-h5">{t("details")}</h5>
            </Accordion.Control>
            <Accordion.Panel>
              <div className="flex flex-col gap-5">
                <TextInput
                  name="name"
                  control={control}
                  label={String(t("survey_s_title"))}
                  error={errors.name?.message}
                />
                <Select
                  name="language"
                  control={control}
                  label={t("language")}
                  placeholder={t("select_a_language")}
                  data={[
                    {
                      value: "spa",
                      label: "Español",
                    },
                    {
                      value: "eng",
                      label: "English",
                    },
                  ]}
                  error={errors.language?.message}
                  allowDeselect={false}
                />
                <Card padding={"md"}>
                  <>
                    <p className="text-small">{t("receive_survey_answers")}</p>
                    <Controller
                      control={control}
                      name="scheduled"
                      render={({ field }) => (
                        <Tabs
                          value={field.value ? "scheduled" : "manual"}
                          onChange={(value) =>
                            field.onChange(value === "scheduled")
                          }
                        >
                          <Tabs.List>
                            <Tabs.Tab value="manual">Manual</Tabs.Tab>
                            <Tabs.Tab value="scheduled">
                              {t("scheduled")}
                            </Tabs.Tab>
                          </Tabs.List>

                          <Tabs.Panel value="manual" className="p-3">
                            <Switch
                              name="active"
                              control={control}
                              label={
                                watch("active") ? t("active") : t("inactive")
                              }
                            />
                          </Tabs.Panel>
                          <Tabs.Panel
                            value="scheduled"
                            className="flex flex-col gap-5 pt-3"
                          >
                            <DateTimePicker
                              name="scheduled_from"
                              control={control}
                              label={String(t("start_date"))}
                              error={errors.scheduled_from?.message}
                            />
                            <DateTimePicker
                              name="scheduled_to"
                              control={control}
                              label={String(t("end_date"))}
                              error={errors.scheduled_to?.message}
                            />
                          </Tabs.Panel>
                        </Tabs>
                      )}
                    />
                  </>
                </Card>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value={"logo"}>
            <Accordion.Control>
              <h5 className="text-h5">Logo</h5>
            </Accordion.Control>
            <Accordion.Panel>
              <div className="flex w-full flex-col gap-2 dark:bg-neutral-950 dark:bg-opacity-40">
                <div className="h-my-192 w-my-192 rounded-full border border-neutral-200 bg-inherit bg-white dark:border-neutral-700 dark:bg-neutral-900">
                  <SurveyLogo disabled={id === 0} />
                </div>
                <p className="text-small text-neutral-900 dark:!text-neutral-100">
                  {t("click_image_edit")}
                </p>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value={"theme"}>
            <Accordion.Control>
              <h5 className="text-h5">{t("themes")}</h5>
            </Accordion.Control>
            <Accordion.Panel>
              <Controller
                name="theme"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ThemeSelector value={value} onChange={onChange} />
                )}
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Form>
    </FormProvider>
  );
};

export default Details;
