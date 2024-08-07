import { useRef } from "react";
import Image from "next/image";
import Button from "@/app/components/generic/Button";
import useLogo from "@/app/hooks/useLogo";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

interface Props {
  orgId: number | undefined;
}

function LogoOrg({ orgId }: Props) {
  const t = useTranslations("Account");
  const inputRef = useRef<HTMLInputElement>(null);
  const { loading, uploadLogo } = useLogo({
    id: orgId,
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const res = await uploadLogo(file);
      if (res) {
        toast(t("logo_uploaded"), {
          type: "success",
        });
      } else {
        toast(t("logo_upload_error"), {
          type: "error",
        });
      }
    }
  };

  return (
    <div className="decorative-border mx-auto flex w-full flex-col justify-center rounded-xl border bg-white dark:bg-dark_d">
      {/* {!isDefaultImage && (
        <Image
          className="rounded-md m-auto my-3"
          src={imageUrl}
          alt={t("company_logo")}
          width={70}
          height={70}
        />
      )} */}
      <input
        ref={inputRef}
        className="hidden"
        id="input-logo"
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
      />
      <Button
        className="m-auto my-3"
        onClick={() => inputRef.current?.click()}
        label={String(t("select_logo"))}
        icono="ico-cloud-upload-outline"
        loading={loading}
      />
    </div>
  );
}

export default LogoOrg;
