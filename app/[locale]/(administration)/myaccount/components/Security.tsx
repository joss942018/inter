"use client";

import { useTranslations } from "next-intl";
import Input from "@/app/components/generic/Input";
import { useEffect, useState } from "react";
import useForm, { IConfigValidacion } from "@/app/hooks/useForm";
import { toast } from "react-toastify";
import MyButton from "@/app/components/MyButton";
import Loader from "@/app/components/generic/Loader";
import MyIcon from "@/app/components/MyIcon";
import Modal from "@/app/components/generic/Modal";

const initialFormData = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

const initialFormValidacion: IConfigValidacion = {
  password: {
    opcional: false,
    validar: "general",
  },
  newPassword: {
    opcional: false,
    validar: "general",
  },
  confirmPassword: {
    opcional: false,
    validar: "general",
  },
};

const Security = () => {
  const organizationId = 1;
  const t = useTranslations("Account");
  const [changingPass, setChangingPass] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const { formData, formValidacion, formValidado, handleChange, resetForm } =
    useForm(initialFormData, initialFormValidacion);

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword)
      toast(t("pass_mismatch"), {
        type: "error",
        position: "top-center",
      });

    setIsEditingPassword(false);
  };

  useEffect(() => {
    if (!changingPass) resetForm();
  }, [changingPass]);

  return (
    <div className="flex flex-col gap-m pt-8">
      <h3 className="text-heading3">{t("security")}</h3>
      <h5 className="secondary-text">{t("set_new_pass")}</h5>
      <MyButton
        hierarchy={4}
        className="flex w-max flex-row gap-xs"
        onClick={() => setIsEditingPassword(true)}
      >
        <MyIcon icon="FiEdit" />
        {t("edit")}
      </MyButton>

      <Modal
        active={isEditingPassword && !changingPass}
        close={() => setIsEditingPassword(false)}
        title={String(t("change_your_password"))}
      >
        <div className="flex w-full flex-col gap-s md:w-10/12">
          <div className="grid w-max grid-cols-1 gap-s lg:grid-cols-2">
            <Input
              label={String(t("password"))}
              name="password"
              onChange={handleChange}
              value={formData.password}
              validacion={formValidacion.password}
              type="password"
            />
            <Input
              label={String(t("new_password"))}
              name="newPassword"
              onChange={handleChange}
              value={formData.newPassword}
              validacion={formValidacion.newPassword}
              type="password"
            />
            <Input
              label={String(t("pass_confirm"))}
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              validacion={formValidacion.confirmPassword}
              type="password"
            />
          </div>
          <MyButton className="w-max" onClick={handleSave}>
            {/* {loading ? <Loader /> : <MyIcon icon="FiSave" />} */}
            {t("save_password")}
          </MyButton>
        </div>
      </Modal>
    </div>
  );
};

export default Security;
