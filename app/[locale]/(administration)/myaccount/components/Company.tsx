"use client";
import { useState } from "react";
import Input from "@/app/components/generic/Input";
import useForm, { IConfigValidacion } from "@/app/hooks/useForm";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import useLogo from "@/app/hooks/useLogo";
import { useSession } from "next-auth/react";
import MyButton from "@/app/components/MyButton";
import Loader from "@/app/components/generic/Loader";
import MyIcon from "@/app/components/MyIcon";
import Modal from "@/app/components/generic/Modal";
import { useMutation, useQuery } from "@tanstack/react-query";

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

const Company = () => {
  const t = useTranslations("Account");
  const session = useSession();
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const { formData, handleChange, formValidacion, setFormData, formValidado } =
    useForm(initialFormData, initialFormValidacion);
  const { loading, uploadLogo } = useLogo({
    id: session.data?.user.id ?? 0,
  });

  // queries

  // mutations

  const handleSave = () => {
    if (formValidado) {
      // editOrganization();
    }
    window.location.reload();
  };
  return (
    <div className="flex flex-col gap-s">
      <h3 className="text-heading3">{t("company")}</h3>
      <h5 className="secondary-text">{t("manage_your_company_details")}</h5>
      <div className="flex flex-col gap-xs">
        <div className="text-xl">
          <p>{formData.name}</p>
          <p>{formData.website}</p>
          <p>{formData.phone}</p>
        </div>
        <MyButton
          hierarchy={4}
          className="w-max"
          onClick={() => setIsEditingCompany(true)}
        >
          <MyIcon icon="FiEdit" />
          {t("edit")}
        </MyButton>
      </div>

      <Modal
        active={isEditingCompany}
        close={() => setIsEditingCompany(false)}
        title={String(t("change_company_info"))}
      >
        <div className="flex w-full flex-col gap-s md:w-10/12">
          <div className="grid w-max grid-cols-1 gap-s lg:grid-cols-2">
            <div className="flex w-max flex-col">
              <Input
                label={t("company_name")}
                name="name"
                onChange={handleChange}
                value={formData.name}
                validacion={formValidacion.name}
              />
            </div>

            <div className="flex w-max flex-col">
              <Input
                label={t("website")}
                name="website"
                onChange={handleChange}
                value={formData.website}
                validacion={formValidacion.website}
              />
            </div>

            <div className="flex w-max flex-col">
              <Input
                label={t("phone")}
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                validacion={formValidacion.phone}
              />
            </div>
          </div>

          <MyButton className="w-max" onClick={handleSave}>
            {true ? <Loader /> : <MyIcon icon="FiSave" />}
            {t("save")}
          </MyButton>
        </div>
      </Modal>
    </div>
  );
};

export default Company;
