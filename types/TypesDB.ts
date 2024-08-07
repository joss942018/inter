export type TypeLanguagesDB = "spa" | "eng";
export const LanguagesArray: TypeLanguagesDB[] = ["spa", "eng"];

export type TypeUserRolesDB = "no_role";
export const UserRolesArray: TypeUserRolesDB[] = ["no_role"];

export type TypeUserTypesDB = "WOR";
export const UserTypesArray: TypeUserTypesDB[] = ["WOR"];

export type TypeQuestion =
  | "mc"
  | "open"
  | "rating"
  | "date"
  | "file"
  | "credential"
  | "boolean";
export const QuestionArray: TypeQuestion[] = [
  "mc",
  "open",
  "rating",
  "date",
  "file",
  "credential",
  "boolean",
];

export type TypeOpenQuestion = "audio_text" | "audio" | "text";
export const OpenQuestionArray: TypeOpenQuestion[] = [
  "audio_text",
  "audio",
  "text",
];

export type TypeCredential = "email" | "phone";
export const CredentialArray: TypeCredential[] = ["email", "phone"];

export type TypeRatingQuestion = "num" | "emoji" | "stars";
export const RatingQuestionArray: TypeRatingQuestion[] = [
  "num",
  "emoji",
  "stars",
];
