import TypesLanguages from "@/types/TypesLanguages";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LogoSwitcher from "../components/LogoSwitcher";
import MyLink from "@/app/components/MyLink";
import MyIcon, { TypeFi } from "@/app/components/MyIcon";

interface IInfoCard {
  title: string;
  text: string;
  ico?: TypeFi;
}

interface Props {
  params: {
    locale: TypesLanguages;
  };
}

const FeatIcons: TypeFi[] = [
  "FiMessageCircle",
  "FiTrendingUp",
  "FiCrosshair",
  "FiBarChart2",
  "FiMic",
  "FiMapPin",
];

export default function Home({ params }: Props) {
  const t = useTranslations("Landing");
  const section3 = t.raw("Section3");
  const section4 = t.raw("Section4.Benefits");
  const features = (Object.keys(section3).map((el, i) => ({
    ...section3[el],
    ico: FeatIcons[i],
  })) ?? []) as IInfoCard[];
  const benefits = (Object.keys(section4).map((el) => section4[el]) ??
    []) as IInfoCard[];

  return (
    <div className="relative flex flex-col">
      {/* first section */}
      <div className="w-full border-b bg-white py-14 dark:border-b-dark_d dark:bg-neutral-950">
        <div className="m-auto grid max-w-7xl grid-cols-1 items-center justify-center gap-xl px-10 md:grid-cols-2">
          <div className="flex flex-col gap-m">
            <LogoSwitcher
              darkImageSrc="/img/logoEliaDark.svg"
              lightImageSrc="/img/logoEliaLight.svg"
            />
            <h2 className="text-heading3">{t("Section1.title")}</h2>
            <p className="text-dark dark:text-lightest_d">
              {t("Section1.slogan")}
            </p>
            <MyLink href={`/signup`} hierarchy={1} size="medium">
              {t("Section1.sign_up")}
            </MyLink>
          </div>
          <div className="justify-cente flex items-center rounded-my-8 bg-white px-4 py-16">
            <Image
              alt="People"
              src={"/img/landing/vector-section-1.svg"}
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>

      {/* second section */}
      <div className="flex w-full flex-col items-center bg-primary-100 dark:bg-transparent">
        <div className="w-full max-w-5xl px-my-32 text-center md:text-left">
          <div className="flex flex-col items-center gap-my-32 py-my-96 md:grid md:grid-cols-[320px_1fr]">
            <MediaMockup>
              <Image
                src={"/img/landing/vector-section-2.svg"}
                width={320}
                height={320}
                alt="Image 2"
                className="p-my-32"
              />
            </MediaMockup>
            <div className="flex h-max flex-col gap-my-24">
              {t("Section2.text_1")
                .slice(0, -1)
                .split(".")
                .map((el) => el.trim())
                .map((el, i) => (
                  <p key={i} className={`${i > 0 ? "text-h6" : "text-h4"}`}>
                    {el}.
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-my-32 pb-my-96 md:grid md:grid-cols-[320px_1fr]">
            <MediaMockup>
              <Image
                src={"/img/landing/vector-section-3.svg"}
                width={320}
                height={320}
                alt="Image 2"
                className="p-my-32"
              />
            </MediaMockup>
            <div className="flex h-max flex-col gap-my-24">
              {t("Section2.text_2")
                .slice(0, -1)
                .split(".")
                .map((el) => el.trim())
                .map((el, i) => (
                  <p key={i} className={`${i > 0 ? "text-h6 " : "text-h4"}`}>
                    {el}.
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* third section */}
      <div className="flex w-full flex-col items-center bg-white dark:bg-neutral-900">
        <div className="flex w-full max-w-5xl flex-row flex-wrap justify-center gap-my-64 px-my-32 py-my-64">
          {features.map((el) => (
            <div key={el.title} className="flex w-my-256 flex-col gap-my-24">
              {el.ico && (
                <div className="w-max rounded-my-12 bg-primary-200 p-my-16 text-primary-600 dark:bg-primary-500 dark:text-primary-200">
                  <MyIcon icon={el.ico} size={48} />
                </div>
              )}
              <h4 className="text-h4">{el.title}</h4>
              <p className="secondary-text">{el.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* fourth section */}
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full max-w-4xl flex-col gap-my-32 px-my-64 py-my-64">
          <h4 className="text-h4">{t("Section4.why_use_elia_question")}</h4>
          <div className="flex flex-col gap-my-32">
            {benefits.map((el) => (
              <div key={el.title} className="flex items-center gap-my-16">
                <div className="rounded-full bg-primary-200 p-my-12 text-primary-600 dark:bg-primary-500 dark:text-primary-200">
                  <MyIcon icon="FiCheck" size={32} />
                </div>
                <div className="flex flex-col gap-my-8">
                  <h5 className="text-h5">{el.title}</h5>
                  <p className="secondary-text">{el.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* fifth section */}
      {/* <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col px-my-64 py-my-64 gap-my-32 items-center">
          <MediaMockup>video</MediaMockup>
        </div>
      </div> */}

      {/* sixth section */}
      {/* <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col px-my-64 py-my-64 gap-my-32">
          <h4 className="text-h4">{t("Section6.testimony")}</h4>
        </div>
      </div> */}

      {/* seventh section */}
      <div className="flex w-full items-center justify-center bg-primary-600 px-my-32">
        <div className="flex w-full max-w-xs flex-col items-center gap-my-32 py-my-64 text-center md:max-w-md">
          <div className="flex flex-col gap-my-16">
            <h4 className="text-h4 !text-white">{t("Section7.text_1")}</h4>
            <p className="text-h6 !text-primary-100">{t("Section7.text_2")}</p>
          </div>
          <MyLink
            href={`/signup`}
            hierarchy={2}
            size="medium"
            className="!bg-white !text-primary-700"
          >
            {t("Section7.signup")}
          </MyLink>
        </div>
      </div>
    </div>
  );
}

const MediaMockup = ({
  size = 320,
  children,
}: {
  size?: number;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="flex items-center justify-center rounded-my-8 bg-white"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div className="uppercase">{children}</div>
    </div>
  );
};
