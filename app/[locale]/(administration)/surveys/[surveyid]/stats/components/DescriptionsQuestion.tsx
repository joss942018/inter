import React from "react";

interface DescriptionsQuestionProps {
  questionText: string;
  questionData: { text: string, frequency: number }[];
}

const DescriptionsQuestion: React.FC<DescriptionsQuestionProps> = ({ questionText, questionData }) => {
  console.log('questionData', questionData);
  return (
    <div className="flex w-full bg-white shadow-lg rounded-md p-6">
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4 text-center">{questionText}</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">Respuesta</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">Frecuencia</th>
            </tr>
          </thead>
          <tbody>
            {questionData.map((item, index) => (
              <tr key={index} className="text-left border-t">
                <td className="py-2 px-4">{item.text}</td>
                <td className="py-2 px-4">{item.frequency.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          {/* Aquí puedes agregar el contenido adicional que desees */}
          <p>Contenido adicional</p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionsQuestion;
