"use client";

import Loader from "@/app/components/generic/Loader";
import Modal from "@/app/components/generic/Modal";
import Animations from "@/app/styles/animations";
import { useRouter } from "@/internationalization/navigation";
import TypesLanguages from "@/types/TypesLanguages";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import QuestionsFlow from "./components/QuestionsFlow";
import RateUs from "./components/RateUs";
import StartSurvey from "./components/StartSurvey";
import SurveyMessage from "./components/SurveyMessage";
import SurveyFlowContext from "./context/SurveyFlowContext";

interface Props {
  params: {
    code: string;
    locale: TypesLanguages;
  };
  searchParams: {
    preview: boolean;
  };
}

const Page = ({ params }: Props) => {
  const t = useTranslations("SRSurvey");
  const {
    survey: { surveyData, preview, loading, step },
  } = useContext(SurveyFlowContext);

  const [modalConsole, setModalConsole] = useState(false);
  const [modalRateUs, setModalRateUs] = useState(true);

  const router = useRouter();
  // useEffect(() => {
  //   if (!lng) return;
  //   if (params.locale !== lng) {
  //     router.replace(`/survey/${params.code}`, { locale: lng });
  //   }
  // }, [lng]);

  if (loading.isLoadingSurveyData)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );

  if (!surveyData)
    return <SurveyMessage message={String(t("survey_not_available"))} />;

  return (
    <>
      {step === 0 ? (
        <motion.div
          key={0}
          {...Animations.fade}
          className="mx-auto flex h-full w-full max-w-4xl items-center px-10"
        >
          <StartSurvey />
        </motion.div>
      ) :
      step === 1 ? (
        <motion.div key={2} {...Animations.fade} className="h-full w-full">
          <QuestionsFlow />
        </motion.div>
      ) : (
        <>
          <motion.div key={3} {...Animations.fade} className="h-full w-full">
            {preview ? (
              <SurveyMessage message={String(t("preview_finished"))} canClose />
            ) : (
              <SurveyMessage message={String(t("survey_finished"))} canClose />
            )}
          </motion.div>
          {!preview && (
            <Modal
              active={modalRateUs}
              title={t("RateUs.rate_us_exclamation")}
              backgroundClickDisabled
              close={() => setModalRateUs(false)}
            >
              <RateUs cerrar={() => setModalRateUs(false)} />
            </Modal>
          )}
        </>
      )}
      {}
      {}
    </>
  );
};


// : step === 1 ? (
//   <motion.div
//     key={1}
//     transition={transition}
//     variants={variants}
//     initial="hidden"
//     animate="visible"
//     className="w-full h-full flex items-center justify-center"
//   >
//     <SpeakerTest />
//   </motion.div>
// )

/* <Modal
        activo={onDiscover}
        cerrar={finishDiscover}
        title="Sorry to hear that"
      >
        <DiscoverChat />
      </Modal> */

/* <FAB
        icono="ico-terminal-outline"
        position="top-left"
        onClick={() => setModalConsole(true)}
      />
      <Modal activo={modalConsole} cerrar={() => setModalConsole(false)}>
        <LogsContainer />
      </Modal> */

export default Page;
