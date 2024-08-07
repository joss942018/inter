// const [aiGeneratedQuestions, setAiGeneratedQuestions] = useState(
//     initialAiGeneratedQuestions,
//   );

//   const getAiGeneratedQuestion = useCallback(() => {
//     const tempAiQuestions = [...aiGeneratedQuestions.questions];
//     const currentQuestion0 = questions[currentQuestionIndex];
//     if (tempAiQuestions.find((el) => el.id === currentQuestion0.id)) return;
//     const body = {
//       question: currentQuestion0.questionText,
//       answer: String(
//         storedAnswers.find(
//           (el) => el.questionId === questions[currentQuestionIndex - 1].id,
//         )?.answer ?? "",
//       ),
//     };

//     const formData = new FormData();
//     formData.append("answer", body.answer);
//     formData.append("question", body.question);
//     setAiGeneratedQuestions((aGQ) => ({ ...aGQ, loading: true }));
//     console.log("AI GENERATED QUESTION", body);
//     axios
//       .post(
//         `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/chatbot/talk_with_agent/`,
//         formData,
//       )
//       .then((data) => {
//         tempAiQuestions.push({
//           id: questions[currentQuestionIndex].id,
//           text: String(data?.data?.question ?? currentQuestion0.questionText),
//         });
//         setAiGeneratedQuestions((aGQ) => ({
//           ...aGQ,
//           questions: tempAiQuestions,
//         }));
//         console.log(data);
//       })
//       .catch((err) => {
//         tempAiQuestions.push({
//           id: questions[currentQuestionIndex].id,
//           text: currentQuestion0.questionText,
//         });
//         setAiGeneratedQuestions((aGQ) => ({
//           ...aGQ,
//           questions: tempAiQuestions,
//         }));
//         console.log(err);
//       })
//       .finally(() =>
//         setAiGeneratedQuestions((aGQ) => ({ ...aGQ, loading: false })),
//       );
//   }, [aiGeneratedQuestions.questions, currentQuestionIndex, questions]);

//   useEffect(() => {
//     return; // ai generated questions disabled
//     // if the current question is the first or the last one, return
//     if (
//       currentQuestionIndex <= 0 ||
//       currentQuestionIndex + 2 > questions.length
//     )
//       return;
//     getAiGeneratedQuestion();
//   }, [currentQuestionIndex]);

//   // AI GENERATED QUESTIONS WITH CONTEXT - END
