import React, { useEffect, useState } from "react";
import axios from "axios";
import getEnv from "@/helpers/Env";
import { useSession } from "next-auth/react";
import OpenQuestion from "./OpenQuestion";
import DescriptionsQuestion from "./DescriptionsQuestion";
import TFQuestion from "./TFQuestion";
import RateQuestion from "./RateQuestion";
import MCQuestion from "./MCQuestion";
import DateQuestion from "./DateQuestion";

interface MyCardProps {
  questionSelected: number;
  question: string;
  answers: string[];
  questionType: string;
  questionText: string;
}

const MyCard: React.FC<MyCardProps> = ({ questionSelected, question, answers = [], questionType, questionText }) => {
  const { data: session } = useSession();
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT")}/api/v1/client_response/answer/question_answer_informations/${questionSelected}/?question_id=${questionSelected}&question_type=${questionType}`,
          {
            headers: {
              Authorization: `Token ${session?.user?.token}`,
            },
          }
        );

        if (response.status === 200) {
          setApiResponse(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [questionType, questionSelected, session?.user?.token]);

  const transformData = (data: any) => {
    const ratingCount: { [key: number]: number } = {};

    data.apiResponse.forEach((item: { rating: number }) => {
      if (!ratingCount[item.rating]) {
        ratingCount[item.rating] = 0;
      }
      ratingCount[item.rating]++;
    });

   

    const transformedData: [number, number][] = Object.entries(ratingCount).map(
      ([key, value]) => [parseInt(key), value as number]
    );

    return { questionId: questionSelected, rating: transformedData };
  };

  const transformMcData = (data: any) => {
    if (!data.apiResponse) {
      return {};
    }
  
    const mcStats: { [key: string]: { option: string; count: number } } = {};
  
    data.apiResponse.forEach((item: { mc_question_option: any; option: string }) => {
      const option = item.option;
      if (!mcStats[option]) {
        mcStats[option] = { option, count: 0 };
      }
      mcStats[option].count++;
    });
  
    return mcStats;
  };
  const processData = (data: any) => {
    if (!data || data.length === 0) {
      return [];
    }
  
    const total = data.length;
    const groupedData = data.reduce((acc, item) => {
      const existing = acc.find(i => i.text === item.text);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ text: item.text, count: 1 });
      }
      return acc;
    }, []);
  
    return groupedData.map(item => ({
      text: item.text,
      frequency: (item.count / total) * 100
    }));
  };
  

  const renderComponent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!apiResponse) {
      return <p>No data available.</p>;
    }

    console.log(questionType);
    switch (questionType) {
      case "mc":
        console.log(questionType);
        console.log({apiResponse});
        // return <MultipleChoiceComponent answers={answers} />;
        // return <DescriptionsQuestion questionText={questionText} questionData={apiResponse} />
        const mcData = transformMcData({apiResponse});
        console.log(mcData);
        return <MCQuestion title={questionText} summary={mcData} />;

        break;
      case "open":
        console.log(questionType);
        console.log({apiResponse});
        const processedData = processData(apiResponse);
        return <DescriptionsQuestion questionText={questionText} questionData={processedData} />
         //return <OpenQuestion questionText={questionText} questionSelected={questionSelected} questionData={apiResponse} />;
        break;
      case "rating":
        console.log(questionType);
        console.log({apiResponse});
        const transformedData = transformData({apiResponse});
        return <RateQuestion title={questionText} data={transformedData} />
        
        break;
      case "date":
        console.log(questionType);
        console.log({apiResponse});
        // return <DateComponent />;
        return <DateQuestion title={questionText} id={questionSelected} summary={apiResponse} />
        break;
      case "file":
        console.log(questionType);
        console.log({apiResponse});
        // return <FileComponent />;
        break;
      case "credential":
        console.log(questionType);
        console.log({apiResponse});
        return <OpenQuestion questionText={questionText} questionSelected={questionSelected} questionData={apiResponse} />;
        // return <CredentialComponent />;
        break;
      case "boolean":
        console.log(questionType);
        console.log({apiResponse});
         return <TFQuestion title={questionText} id={questionSelected} summary={apiResponse} />
        break;
      default:
        return null;
    }
  };

  return (
    <div className="pt-8">
      {renderComponent()}
    </div>
  );
};

export default MyCard;
