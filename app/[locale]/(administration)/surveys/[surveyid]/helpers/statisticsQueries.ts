// export const TF_STATISTICS_SURVEY_ID = graphql(`
//   query TfStatisticsBySurveyId(
//     $surveyId: Int
//     $startDate: String
//     $endDate: String
//   ) {
//     tfStatisticsBySurveyId(
//       id: $surveyId
//       startDate: $startDate
//       endDate: $endDate
//     )
//   }
// `);

// export const RATE_STATISTICS_QUESTION_ID = graphql(`
//   query RatingStatisticsByQuestionId($questionId: Int) {
//     ratingStatisticsByQuestionId(id: $questionId) {
//       ratingStatistics
//     }
//   }
// `);

// export const MC_STATISTICS_SURVEY_ID = graphql(`
//   query GetMcStatisticsBySurveyId(
//     $surveyId: Int
//     $startDate: String
//     $endDate: String
//   ) {
//     mcqStatisticsBySurveyId(
//       id: $surveyId
//       startDate: $startDate
//       endDate: $endDate
//     )
//   }
// `);

// export const DATE_STATISTICS_SURVEY_ID = graphql(`
//   query DateAnswerBySurveyId($surveyId: Int!) {
//     dateAnswerBySurveyId(surveyId: $surveyId) {
//       answer
//       question {
//         id
//       }
//     }
//   }
// `);

// export const CREDENTIAL_STATISTICS_SURVEY_ID = graphql(`
//   query CredentialAnswerBySurveyId($surveyId: Int!) {
//     credentialAnswerBySurveyId(surveyId: $surveyId) {
//       answer
//       question {
//         id
//       }
//     }
//   }
// `);

// //SMILE
// export const SMILE_STATISTICS_SURVEY_ID = graphql(`
//   query SmileAnswersBySurveyId($surveyId: Int!) {
//     smileAnswersBySurveyId(surveyId: $surveyId) {
//       answer
//       question {
//         id
//       }
//     }
//   }
// `);

// //VOICE ONLY
// export const VOICEONLY_STATISTICS_SURVEY_ID = graphql(`
//   query VoiceOnlyAnswerBySurveyId($surveyId: Int!) {
//     voiceOnlyAnswersBySurveyId(surveyId: $surveyId) {
//       id
//       audioFile
//     }
//   }
// `);

// export const VOICEONLY_ANSWER_SURVEY_ID = graphql(`
//   query VoiceOnlyAnswersByAnsSurveyIdQuestionId(
//     $answeredSurveyId: Int!
//     $questionId: Int!
//   ) {
//     voiceOnlyAnswersByAnsSurveyIdQuestionId(
//       answeredSurveyId: $answeredSurveyId
//       questionId: $questionId
//     ) {
//       audioFile
//       id
//       answeredAt
//     }
//   }
// `);

// export const DESC_STATISTICS_QUESTION_ID = graphql(`
//   query TextClusterGmmByQuestionId(
//     $questionId: Int
//     $language: String
//     $startDate: String
//     $endDate: String
//   ) {
//     textClusterGmmByQuestionId(
//       id: $questionId
//       language: $language
//       startDate: $startDate
//       endDate: $endDate
//     ) {
//       cluster
//     }
//   }
// `);
// // export const DESC_STATISTICS_QUESTION_ID = graphql(`
// //   query getDescriptiveStatisticsByQuestionIdV4(
// //     $id: Int
// //     $startDate: String
// //     $endDate: String
// //   ) {
// //     descriptiveStatisticsByQuestionIdV4(
// //       id: $id
// //       startDate: $startDate
// //       endDate: $endDate
// //     )
// //     percentageSummarizationByQuestionId(questionId: $id) {
// //       summarizedContext
// //     }
// //   }
// // `);

// export const GET_ID_TEXT_QUESTIONS = graphql(`
//   query QuestionsListStatistics($surveyId: Int!) {
//     surveyById(id: $surveyId) {
//       questionsList {
//         id
//         questionText
//         questionType
//         orderOfQuestion
//       }a
//     }
//   }
// `);

// export const GET_MAP_POSITION = graphql(`
//   query AnsweredSurveyById($surveyId: Int!) {
//     answeredSurveyBySurveyId(surveyId: $surveyId) {
//       latitude
//       longitude
//     }
//   }
// `);

// export const EMOTION_MCqst = graphql(`
//   query EmotionsMCqst($surveyId: Int!) {
//     answeredSurveyBySurveyId(surveyId: $surveyId) {
//       multiplechoiceanswerSet {
//         emotion
//       }
//     }
//   }
// `);

// export const GET_KPI = graphql(`
//   query KpiAttemptedSurveyCount($surveyId: Int!) {
//     kpiAverageTime(surveyId: $surveyId) {
//       averageTime
//     }
//     kpiSatisfactionIndex(surveyId: $surveyId) {
//       average
//     }
//   }
// `);

// export const GET_SENTIMENT_PLOT_BY_QUESTION_ID = graphql(`
//   query EmotionEntropyQustionId(
//     $questionId: Int
//     $startDate: String
//     $endDate: String
//   ) {
//     emotionEntropyQustionId(
//       id: $questionId
//       startDate: $startDate
//       endDate: $endDate
//     ) {
//       emotionEntropy
//     }
//   }
// `);

// export const GET_LOCATION_WITH_EMOTION = graphql(`
//   query LocationWithEmotion($surveyId: Int!) {
//     locationWithEmotion(surveyId: $surveyId) {
//       emotionWithLocation
//     }
//   }
// `);
