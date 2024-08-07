import {
  TypeLanguagesDB,
  TypeOpenQuestion,
  TypeQuestion,
  TypeRatingQuestion,
} from "@/types/TypesDB";

export interface ISurveyData {
  survey: ISurvey;
  theme: ITheme;
  flow: TypeFlowElement[];
}

export interface ISurvey {
  survey_id: number;
  name: string;
  language_id: TypeLanguagesDB;
  logo_url: string;
}

export interface IClientAnswer {
  user_agent: string;
  ip_address: string;
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface ITheme {
  theme_id: number;
  primary_color: string;
  secondary_color: string;
  primary_dark_color: string;
  secondary_dark_color: string;
}

export interface IMCQuestion {
  more_than_one: boolean;
}

export interface IDateQuestion {
  range: boolean;
  include_time: boolean;
}

export interface ICredentialQuestion {
  credential_type: string;
}

export interface IOpenQuestion {
  open_question_type: TypeOpenQuestion;
}

export interface IRatingQuestion {
  rating_question_type: TypeRatingQuestion;
  rating_from: number;
  rating_to: number;
}

export interface IFileQuestion {
  multiple: boolean;
}

export type TypeMCQuestionExtended = IMCQuestion & {
  options: { id: number; option_text: string; order: number }[];
};

export type TypeFileQuestionExtended = IFileQuestion & {
  file_types: { file_type: string }[];
};

export type TypeOpenQuestionExtended = { open: TypeOpenQuestion };

export type TypeQuestionTypeData =
  | TypeMCQuestionExtended
  | IDateQuestion
  | ICredentialQuestion
  | TypeOpenQuestionExtended
  | IRatingQuestion
  | TypeFileQuestionExtended;

export interface IQuestionFlowElement {
  type: "question";
  question_id: number;
  question: string;
  required: boolean;
  question_type: TypeQuestion;
  question_type_data: TypeQuestionTypeData;
}

export interface IMediaFlowElement {
  type: "media_element";
  media_id: number;
  media_url: string;
  question?: string;
}

export type TypeFlowElement = IQuestionFlowElement | IMediaFlowElement;

export interface IAnswer {
  answer_id: number;
  question_id: number;
  focused_at: string;
  mc_answer?: {
    mc_question_option: number;
  }[];
  boolean_answer?: {
    answer: boolean;
  };
  credential_answer?: {
    answer: string;
  };
  date_answer?: {
    date_from: string;
    date_to?: string;
  };
  open_answer?: {
    text: string;
  };
  rating_answer?: {
    rating: number;
  };
}

export type TypeAnswer =
  | string
  | number
  | boolean
  | Date
  | (string | number)[]
  | undefined;
