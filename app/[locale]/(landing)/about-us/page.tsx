import { useTranslations } from "next-intl";
import Image from "next/image";

const Page = () => {
  const t = useTranslations("AboutUs");
  return (
    <div className="bg-lightest dark:bg-neutral-950 w-full min-h-screen">
      <div className="w-full mx-auto flex flex-col md:grid md:grid-cols-2 justify-center pt-16">
        <div className="min-h-screen bg-white dark:bg-neutral-950">
          <div className="w-full flex flex-col gap-8 pt-8 px-8 md:px-24">
            <h1 className="text-4xl font-medium text-black dark:text-white">
              {t("subtitle_1")}
            </h1>
            <Image
              src="/img/peopleTWorking.png"
              alt="Picture of the author"
              width={200}
              height={200}
              className="md:row-[1/3] md:col-[2/3] max-w-xs md:max-w-none m-auto"
            />
            <p className="text-justify dark:text-slate-400">
              {t("paragraph_1")}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-10 px-8 bg-gray-100 dark:bg-dark_d py-8">
          <h1 className="text-2xl font-medium text-black dark:text-white">
            {t("qsts_mashi_offers")}
          </h1>

          <div className="flex flex-col gap-10">
            {[
              {
                image: "/img/peopleTWorking.png",
                title: t("qst_tf"),
                description: t("qst_desc_tf"),
              },
              {
                image: "/img/peopleTWorking.png",
                title: t("qst_mc"),
                description: t("qst_desc_mc"),
              },
              {
                image: "/img/peopleTWorking.png",
                title: t("qst_des"),
                description: t("qst_desc_des"),
              },
            ].map((el, index) => (
              <div
                key={index}
                className="w-full flex flex-col gap-4 text-center"
              >
                <p className="text-lg text-primary dark:text-primary_d font-semibold">
                  {el.title}
                </p>
                <Image
                  src={el.image}
                  alt="Picture of the author"
                  width={100}
                  height={100}
                  className="md:row-[1/3] md:col-[2/3] max-w-xs md:max-w-none m-auto rounded-md"
                />
                <p className="md:text-justify">{el.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
