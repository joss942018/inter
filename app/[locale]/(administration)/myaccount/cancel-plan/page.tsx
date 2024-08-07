"use client";
import React, { useContext, useState } from "react";
import getEnv from "@/helpers/Env";
import Button from "@/app/components/generic/Button";
import Footer from "@/app/[locale]/components/Footer";
import Input from "@/app/components/generic/Input";
import Modal from "@/app/components/generic/Modal";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const URL = `${getEnv(
  "NEXT_PUBLIC_BACKEND_ENDPOINT"
)}/payments/paypal/cancel_subscription/`;

const Page = () => {
  const session = useSession();

  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const t = useTranslations("Subscription");

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    if (checked) {
      setReason("");
      setSelectedReasons((prevSelectedReasons) => [
        ...prevSelectedReasons,
        value,
      ]);
    } else {
      setSelectedReasons((prevSelectedReasons) =>
        prevSelectedReasons.filter((reason) => reason !== value)
      );
    }
  };

  const handleOtherReasonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReason("");
    setOtherReason(event.target.value);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const onApprove = async () => {
    closeModal;
    try {
      let cancellationReason = "";

      if (selectedReasons.includes("reason1")) {
        cancellationReason += t("reason_1") + ", ";
      }
      if (selectedReasons.includes("reason2")) {
        cancellationReason += t("reason_2") + ", ";
      }
      if (selectedReasons.includes("reason3")) {
        cancellationReason += t("reason_3") + ", ";
      }
      if (selectedReasons.includes("reason4")) {
        cancellationReason += t("reason_4") + ", ";
      }
      if (selectedReasons.includes("Otro")) {
        cancellationReason += `${otherReason}, `;
      }

      cancellationReason = cancellationReason.replace(/,\s*$/, "");

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization_id: session.data?.user.id,
          reason: cancellationReason,
        }),
      });

      if (response.status === 200) {
        setIsConfirmationModalOpen(false);
        toast(t("succes_message"), {
          type: "success",
          position: "top-center",
        });
      } else {
        setIsConfirmationModalOpen(false);
        console.error(response);
        toast(t("error_message"), {
          type: "error",
          position: "top-center",
        });
      }
    } catch (error) {
      setIsConfirmationModalOpen(false);
      console.error(error);
      toast(t("error_message"), {
        type: "error",
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="w-full dark:bg-neutral-950 bg-white">
        <div className="h-screen flex flex-col max-w-6xl mx-auto pt-24 px-5 md:px-16 dark:bg-neutral-950">
          <h1 className="text-4xl font-medium">
            {t("cancel_subscription_title")}
          </h1>
          <div className="flex flex-col items-center justify-center my-12">
            <div className="flex flex-col justify-center gap-4 px-5 pb-8 pt-4 md:px-12 w-full border dark:border-dark_d max-w-2xl shadow-md dark:shadow-sm dark:shadow-medium_d">
              <label>{t("select_reason")}</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="reason1"
                    checked={selectedReasons.includes("reason1")}
                    onChange={handleCheckboxChange}
                    className="mx-2"
                  />
                  {t("reason_1")}
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    value="reason2"
                    checked={selectedReasons.includes("reason2")}
                    onChange={handleCheckboxChange}
                    className="mx-2"
                  />
                  {t("reason_2")}
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    value="reason3"
                    checked={selectedReasons.includes("reason3")}
                    onChange={handleCheckboxChange}
                    className="mx-2"
                  />
                  {t("reason_3")}
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    value="reason4"
                    checked={selectedReasons.includes("reason4")}
                    onChange={handleCheckboxChange}
                    className="mx-2"
                  />
                  {t("reason_4")}
                </label>
              </div>

              <div className="flex flex-col gap-4">
                <label>
                  <input
                    type="checkbox"
                    value="Otro"
                    checked={selectedReasons.includes("Otro")}
                    onChange={handleCheckboxChange}
                    className="mx-2"
                  />
                  {t("other_reason")}
                </label>
                {selectedReasons.includes("Otro") && (
                  <div>
                    <Input
                      label="Enter other reason"
                      name="firstNameOfContactPerson"
                      onChange={handleOtherReasonChange}
                      value={otherReason}
                    />
                  </div>
                )}
              </div>

              <div className="w-full flex justify-end mt-4">
                <Button
                  label={t("cancel_plan")}
                  onClick={openConfirmationModal}
                />
              </div>

              <Modal active={isConfirmationModalOpen} close={closeModal}>
                <div className={"cont-confirm "}>
                  <h3 className="text-black dark:text-white">{t("sure")}</h3>
                  <div className="confirm-btns">
                    <Button
                      label={t("cancel")}
                      onClick={closeModal}
                      className="mr-4"
                    />
                    <Button label={t("confirm")} onClick={onApprove} />
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
