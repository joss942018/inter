// export const GET_SURVEY_AUTH = graphql(`
//   query SurveyAuth($id: Int!) {
//     surveyById(id: $id) {
//       active
//       languageName
//     }
//   }
// `);

// export const GET_USER_BY_ID = graphql(`
//   query GetSurveyedUserById($surveyedUserByIdId: Int!) {
//     surveyedUserById(id: $surveyedUserByIdId) {
//       id
//       email
//       registered
//     }
//   }
// `);

// export const GET_QUESTIONS_BY_SURVEY = graphql(`
//   query QuestionsList($id: Int!) {
//     surveyById(id: $id) {
//       name
//       anonymous
//       questionsList {
//         id
//         isOptional
//         questionText
//         questionType
//         specifyReason
//         orderOfQuestion
//       }
//       organization {
//         id
//         name
//       }
//     }
//   }
// `);

// export const GET_OPTIONS_BY_QUESTION = graphql(`
//   query OptionsByQuestionId($questionId: Int!) {
//     optionsByQuestionId(questionId: $questionId) {
//       id
//       optionText
//       orderOfOption
//     }
//   }
// `);

// // for answers
// export const VALIDATE_MC_ANSWER = graphql(`
//   mutation DetectMCQAnswer($questionId: Int!, $answerProvided: String) {
//     detectMCQAnswer(questionId: $questionId, answerProvided: $answerProvided) {
//       answerDetected
//     }
//   }
// `);

// export const VALIDATE_TF_ANSWER = graphql(`
//   mutation DetectTFAnswer(
//     $questionId: Int!
//     $answerProvided: String
//     $reason: String
//   ) {
//     detectTFAnswer(
//       questionId: $questionId
//       answerProvided: $answerProvided
//       reason: $reason
//     ) {
//       answerDetected
//     }
//   }
// `);

// export const CREATE_CREDENTIAL_ANSWER = graphql(`
//   mutation CreateCredentialAnswer(
//     $answerProvided: String!
//     $answeredSurveyId: Int!
//     $questionId: Int!
//     $timestamp: DateTime!
//   ) {
//     createCredentialAnswer(
//       answerProvided: $answerProvided
//       answeredSurveyId: $answeredSurveyId
//       questionId: $questionId
//       timestamp: $timestamp
//     ) {
//       credentialAnswer {
//         id
//       }
//     }
//   }
// `);

// export const CREATE_DATE_ANSWER = graphql(`
//   mutation CreateDateAnswer(
//     $answerProvided: Date!
//     $answeredSurveyId: Int!
//     $questionId: Int!
//     $timestamp: DateTime!
//   ) {
//     createDateAnswer(
//       answerProvided: $answerProvided
//       answeredSurveyId: $answeredSurveyId
//       questionId: $questionId
//       timestamp: $timestamp
//     ) {
//       dateAnswer {
//         id
//       }
//     }
//   }
// `);

// export const CREATE_DESC_ANSWER = graphql(`
//   mutation CreateDescriptiveAnswerNLP(
//     $answer: String!
//     $answeredSurveyId: Int!
//     $questionId: Int!
//     $noiseLevel: String
//   ) {
//     createDescriptiveAnswerNLP(
//       answer: $answer
//       answeredSurveyId: $answeredSurveyId
//       questionId: $questionId
//       noiseLevel: $noiseLevel
//     ) {
//       descriptiveAnswerNlp {
//         answeredAt
//       }
//     }
//   }
// `);

// export const CREATE_MC_ANSWER = graphql(`
//   mutation CreateMultipleChoiceAnswer(
//     $answeredSurveyId: Int!
//     $questionId: Int!
//     $optionTexts: [String]!
//     $noiseLevel: String
//   ) {
//     createMultipleChoiceAnswer(
//       answeredSurveyId: $answeredSurveyId
//       optionTexts: $optionTexts
//       questionId: $questionId
//       noiseLevel: $noiseLevel
//     ) {
//       multipleChoiceAnswer {
//         answeredAt
//       }
//     }
//   }
// `);

// export const CREATE_RATING_ANSWER = graphql(`
//   mutation CreateRatingAnswer(
//     $answerProvided: Int!
//     $answeredSurveyId: Int!
//     $questionId: Int!
//     $timestamp: DateTime!
//   ) {
//     createRatingAnswer(
//       answerProvided: $answerProvided
//       answeredSurveyId: $answeredSurveyId
//       questionId: $questionId
//       timestamp: $timestamp
//     ) {
//       ratingAnswer {
//         id
//       }
//     }
//   }
// `);

