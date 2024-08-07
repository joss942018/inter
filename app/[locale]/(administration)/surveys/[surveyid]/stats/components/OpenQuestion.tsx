/*
import React from "react";

interface OpenQuestionProps {
  questionSelected: number;
  questionData: string[];
  questionText: string;
}

const OpenQuestion: React.FC<OpenQuestionProps> = ({questionText, questionData }) => {
  console.log(questionData);
  console.log(questionText);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-md p-6 text-center">
      <h2 className="text-xl font-bold mb-4">{questionText}</h2>
      <ul className="list-none p-0 w-full">
        {questionData.map((text, index) => (
          <li key={index} className="text-lg mb-2 text-left">
            {text}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <button className="bg-gray-200 rounded-full px-4 py-2">{questionData.length} Respuestas</button>
      </div>
    </div>
  );
};

export default OpenQuestion;
*/
import React from "react";

interface OpenQuestionProps {
  questionText: string;
  questionSelected: number;
  questionData: any;
}

const OpenQuestion: React.FC<OpenQuestionProps> = ({ questionText, questionSelected, questionData }) => {
  const renderQuestionData = () => {
    console.log(questionData);
    if (typeof questionData === "object" && questionData !== null) {
        var index = 0;
      return Object.keys(questionData).map((key) => (
        <div key={key}>
            
          <strong>{index=index+1}:</strong> {questionData[key]['answer']}
        </div>
      ));
    }
    return <p>{questionData}</p>;
  };

  return (
   
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-md p-6 text-center " style={{ maxWidth: '50rem' }}>
    <h2 className="text-xl font-bold mb-4">{questionText}</h2>
    <div className="max-h-60 overflow-y-auto">
      <ul className="list-none p-0 w-full">
        {renderQuestionData()}
      </ul>
    </div>
    <div className="mt-4">
      <button className="bg-gray-200 rounded-full px-4 py-2">{questionData.length} Respuestas</button>
    </div>
  </div>
  );
};

export default OpenQuestion;
