import MyButton from "@/app/components/MyButton";
import MyIcon from "@/app/components/MyIcon";
import MySelect from "@/app/components/MySelect";
import Checkbox from "@/app/components/generic/Checkbox";
import Input from "@/app/components/generic/Input";
import Loader from "@/app/components/generic/Loader";
import useForm, { IConfigValidacion } from "@/app/hooks/useForm";
import { IValidacion } from "@/helpers/Validar";
import { useTranslations } from "next-intl";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SurveyContext from "../../context/SurveyContext";
import { IQuestionComparison } from "./MagicButtonCompare";
import { useQuery } from "@tanstack/react-query";

// const GET_MAGIC_BUTTON_RESULTS = graphql(`
//   query GetMagicButtonResults(
//     $surveyId: Int!
//     $ageFrom: Int!
//     $ageTo: Int!
//     $gender: String!
//     $surveyPurpose: String!
//     $languageStyle: String!
//     $includeEmoji: Boolean!
//   ) {
//     magicButton(
//       surveyId: $surveyId
//       ageFrom: $ageFrom
//       ageTo: $ageTo
//       gender: $gender
//       surveyPurpose: $surveyPurpose
//       languageStyle: $languageStyle
//       includeEmoji: $includeEmoji
//     ) {
//       enhancedQuestions
//     }
//   }
// `);

interface IFormData {
  ageFrom: string;
  ageTo: string;
  idGender: number;
  surveyPurpose: string;
  idLanguageStyle: number;
  includeEmoji: boolean;
}

const initialFormData: IFormData = {
  ageFrom: "",
  ageTo: "",
  idGender: 0,
  surveyPurpose: "",
  idLanguageStyle: 0,
  includeEmoji: false,
};

const initialFormValidation: IConfigValidacion = {
  ageFrom: {
    opcional: false,
    validar: "numeros",
  },
  ageTo: {
    opcional: false,
    validar: "numeros",
  },
  idGender: {
    opcional: false,
    validar: "noCero",
  },
  surveyPurpose: {
    opcional: false,
    validar: "general",
  },
  idLanguageStyle: {
    opcional: false,
    validar: "noCero",
  },
  includeEmoji: {
    opcional: true,
    validar: "general",
  },
};

const combos = {
  gender: [
    { idGender: 1, gender: "any" },
    { idGender: 2, gender: "male" },
    { idGender: 3, gender: "female" },
    { idGender: 4, gender: "other" },
  ],
  languageStyle: [
    { idLanguageStyle: 1, languageStyle: "academic" },
    { idLanguageStyle: 2, languageStyle: "business" },
    { idLanguageStyle: 3, languageStyle: "informal" },
    { idLanguageStyle: 4, languageStyle: "formal" },
    { idLanguageStyle: 5, languageStyle: "creative" },
  ],
};

interface IValidation2 {
  ageTo: IValidacion;
}

interface Props {
  setNewQuestions: React.Dispatch<React.SetStateAction<IQuestionComparison[]>>;
  loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

interface Props {
  closeDrawer: () => void;
}

const MagicButtonForm = ({
  setNewQuestions,
  loadingState,
  closeDrawer,
}: Props) => {
  const t = useTranslations("Surveys");
  const tLS = useTranslations("Surveys.MagicButton.LanguageStyle");
  const {
    survey: { id },
    questions: { questions },
  } = useContext(SurveyContext);

  const {
    formData,
    formValidacion,
    formValidado,
    showValidations,
    handleChange,
  } = useForm(initialFormData, initialFormValidation);

  const generate = useCallback(async () => {
    if (questions.length === 0) {
      toast(t("add_some_questions"), {
        type: "error",
      });
      return;
    }
    if (!formValidado) {
      showValidations();
      return;
    }
    loadingState[1](true);
    // const res = await getMagicButtonResults({
    //   variables: {
    //     ageFrom: Number(formData.ageFrom),
    //     ageTo: Number(formData.ageTo),
    //     gender:
    //       combos.gender.find((el) => el.idGender === formData.idGender)
    //         ?.gender ?? "any",
    //     languageStyle:
    //       combos.languageStyle.find(
    //         (el) => el.idLanguageStyle === formData.idLanguageStyle,
    //       )?.languageStyle ?? "formal",
    //     surveyId: id,
    //     surveyPurpose: formData.surveyPurpose,
    //     includeEmoji: formData.includeEmoji,
    //   },
    // });
    // if (res.error || !res.data?.magicButton) {
    //   console.log(res.error);
    //   toast("Error", {
    //     type: "error",
    //   });
    //   loadingState[1](false);
    //   return;
    // }
    // const tempNQ: IQuestionComparison[] = [];
    // for (const el of questions) {
    //   const id = el.id.toString();

    //   if (res.data?.magicButton?.enhancedQuestions[id]) {
    //     tempNQ.push({
    //       id: el.id,
    //       order: el.orderOfQuestion,
    //       original: el.question,
    //       generated: res.data?.magicButton?.enhancedQuestions[id],
    //     });
    //   }
    // }
    // setNewQuestions(tempNQ);
    loadingState[1](false);
    closeDrawer();
  }, [formData, formValidado, id, questions, closeDrawer]);

  useEffect(() => {
    if (Number(formData.ageFrom) > Number(formData.ageTo))
      handleChange("ageTo", formData.ageFrom);
  }, [formData.ageFrom, formData.ageTo, handleChange]);

  return (
    <div className="flex flex-col gap-my-16 p-my-16">
      <div className="grid grid-cols-2 gap-my-16">
        <MySelect
          label={t("age_from")}
          name="ageFrom"
          options={Array.from(Array(101).keys()).map((el) => ({
            label: el.toString(),
            value: el,
          }))}
          onChange={handleChange}
          value={formData.ageFrom}
          validacion={formValidacion.ageFrom}
        />
        <MySelect
          label={t("age_to")}
          name="ageTo"
          options={Array.from(
            { length: 101 - Number(formData.ageFrom) + 1 },
            (_, index) => Number(formData.ageFrom) + index,
          ).map((el) => ({
            label: el.toString(),
            value: el,
          }))}
          onChange={handleChange}
          value={formData.ageTo}
          validacion={formValidacion.ageTo}
        />
      </div>
      <MySelect
        label={t("gender")}
        name="idGender"
        options={combos.gender.map((el) => ({
          label: t(el.gender),
          value: el.idGender,
        }))}
        onChange={handleChange}
        value={formData.idGender}
        validacion={formValidacion.idGender}
      />
      <MySelect
        label={t("language_style")}
        name="idLanguageStyle"
        options={combos.languageStyle.map((el) => ({
          label: tLS(el.languageStyle),
          value: el.idLanguageStyle,
        }))}
        onChange={handleChange}
        value={formData.idLanguageStyle}
        validacion={formValidacion.idLanguageStyle}
      />
      <Input
        label={t("purpose_of_the_survey_question")}
        name="surveyPurpose"
        onChange={handleChange}
        value={formData.surveyPurpose}
        validacion={formValidacion.surveyPurpose}
        textArea
      />
      <Checkbox
        label={t("include_emoji")}
        name="includeEmoji"
        onChange={handleChange}
        value={formData.includeEmoji}
      />
      <MyButton onClick={generate} className="mx-auto">
        {loadingState[0] ? (
          <div className="w-max">
            <Loader />
          </div>
        ) : (
          <div className="ico-color-wand-outline h-my-16 w-my-16 invert" />
        )}

        {t("generate")}
      </MyButton>
    </div>
  );
};

export default MagicButtonForm;
