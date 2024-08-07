import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import MyLink from "@/app/components/MyLink";
import Input from "@/app/components/generic/Input";
import ConfirmContext from "@/app/context/ConfirmContext";
import useEmail from "@/app/hooks/useEmail";
import getEnv from "@/helpers/Env";
import { Validar } from "@/helpers/Validar";
import {
  ActionIcon,
  Alert,
  Button,
  Popover,
  ScrollArea,
  Table,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useTranslations } from "next-intl";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GrUndo } from "react-icons/gr";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { IContact } from "../mail-administration/page";

export interface IPerson {
  id: number;
  name: string;
  surname: string;
  email: string;
  subject: string;
  service: string;
  date_month: string;
}

const initialRow: IPerson = {
  id: 1,
  name: "",
  surname: "",
  email: "",
  subject: "",
  service: "",
  date_month: "",
};

interface Props {
  surveyIDProp: number;
  isMailAdministration?: boolean;
  contacts?: IContact[];
}

const EmailGrid = ({
  surveyIDProp,
  isMailAdministration = false,
  contacts,
}: Props) => {
  const t = useTranslations("Surveys.MailSystem");
  const { mostrarConfirm } = useContext(ConfirmContext);
  const { sendInvitations, isPendingSendInvitationsEmail } = useEmail({
    id: surveyIDProp,
  });
  const [opened, { close, open }] = useDisclosure(false);

  const [people, setPeople] = useState<IPerson[]>([initialRow]);
  const [applyAllFields, setApplyAllFields] = useState({
    subject: "",
    service: "",
    date_month: "",
  });

  useEffect(() => {
    if (!(isMailAdministration && contacts && contacts.length > 0)) return;

    setPeople(
      contacts.map((contact, index) => ({
        date_month: "",
        email: contact.email,
        id: index + 1,
        name: contact.nombres,
        service: "",
        subject: "",
        surname: "",
      })),
    );
  }, [contacts]);

  const validatePeople = useCallback(() => {
    // returns true if any person is empty
    const tempP = people.filter(
      (person) =>
        person.name !== "" ||
        person.surname !== "" ||
        person.email !== "" ||
        person.subject !== "",
    );

    if (tempP.length === 0) {
      toast(t("must_add_at_least_1_person"), {
        type: "error",
        position: "top-center",
        toastId: `must_add_at_least_1_person`,
      });
      return false;
    }

    for (const [i, person] of tempP.entries()) {
      if (
        person.name === "" ||
        person.surname === "" ||
        person.email === "" ||
        person.subject === ""
      ) {
        toast(t("fill_all_fields_for_person_number", { number: i + 1 }), {
          type: "error",
          position: "top-center",
          toastId: `fill_all_fields_for_person_number`,
        });
        return false;
      }
      if (!Validar.email(person.email).validado) {
        toast(t("email_invalid_for_person_number", { number: i + 1 }), {
          type: "error",
          position: "top-center",
          toastId: `email_invalid_for_person_number`,
        });
        return false;
      }
    }
    return true;
  }, [people, t]);

  const handleSendEmail = useCallback(async () => {
    if (!validatePeople()) return;

    modals.openConfirmModal({
      title: t("send_invitations_question"),
      children: <p>{t("send_invitation_email_confirm")}</p>,
      labels: { confirm: t("yes"), cancel: t("no") },
      onConfirm: async () => {
        const mailResponse = await sendInvitations(people);
        if (mailResponse) {
          toast(t("emails_sent_successfully"), {
            type: "success",
            position: "top-center",
            toastId: `emails_sent_successfully`,
          });
        } else {
          toast(t("error_sending_emails"), {
            type: "error",
            position: "top-center",
            toastId: `error_sending_emails`,
          });
        }
      },
    });
  }, [sendInvitations, t, validatePeople, people]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [previousPeople, setPreviousPeople] = useState<IPerson[]>([]);
  const handleExcelUpload = (FileList: FileList | null) => {
    if (FileList !== null) {
      const file = FileList[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target!.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as Array<
          Array<string | undefined>
        >;
        // Avoid uploading the first row (title of column) of the excel file - .slice(1)
        const mappedPeople = rows.map((row, index) => ({
          id: index,
          name: row[0] || "",
          surname: row[1] || "",
          email: row[2] || "",
          subject: row[3] || "",
          service: row[4] || "",
          date_month: row[5] || "",
        }));

        // To find the last empty row in the existing people array
        let lastEmptyIndex = 0;
        for (let i = people.length - 1; i >= 0; i--) {
          const person = people[i];
          if (
            !person.name &&
            !person.surname &&
            !person.email &&
            !person.subject
          ) {
            lastEmptyIndex = i;
            break;
          }
        }
        setPreviousPeople([...people]);
        // Append the new data from Excel to the end of the people array
        setPeople((prevPeople) => [
          ...prevPeople.slice(0, lastEmptyIndex),
          ...mappedPeople,
          ...prevPeople.slice(lastEmptyIndex + 1),
        ]);
      };

      reader.readAsBinaryString(file);
    }
  };
  const handleUndoUploadExcel = () => {
    setPeople([...previousPeople]);
  };

  const handleChangeApplyAll = (name: string, value: string) => {
    setApplyAllFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyToAll = () => {
    setPeople((prev) =>
      prev.map((person) => ({
        ...person,
        subject: applyAllFields.subject,
        service: applyAllFields.service,
        date_month: applyAllFields.date_month,
      })),
    );
  };

  const endRef = useRef<HTMLDivElement | null>(null);
  const handleAddPerson = () => {
    setPeople((p) => [
      ...people,
      { ...initialRow, id: (p.at(-1)?.id ?? 0) + 1 },
    ]);
    if (endRef)
      setTimeout(
        () =>
          endRef.current?.scrollIntoView({
            behavior: "smooth",
          }),
        50,
      );
  };

  return (
    <div
      className={`flex flex-col gap-3 p-0 lg:max-h-[470px] lg:w-[600px]
      ${isMailAdministration ? "" : "lg:pl-my-16"}`}
    >
      <h4 className="text-h6">{t("email_invitations")}</h4>
      {!isMailAdministration && (
        <Alert>
          <p className="flex flex-wrap items-center lg:gap-2">
            <span className="secondary-text">
              {t("need_more_options_question")}
            </span>
            <MyLink
              href={`${getEnv(
                "NEXT_PUBLIC_FRONTEND_URL",
              )}/mail-administration?surveyId=${surveyIDProp}`}
            >
              {t("advanced_mail_administrator")} <MyIcon icon="FiLink" />
            </MyLink>
          </p>
        </Alert>
      )}
      <div className="flex flex-col-reverse gap-3 lg:flex-row lg:justify-between">
        <div className="grid grid-cols-2 gap-3">
          <Popover
            width={320}
            position="bottom"
            withArrow
            shadow="md"
            opened={opened}
          >
            <Popover.Target>
              <Button
                onMouseEnter={open}
                onMouseLeave={close}
                onClick={() => inputRef.current?.click()}
                leftSection={<MyIcon icon="FiUpload" />}
                variant="default"
              >
                {t("upload_excel")}
              </Button>
            </Popover.Target>
            <Popover.Dropdown style={{ pointerEvents: "none" }}>
              <div>
                <p>{t("excel_must_include_following")}</p>
                <p className="flex justify-between rounded-sm bg-neutral-50 px-2 font-bold dark:bg-neutral-800">
                  {t("name_surname_email_subject")
                    .split(" ")
                    .map((el) => (
                      <span key={el}>{el}</span>
                    ))}
                </p>
              </div>
            </Popover.Dropdown>
          </Popover>
          <Button
            onClick={handleUndoUploadExcel}
            leftSection={<GrUndo />}
            variant="default"
          >
            {t("undo")}
          </Button>
        </div>
        <Button
          onClick={handleSendEmail}
          leftSection={<MyIcon icon="FiSend" />}
          loading={isPendingSendInvitationsEmail}
        >
          {t("send_invitations")}
        </Button>
      </div>
      {isMailAdministration && (
        <div className="decorative-border flex flex-col gap-my-8 rounded-my-8 border p-my-12">
          <div className="flex justify-between gap-my-4">
            <Input
              label={t("subject")}
              name="subject"
              onChange={handleChangeApplyAll}
              value={applyAllFields.subject}
            />
            <Input
              label={t("service")}
              name="service"
              onChange={handleChangeApplyAll}
              value={applyAllFields.service}
            />
            <Input
              label={t("month")}
              name="date_month"
              onChange={handleChangeApplyAll}
              value={applyAllFields.date_month}
            />
          </div>
          <MyButton
            onClick={handleApplyToAll}
            size="small"
            hierarchy={3}
            className="m-auto"
          >
            {t("apply_to_all")}
          </MyButton>
        </div>
      )}
      <ScrollArea>
        <Table horizontalSpacing={4} withRowBorders={false}>
          <Table.Thead className="bg-transparent">
            <Table.Tr>
              <Table.Th />
              <Table.Th>{t("name")}</Table.Th>
              <Table.Th>{t("surname")}</Table.Th>
              <Table.Th>{t("email")}</Table.Th>
              <Table.Th>{t("subject")}</Table.Th>
              <Table.Th>{t("service")}</Table.Th>
              <Table.Th>{t("month")}</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {people.map((el, i) => (
              <EmailsRow
                key={`${el.id}`}
                index={i}
                rowData={el}
                deleteRow={() =>
                  setPeople((p) => p.filter((el0) => el0.id !== el.id))
                }
                handleChangeRow={(field: keyof IPerson) =>
                  (e: React.ChangeEvent<HTMLInputElement>) =>
                    setPeople((p) =>
                      p.map((el0) =>
                        el0.id === el.id
                          ? { ...el0, [field]: e.target.value }
                          : el0,
                      ),
                    )
                  }
              />
            ))}
          </Table.Tbody>
        </Table>
        <Button
          onClick={handleAddPerson}
          variant="outline"
          leftSection={<MyIcon icon="FiPlus" />}
          className="ml-5 mt-2"
        >
          {t("add_person")}
        </Button>
        <div ref={endRef} />
      </ScrollArea>

      {!isMailAdministration && (
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept=".xls, .xlsx"
          onChange={(e) => handleExcelUpload(e.target.files)}
        />
      )}
    </div>
  );
};

export default EmailGrid;

const EmailsRow = ({
  index,
  deleteRow,
  rowData,
  handleChangeRow,
}: {
  index: number;
  deleteRow: () => void;
  rowData: IPerson;
  handleChangeRow: (
    field: keyof IPerson,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Table.Tr key={rowData.id}>
    <Table.Td>{index + 1}</Table.Td>
    <Table.Td>
      <TextInput value={rowData.name} onChange={handleChangeRow("name")} />
    </Table.Td>
    <Table.Td>
      <TextInput
        value={rowData.surname}
        onChange={handleChangeRow("surname")}
      />
    </Table.Td>
    <Table.Td>
      <TextInput value={rowData.email} onChange={handleChangeRow("email")} />
    </Table.Td>
    <Table.Td>
      <TextInput
        value={rowData.subject}
        onChange={handleChangeRow("subject")}
      />
    </Table.Td>
    <Table.Td>
      <TextInput
        value={rowData.service}
        onChange={handleChangeRow("service")}
      />
    </Table.Td>
    <Table.Td>
      <TextInput
        value={rowData.date_month}
        onChange={handleChangeRow("date_month")}
      />
    </Table.Td>
    <Table.Td>
      <ActionIcon variant="light" color="gray" onClick={deleteRow}>
        <MyIcon icon="FiTrash2" />
      </ActionIcon>
    </Table.Td>
  </Table.Tr>
);
