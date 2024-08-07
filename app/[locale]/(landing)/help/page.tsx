import Questions from "./components/Questions";
import questionBank from "../../../../public/data/dataQuestions.json";
import { useTranslations } from "next-intl";
import MyIcon, { TypeFi } from "@/app/components/MyIcon";

interface IInfoCard {
  title: string;
  text: string;
  ico?: TypeFi;
}

interface Props {
  params: { locale: string };
}

const Page = ({ params }: Props) => {
  const questionList = questionBank.questionsBank.map((q, i) => {
    if (params.locale == "es") {
      return (
        <Questions
          key={i}
          questionEN=""
          questionES={q.questionES}
          textEN=""
          textES={q.textES}
          image={q.image}
          video={q.video}
        />
      );
    } else if (params.locale == "en") {
      return (
        <Questions
          key={i}
          questionEN={q.questionEN}
          questionES=""
          textEN={q.textEN}
          textES=""
          image={q.image}
          video={q.video}
        />
      );
    }
  });

  const FeatIcons: TypeFi[] = [
    "FiMessageCircle",
    "FiX",
    "FiCheckSquare",
    "FiCalendar",
    "FiFile",
    "FiTag",
    "FiCreditCard",
    "FiMic",
    "FiSmile",
  ];

  const t = useTranslations("Help");
  const qtSection = t.raw("QT_Section");
  const qtypes = (Object.keys(qtSection).map((el, i) => ({
    ...qtSection[el],
    ico: FeatIcons[i],
  })) ?? []) as IInfoCard[];

  return (
    <div className="bg-white dark:bg-neutral-950 py-24 w-full">
      <div className="flex mx-auto justify-center">
        <div className="w-full flex flex-col items-center gap-xl">
          <div className="max-w-7xl flex flex-col gap-8 px-8 md:px-40">
            <h1 className="text-h3">{t("title")}</h1>
            <div>
              <div className="w-full flex flex-col gap-8">
                <p className="text-h5">{t("text_video")}</p>
                <video controls autoPlay muted className="drop-shadow-md">
                  <source src="/videos/createSurvey.mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-xl bg-primary-100 dark:bg-neutral-900">
            <div className="max-w-7xl flex flex-col gap-l my-xl px-8 md:px-40">
              <h2 className="text-h4">{t("second_st")}</h2>
              <div className="w-full flex flex-col items-center">
                <div className="w-full max-w-7xl flex flex-col">
                  <div className="flex flex-col gap-my-32 text-justify">
                    {qtypes.map((el) => (
                      <div
                        key={el.title}
                        className="flex gap-my-16 items-start"
                      >
                        {el.ico && (
                          <div className="p-my-16 text-primary-600 dark:text-primary-200 bg-primary-200 dark:bg-primary-500 rounded-my-12 w-max">
                            <MyIcon icon={el.ico} size={32} />
                          </div>
                        )}
                        <div className="flex flex-col gap-my-8">
                          <h5 className="text-h5">{el.title}</h5>
                          <p className="secondary-text">{el.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl flex flex-col gap-8 px-8 md:px-40">
            <h2 className="text-h4">{t("third_st")}</h2>
            <div className="w-full">
              <div className="w-full flex flex-col gap-8">{questionList}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
