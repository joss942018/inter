import {
  ICredentialQuestion,
  IDateQuestion,
  IOpenQuestion,
  IRatingQuestion,
  TypeFileQuestionExtended,
  TypeMCQuestionExtended,
  TypeOpenQuestionExtended,
  TypeQuestionTypeData,
} from "./typesQueries";

export const isMC = (data?: TypeQuestionTypeData | null) =>
  data &&
  data instanceof Object &&
  "options" in data &&
  data.options instanceof Array
    ? (data as TypeMCQuestionExtended)
    : null;

export const isDate = (data?: TypeQuestionTypeData | null) =>
  data && data instanceof Object && "range" in data && "include_time" in data
    ? (data as IDateQuestion)
    : null;

export const isCredential = (data?: TypeQuestionTypeData | null) =>
  data && data instanceof Object && "credential_type" in data
    ? (data as ICredentialQuestion)
    : null;

export const isOpen = (data?: TypeQuestionTypeData | null) =>
  data && data instanceof Object && "open" in data
    ? (data as TypeOpenQuestionExtended)
    : null;

export const isRating = (data?: TypeQuestionTypeData | null) =>
  data &&
  data instanceof Object &&
  "rating_question_type" in data &&
  "rating_from" in data &&
  "rating_to" in data
    ? (data as IRatingQuestion)
    : null;

export const isFile = (data?: TypeQuestionTypeData | null) =>
  data && data instanceof Object && "multiple" in data && "file_types" in data
    ? (data as TypeFileQuestionExtended)
    : null;
