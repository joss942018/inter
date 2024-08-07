// components/SurveyStats.js
import React from 'react';

const SurveyStats = ({ question, responses }) => {
    return (
        <div className="survey-stats-container">
            <h2 className="survey-question">{question}</h2>
            <ul className="survey-responses">
                {responses.map((response, index) => (
                    <li key={index} className="survey-response">
                        <div className="response-text">{response.text}</div>
                        <div className="response-frequency">{response.frequency}%</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SurveyStats;
