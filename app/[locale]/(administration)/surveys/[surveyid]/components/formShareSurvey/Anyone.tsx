import MyIcon from "@/app/components/MyIcon";
import useLogo from "@/app/hooks/useLogo";
import getEnv from "@/helpers/Env";
import { Link } from "@/internationalization/navigation";
import { Button, Card } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useContext, useId } from "react";
import { QRCode } from "react-qrcode-logo";
import { toast } from "react-toastify";
import SurveyContext from "../../context/SurveyContext";

interface Props {
  surveyIDProp?: number;
}

const Anyone = ({ surveyIDProp }: Props) => {
  const surveyContext = useContext(SurveyContext);
  const surveyId = surveyContext.survey?.id || surveyIDProp;

  const t = useTranslations("Surveys");
  const qrCodeId = useId();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${getEnv("NEXT_PUBLIC_FRONTEND_URL")}/survey/${surveyId}`,
    );
    toast(t("copied_to_clipboard"), {
      type: "success",
    });
  };

  const downloadQr = () => {
    const canvas = document.getElementById(qrCodeId) as HTMLCanvasElement;
    const pngUrl = canvas

      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    toast(t("downloading_qr_code"), {
      type: "success",
    });
  };

  return (
    <Card className="flex w-full flex-col items-center gap-4 bg-neutral-50 dark:bg-neutral-950 lg:w-72">
      <div>
        <Link
          target="_blank"
          href={`${getEnv("NEXT_PUBLIC_FRONTEND_URL")}/survey/${surveyId}`}
        >
          <Button
            variant="subtle"
            leftSection={<MyIcon icon="FiLink" />}
            className="w-full"
            justify="start"
            color="gray"
          >
            {t("go_to_survey")}
          </Button>
        </Link>
        <Button
          variant="subtle"
          onClick={copyToClipboard}
          leftSection={<MyIcon icon="FiCopy" />}
          className="w-full"
          justify="start"
          color="gray"
        >
          {t("copy_to_clipboard")}
        </Button>
        <Button
          variant="subtle"
          onClick={downloadQr}
          leftSection={<MyIcon icon="FiDownload" />}
          className="w-full"
          justify="start"
          color="gray"
        >
          {t("download_qr_code")}
        </Button>
      </div>

      <div className="overflow-hidden rounded-my-16">
        <QRCode
          value={`${getEnv("NEXT_PUBLIC_FRONTEND_URL")}/survey/${surveyId}`}
          // logoImage={imageUrl}
          removeQrCodeBehindLogo
          logoPadding={5}
          logoPaddingStyle="circle"
          qrStyle="dots"
          eyeRadius={10}
          size={230}
          ecLevel="H"
          enableCORS
          id={qrCodeId}
        />
      </div>
      <p className="secondary-text text-wrap text-center">
        {t("scan_this_qr_to_go_to_survey")}
      </p>
    </Card>
  );
};

export default Anyone;
