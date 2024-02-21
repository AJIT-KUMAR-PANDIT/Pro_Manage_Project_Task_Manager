import React, { useEffect, useState } from 'react';
import StylesCard from './Card.module.css';
import TaskList from '../TaskList/TaskList';

const Card = ({ priority, title, checklist }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [changeBoard, setChangeBoard] = useState("TODO")


    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState);
    };
    let imgSrc;
    const img = () => {

        switch (priority) {
            case 'HIGH PRIORITY':
                imgSrc = 'Assets/high.svg';
                break;
            case 'MODERATE PRIORITY':
                imgSrc = 'Assets/moderate.svg';
                break;
            default:
                imgSrc = 'Assets/low.svg';
        }
    }

    const toggelBoard = (e) => {
        setChangeBoard(e);
    }


    const handleChange = () => {
        switch (changeBoard) {
            case 'BACKLOG':
                return (
                    <>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("INPROGRESS")} value='INPROGRESS'>PROGRESS</div>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("TODO")} value='TODO'>TO DO</div>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("DONE")} value='DONE'>DONE</div>
                    </>
                );
            case 'INPROGRESS':
                return (
                    <>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("BACKLOG")} value='BACKLOG'>BACKLOG</div>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("TODO")} value='TODO'>TO DO</div>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("DONE")} value='DONE'>DONE</div>
                    </>
                );
            case 'TODO':
                return (
                    <>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("BACKLOG")} value='BACKLOG'>BACKLOG</div>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("INPROGRESS")} value='INPROGRESS'>PROGRESS</div>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("DONE")} value='DONE'>DONE</div>
                    </>
                );
            case 'DONE':
                return (
                    <>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("BACKLOG")} value='BACKLOG'>BACKLOG</div>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("INPROGRESS")} value='INPROGRESS'>PROGRESS</div>
                        <div className={StylesCard.butFooter} onClick={() => toggelBoard("TODO")} value='TODO'>TO DO</div>
                    </>
                );
        }
    };

    useEffect(() => {
        handleChange();
    }, [], [toggelBoard], [handleChange])

    return (
        <>
            {img(priority)}
            <div className={StylesCard.card}>
                <div className={StylesCard.priorityText}>
                    <img src={imgSrc} alt='high' />&nbsp;&nbsp;{priority}
                    <img src='Assets/3dot.svg' alt='3dot' style={{ position: 'absolute', right: '11px' }} />
                </div>
                <br />
                <div className={StylesCard.cardTitle}>{title}</div>
                <div className={StylesCard.checklist}>
                    Checklist (0/3)
                    <button onClick={toggleVisibility} className={`${isVisible ? StylesCard.hideBut : StylesCard.showBut}`} style={{ width: '21px', height: '21px', position: 'relative', left: '170px' }}>
                    </button>
                </div>


                {checklist && isVisible && (
                    <div>
                        <br />
                        {checklist.map((taskList, index) => (
                            <TaskList key={index} taskName={taskList.taskName} completed={taskList.completed} />
                        ))}
                    </div>
                )}

                <br />
                <div className={StylesCard.cardFooter}>
                    <div className={StylesCard.butFooter}>Feb 10</div>
                    <div className={StylesCard.cardFooter} style={{ position: 'relative', right: '-21px', display: 'flex', gap: '1px' }}>

                        {handleChange()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