// //SMILE ANSWER
// export const CREATE_SMILE_ANSWER = graphql(`
//   mutation CreateSmileAnswer(
//     $answerProvided: String!
//     $answeredSurveyId: Int!
//     $questionId: Int!
//     $timestamp: DateTime!
//   ) {
//     createSmileAnswer(
//       answerProvided: $answerProvided
//       answeredSurveyId: $answeredSurveyId
//       questionId: $questionId
//       timestamp: $timestamp
//     ) {
//       smileAnswer {
//         answer
//       }
//     }
//   }
// `);

// export const CREATE_TF_ANSWER = graphql(`
//   mutation CreateTFAnswer(
//     $answeredSurveyId: Int!
//     $questionId: Int!
//     $reason: String
//     $answer: Boolean
//     $noiseLevel: String
//     $noiseLevelForReason: String
//     $timestamp: DateTime!
//   ) {
//     createTFAnswer(
//       answeredSurveyId: $answeredSurveyId
//       questionId: $questionId
//       reason: $reason
//       answer: $answer
//       noiseLevel: $noiseLevel
//       noiseLevelForReason: $noiseLevelForReason
//       timestamp: $timestamp
//     ) {
//       tfAnswer {
//         answer
//       }
//     }
//   }
// `);

// export const CREATE_ONLY_VOICE_ANSWER = graphql(`
//   mutation CreateDescriptiveAnswerNLP(
//     $answer: String!
//     $answeredSurveyId: Int!
//     $questionId: Int!
//     $noiseLevel: String
//   ) {
//     createDescriptiveAnswerNLP(
//       answer: $answer
//       answeredSurveyId: $answeredSurveyId
//       questionId: $questionId
//       noiseLevel: $noiseLevel
//     ) {
//       descriptiveAnswerNlp {
//         answeredAt
//       }
//     }
//   }
// `);
// // END answers creation

// export const CREATE_ANSWERED_SURVEY = graphql(`
//   mutation CreateOrUpdateAnsweredSurvey(
//     $ipAddress: String!
//     $os: String!
//     $surveyId: Int!
//     $accuracy: Float
//     $answeredAt: DateTime
//     $finishedSurvey: Boolean
//     $answeredSurveyId: Int
//     $latitude: Float
//     $longitude: Float
//     $surveyedUser: Int
//   ) {
//     createOrUpdateAnsweredSurvey(
//       ipAddress: $ipAddress
//       os: $os
//       surveyId: $surveyId
//       accuracy: $accuracy
//       answeredAt: $answeredAt
//       finishedSurvey: $finishedSurvey
//       id: $answeredSurveyId
//       latitude: $latitude
//       longitude: $longitude
//       surveyedUser: $surveyedUser
//     ) {
//       answeredSurvey {
//         id
//         surveyedUser {
//           id
//         }
//       }
//     }
//   }
// `);

// export const UPDATED_STATUS_FINISHED = graphql(`
//   mutation UpdateFinishedStatus(
//     $updateFinishedStatusId: Int!
//     $finishedSurvey: Boolean!
//   ) {
//     updateFinishedStatus(
//       id: $updateFinishedStatusId
//       finishedSurvey: $finishedSurvey
//     ) {
//       answeredSurvey {
//         id
//       }
//     }
//   }
// `);

// export const UPDATE_ATTEMPTED_SURVEY = graphql(`
//   mutation UpdateAttemptedSurveyCount($surveyId: ID!, $surveyUserId: ID!) {
//     updateAttemptedSurveyCount(id: $surveyId, surveyUserId: $surveyUserId) {
//       survey {
//         id
//       }
//     }
//   }
// `);

// export const UPDATE_COMPLETED_SURVEY = graphql(`
//   mutation UpdateCompletedSurveyCount($id: ID!, $surveyUserId: ID!) {
//     updateCompletedSurveyCount(id: $id, surveyUserId: $surveyUserId) {
//       survey {
//         id
//       }
//     }
//   }
// `);

// export const UPDATE_SATISFACTION_INDEX = graphql(`
//   mutation UpdateSatisfactionIndex(
//     $updateSatisfactionIndexId: Int!
//     $satisfactionIndex: Float!
//   ) {
//     updateSatisfactionIndex(
//       id: $updateSatisfactionIndexId
//       satisfactionIndex: $satisfactionIndex
//     ) {
//       answeredSurvey {
//         id
//       }
//     }
//   }
// `);

// export const UPDATE_PRESSED_START_BUTTON = graphql(`
//   mutation UpdatePressedStartButton(
//     $answeredSurveyId: Int!
//     $pressedStartButton: Boolean!
//   ) {
//     updatePressedStartButton(
//       id: $answeredSurveyId
//       pressedStartButton: $pressedStartButton
//     ) {
//       answeredSurvey {
//         id
//       }
//     }
//   }
// `);
