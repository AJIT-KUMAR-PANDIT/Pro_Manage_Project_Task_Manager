import React, { useState } from 'react';
import StylesCard from './Card.module.css';
import TaskList from '../TaskList/TaskList';

const Card = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState);
    };

    return (
        <>
            <div className={StylesCard.card}>
                <div className={StylesCard.priorityText}>
                    <img src='Assets/high.svg' alt='high' />&nbsp;&nbsp;HIGH PRIORITY
                    <img src='Assets/3dot.svg' alt='3dot' style={{ position: 'absolute', right: '11px' }} />
                </div>
                <br />
                <div className={StylesCard.cardTitle}>Hero section</div>
                <div className={StylesCard.checklist}>
                    Checklist (0/3)
                    <button onClick={toggleVisibility} className={`${isVisible ? StylesCard.hideBut : StylesCard.showBut}`} style={{ width: '21px', height: '21px', position: 'relative', left: '170px' }}>
                    </button>
                </div>
                {isVisible ? (
                    <div>
                        <br />
                        <TaskList />
                        <TaskList />
                        <TaskList />
                    </div>
                ) : (<></>)}
                <br />
                <div className={StylesCard.cardFooter}>
                    <div className={StylesCard.butFooter}>Feb 10</div>
                    <div className={StylesCard.cardFooter} style={{ position: 'relative', right: '-21px' , display: 'flex',gap: '11px'}}>
                        <div className={StylesCard.butFooter}>PROGRESS</div>
                        <div className={StylesCard.butFooter}>TO-DO</div>
                        <div className={StylesCard.butFooter}>DONE</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
