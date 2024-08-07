// components/SatisfactionCard.js
import React from 'react';

const SatisfactionCard = ({ title, satisfaction, totalResponses, icon }) => {
    return (
        <div className="satisfaction-card-container">
            <h2 className="satisfaction-card-title">
                <span className="satisfaction-card-icon">{icon}</span> {title}
            </h2>
            <div className="satisfaction-card-content">
                <p>Promedio de satisfacción</p>
                <div className="satisfaction-score">
                    <span className="score">{satisfaction}</span> <span className="emoji">😞</span>
                </div>
            </div>
            <div className="satisfaction-card-footer">
                <p>{totalResponses} respuesta(s)</p>
            </div>
        </div>
    );
};

export default SatisfactionCard;
