import { useTranslations } from "next-intl";
import { useContext, useRef, useState } from "react";
import SurveyFlowContext from "../../context/SurveyFlowContext";
import FileBase from "./base-components/FileBase";
import { isFile } from "../../helpers/validateTypes";
import { IAnswer } from "@/app/[locale]/survey/[code]/helpers/typesQueries";

const File = () => {
  const t = useTranslations("SRSurvey");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const {
    answers: { saveAnswer, uploadFile, answerCurrentQuestion },
    questions: { currentQuestion },
  } = useContext(SurveyFlowContext);

  const handleChange = (files: File | File[] | null) => {
    const file = Array.isArray(files) ? files[0] : files;
    console.log("Estoy aqui");
    setFile(file);

    if (file) {
      /*
      const answer: Omit<IAnswer, "answer_id"> = {
        question_id: currentQuestion?.question_id ?? 0,
        focused_at: new Date().toISOString(),
        open_answer: {
          text: file.name ?? "",
        },
      };*/
      saveAnswer({
        focused_at: new Date().toISOString(),
        question_id: currentQuestion?.question_id ?? 0,
        open_answer: { text: file.name ?? "" },
      });
      console.log("entré alfile")
      //saveAnswer(answer);
      uploadFile(file);
    }
  };

  return (
      <FileBase
          value={answerCurrentQuestion as unknown as string}
          saveAnswer={handleChange}  // Ensure the onChange event is passed correctly
          accept={isFile(currentQuestion?.question_type_data)?.file_types.map(
              (el) => "." + el.file_type,
          )}
      />
  );
};

export default File;
