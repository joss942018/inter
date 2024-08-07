"use client";
import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import Input from "@/app/components/generic/Input";
import Loader from "@/app/components/generic/Loader";
import useForm, { IConfigValidacion } from "@/app/hooks/useForm";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import SurveyLogo from "../surveys/[surveyid]/components/SurveyLogo";
import Company from "./components/Company";
import CurrentPlan from "./components/CurrentPlan";
import Security from "./components/Security";
import Modal from "@/app/components/generic/Modal";

const initialFormData = {
  firstNameOfContactPerson: "",
  lastNameOfContactPerson: "",
  name: "",
  website: "",
  phone: "",
  city: 0,
  country: 0,
  id: 0,
};

const initialFormValidacion: IConfigValidacion = {
  firstNameOfContactPerson: {
    opcional: false,
    validar: "texto",
  },
  lastNameOfContactPerson: {
    opcional: false,
    validar: "texto",
  },
  name: {
    opcional: false,
    validar: "general",
  },
  website: {
    opcional: false,
    validar: "general",
  },
  phone: {
    opcional: false,
    validar: "general",
  },
  city: {
    opcional: false,
    validar: "noCero",
  },
  country: {
    opcional: false,
    validar: "noCero",
  },
  id: {
    opcional: false,
    validar: "noCero",
  },
};

const Page = () => {
  const t = useTranslations("Account");

  const session = useSession();

  const { formData, handleChange, formValidacion, setFormData, formValidado } =
    useForm(initialFormData, initialFormValidacion);

  // queries

  // mutations

  const handleSave = () => {
    if (formValidado) {
    }
    window.location.reload();
  };

  //Editing States
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);

  return (
    <>
      <div className="w-full bg-white dark:bg-neutral-950">
        <div className="mx-auto flex max-w-5xl flex-col justify-center gap-m px-5 pb-8 pt-24 shadow-md dark:bg-neutral-950 dark:shadow-sm dark:shadow-medium_d md:px-16">
          {/* Personal */}
          <div className="flex flex-col gap-s">
            <h3 className="text-heading3">{t("personal")}</h3>
            <h5 className="secondary-text">
              {t("manage_your_personal_details")}
            </h5>

            <div className="flex justify-center">
              <div className="h-60 w-60 rounded-full border border-light dark:border-medium_d">
                <SurveyLogo
                // id={session.data?.user.id}
                // logoFrom="organization"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-xs">
              <div className="text-3xl">
                {formData.firstNameOfContactPerson}{" "}
                {formData.lastNameOfContactPerson}
              </div>
              <MyButton
                hierarchy={4}
                className="w-max"
                onClick={() => setIsEditingPersonal(true)}
              >
                <MyIcon icon="FiEdit" />
                {t("edit")}
              </MyButton>
            </div>

            <Modal
              active={isEditingPersonal}
              close={() => setIsEditingPersonal(false)}
              title={String(t("change_prsonal_info"))}
            >
              <div className="flex w-full flex-col gap-s md:w-10/12">
                <div className="flex flex-row gap-s">
                  <Input
                    label={t("name")}
                    name="firstNameOfContactPerson"
                    onChange={handleChange}
                    value={formData.firstNameOfContactPerson}
                    validacion={formValidacion.firstNameOfContactPerson}
                  />
                  <Input
                    label={t("last_name")}
                    name="lastNameOfContactPerson"
                    onChange={handleChange}
                    value={formData.lastNameOfContactPerson}
                    validacion={formValidacion.lastNameOfContactPerson}
                  />
                </div>

                <MyButton className="w-max" onClick={handleSave}>
                  {/* {loadingSave ? <Loader /> : <MyIcon icon="FiSave" />} */}
                  {t("save")}
                </MyButton>
              </div>
            </Modal>
          </div>
          {/* Personal */}

          <hr />

          <Company />

          <hr />

          <Security />

          <hr />

          <CurrentPlan />
          {/* <div className="mt-4">
           
            <MyTabs
              activeTab={activeTab}
              selectTab={handleTabClick}
              className="mx-auto"
              tabs={[
                { text: t("company") },
                { text: t("security") },
                { text: t("plan") },
              ]}
            />

            <div>
              {activeTab === 1 ? (
                <Security />
              ) : activeTab === 2 ? (
                <CurrentPlan />
              ) : (
                <Company />
              )}
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
