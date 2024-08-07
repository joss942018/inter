"use client";

import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import MyTooltip from "@/app/components/MyTooltip";
import Checkbox from "@/app/components/generic/Checkbox";
import Input from "@/app/components/generic/Input";
import Loader from "@/app/components/generic/Loader";
import Modal from "@/app/components/generic/Modal";
import SearchBarGeneric from "@/app/components/generic/SearchBarGeneric";
import ConfirmContext from "@/app/context/ConfirmContext";
import getEnv from "@/helpers/Env";
import { usePathname, useRouter } from "@/internationalization/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useFileUpload from "react-use-file-upload";
import EmailGrid from "../components/EmailGrid";

export interface IContact {
  nombres: string;
  email: string;
  ciudad: string;
  central: string;
  id: number;
}

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const surveyId = Number(searchParams.get("surveyId") ?? 0);

  const t = useTranslations("MailSystem");
  const session = useSession();
  const { mostrarConfirm } = useContext(ConfirmContext);

  const [modalUploadCSV, setModalUploadCSV] = useState(false);
  const [sendEmailsModal, setSendEmailsModal] = useState(false);

  const [contacts, setContacts] = useState<
    (IContact & { selected: boolean })[]
  >([]);
  const [filter, setFilter] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.email.toLowerCase().includes(filter.toLowerCase()) ||
      contact.nombres.toLowerCase().includes(filter.toLowerCase()),
  );

  const fetchContacts = async () => {
    axios
      .post(
        `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/organization/contact_list/`,
        {
          survey: surveyId,
        },
      )
      .then((data) => {
        if (data?.data?.data)
          setContacts(
            data.data.data.map((el: IContact, i: number) => ({
              ...el,
              selected: false,
              id: i + 1,
            })),
          );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // FILE UPLOAD
  const { files, clearAllFiles, setFiles } = useFileUpload();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingCSV, setUploadingCSV] = useState(false);

  useEffect(() => {
    if (files.length <= 0) return;
    if (isNaN(surveyId) || !(surveyId > 0)) return;
    const formData = new FormData();
    formData.append("csv_file", files[0]);
    formData.append("survey", surveyId.toString());
    formData.append("organization", session.data?.user.id.toString() ?? "0");
    setUploadingCSV(true);
    axios
      .post(
        `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/organization/upload_csv/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((data) => {
        fetchContacts();
        toast.success(t("csv_uploaded_successfully"));
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data?.message ?? t("error_while_uploading_csv"),
        );
      })
      .finally(() => {
        setUploadingCSV(false);
        clearAllFiles();
      });
  }, [files.length]);

  // FILE UPLOAD - END

  useEffect(() => {
    const surveyId0 = Number(surveyId);
    if (isNaN(surveyId0) || !(surveyId0 > 0)) return;
    fetchContacts();
  }, [surveyId]);

  const handleCheckBox = (name: string, value: boolean) => {
    const index = contacts.findIndex((el) => el.id.toString() === name);
    if (index < 0) return;
    const newContacts = contacts.slice();
    newContacts[index].selected = value;
    setContacts(newContacts);
  };

  const cantSelected = contacts.filter((el) => el.selected).length;
  const handleSelectUnselectAll = () => {
    let newContacts: typeof contacts = [];
    if (cantSelected > 0) {
      newContacts = contacts.map((el) => ({ ...el, selected: false }));
    } else {
      newContacts = contacts.map((el) => ({ ...el, selected: true }));
    }
    setContacts(newContacts);
  };

  const handleEmailsModalClose = async () => {
    if (await mostrarConfirm(t("sure_close_emails_modal_question")))
      setSendEmailsModal(false);
  };

  return (
    <>
      <div className="pt-my-48">
        <div className="flex flex-col gap-my-8 bg-white p-my-12 dark:bg-neutral-900">
          <h4 className="text-h4">{t("title")}</h4>
          <div className="my-my-12 flex h-my-64 items-center">
            {/* {loadingSurveys ? (
              <Loader />
            ) : surveysError ? (
              <p>{t("error_while_fetching_surveys")}</p>
            ) : (
              <MySelect
                label={t("select_a_survey")}
                name="survey"
                onChange={(_, value) =>
                  router.replace(`${pathname}?surveyId=${value.toString()}`)
                }
                options={
                  surveys?.surveyByOrganizationId
                    ?.slice()
                    .sort((a, b) => Number(a?.id ?? 0) - Number(b?.id ?? 0))
                    .map((el) => ({
                      label: `${el?.name} (Id: ${el?.id ?? ""})` ?? "",
                      value: el?.id ?? "",
                    })) ?? []
                }
                value={surveyId}
                className="w-full"
              />
            )} */}
          </div>
        </div>

        {/* custom table */}
        <div className="flex w-full items-center gap-my-16 p-my-12">
          <Checkbox
            name="select_all"
            onChange={handleSelectUnselectAll}
            value={cantSelected > 0}
            partiallySelected={
              cantSelected < contacts.length && cantSelected > 0
            }
          />
          <div className="flex w-full items-center justify-between gap-my-8">
            <span className="text-h3">{t("contacts")}</span>
            <div className="flex items-center gap-my-8">
              <MyTooltip text={t("add_contacts")}>
                <MyButton
                  squared
                  size="small"
                  hierarchy={2}
                  onClick={() => setModalUploadCSV(true)}
                >
                  <MyIcon icon="FiPlus" />
                </MyButton>
              </MyTooltip>
              <MyTooltip text={t("send_mails")}>
                <MyButton
                  size="small"
                  squared
                  onClick={() => setSendEmailsModal(true)}
                >
                  <MyIcon icon="FiSend" />
                </MyButton>
              </MyTooltip>
            </div>
          </div>
        </div>
        <SearchBarGeneric
          setSearchTerm={setFilter}
          showCantResults={filter.length > 0}
          cantResults={filteredContacts.length}
          onClear={() => setFilter("")}
          className="mx-my-12"
        />
        <div>
          {filteredContacts.map((el) => (
            <div key={el.email} className="flex gap-my-16 p-my-12">
              <Checkbox
                name={el.id.toString()}
                onChange={handleCheckBox}
                value={el.selected}
              />
              <div className="flex flex-col md:flex-row md:gap-my-16">
                <span>{el.nombres}</span>
                <span className="text-neutral-600">{el.email}</span>
                <span className="text-small text-primary-900">{el.ciudad}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        active={modalUploadCSV}
        close={() => setModalUploadCSV(false)}
        title={t("upload_contact_list")}
      >
        <div className="flex flex-col gap-my-8">
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={(e) => {
              setFiles(e as unknown as Event);
              if (inputRef.current) inputRef.current.value = "";
            }}
          />
          <p>{t("must_follow_structure")}:</p>
          <Input
            name="structure"
            onChange={() => {}}
            textArea
            value="CEDULA,PACIENTE,TELEFONO_MOVIL,MAIL,FECHA_FACTURA,CENTEAL,CIUDAD,NIVEL1,NIVEL2,NIVEL3,TIPO_LISTA"
          />
          <MyButton onClick={() => inputRef.current?.click()}>
            {uploadingCSV ? <Loader /> : <MyIcon icon="FiUpload" />}
            {t("upload")} CSV
          </MyButton>
        </div>
      </Modal>
      <Modal active={sendEmailsModal} close={handleEmailsModalClose}>
        <EmailGrid
          surveyIDProp={Number(surveyId)}
          isMailAdministration
          contacts={contacts.filter((el) => el.selected)}
        />
      </Modal>
    </>
  );
};

export default Page;
