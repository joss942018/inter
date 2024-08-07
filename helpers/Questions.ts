export enum EnumErrorType {
  zero_questions = "zero_questions",
  some_questions_dont_have_text = "some_questions_dont_have_text",
}

export const validateAllQuestions = (questions: string[]) => {
  let tempValidacion: IAllQuestionsValidation = {
    validado: true,
    errorType: null,
  };
  if (questions.length === 0) {
    tempValidacion = {
      validado: false,
      errorType: EnumErrorType.zero_questions,
    };
    return tempValidacion;
  }
  questions.forEach((el) => {
    if (el.trim().length === 0) {
      tempValidacion = {
        validado: false,
        errorType: EnumErrorType.some_questions_dont_have_text,
      };
      return tempValidacion;
    }
  });
  return tempValidacion;
};

export interface IAllQuestionsValidation {
  validado: boolean;
  errorType: EnumErrorType | null;
}
