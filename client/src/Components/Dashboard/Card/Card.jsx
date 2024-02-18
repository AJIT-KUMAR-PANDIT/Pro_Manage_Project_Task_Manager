import React, { useState } from 'react';
import StylesCard from './Card.module.css';

const Card = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState);
    };

    return (
        <div className={StylesCard.card}>
            <div className={StylesCard.priorityText}>
                <img src='Assets/high.svg' alt='high' />&nbsp;&nbsp;HIGH PRIORITY
                <img src='Assets/3dot.svg' alt='3dot' style={{ position: 'absolute', right: '11px' }} />
            </div>
            <br />
            <div className={StylesCard.cardTitle}>Hero section</div>
            <div className={StylesCard.checklist}>
                Checklist (0/3)
                <button onClick={toggleVisibility} className={`${isVisible ? StylesCard.hideBut : StylesCard.showBut}`} style={{width: '21px', height: '21px', position: 'relative', right: '0px'}}>
                </button>
            </div>
            {isVisible ? (
                <div>Content to show/hide goes here</div>
            ):(<></>)}
        </div>
    );
};

export default Card;
