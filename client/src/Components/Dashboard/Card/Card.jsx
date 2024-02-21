import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios library
import StylesCard from './Card.module.css';
import TaskList from '../TaskList/TaskList';
import { Url } from '../../../Utils/Url';
import { useDispatch } from 'react-redux';
import {toggleBoardSwitch} from '../../../Redux/slice'

const Card = ({ priority, title, checklist, myTaskId }) => {

    const baseUrl = Url();
    const [isVisible, setIsVisible] = useState(false);
    const [changeBoard, setChangeBoard] = useState("toDo");

    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState);
    };
    let imgSrc;

    const dispatch = useDispatch();


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
    };

    const toggleBoard = async (newBoard) => {
        try {
            const taskId = myTaskId; 
            const response = await axios.post(`${baseUrl}/api/updateboard`, { taskId, newBoard });
            
            setChangeBoard(response.data.task.board);
            console.log(response.data.task.board); 
        } catch (error) {
            console.error('Error updating board:', error);
        }
    };

    useEffect(() => {
        toggleBoard();
        dispatch(toggleBoardSwitch());
    },[changeBoard]);

    const handleChange = (changeBoard) => { 
        if (changeBoard === "backlog") {
            return (
                <>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("inProgress")} value='inProgress'>PROGRESS</div>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("toDo")} value='toDo'>TO DO</div>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("done")} value='done'>DONE</div>
                </>
            );
        }
        
        if (changeBoard === "inProgress") {
            return (
                <>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("backlog")} value='backlog'>BACKLOG</div>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("toDo")} value='toDo'>TO DO</div>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("done")} value='done'>DONE</div>
                </>
            );
        }
        
        if (changeBoard === "toDo") {
            return (
                <>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("backlog")} value='backlog'>BACKLOG</div>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("inProgress")} value='inProgress'>PROGRESS</div>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("done")} value='done'>DONE</div>
                </>
            );
        }
        
        if (changeBoard === "done") {
            return (
                <>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("backlog")} value='backlog'>BACKLOG</div>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("inProgress")} value='inProgress'>PROGRESS</div>
                    <div className={StylesCard.butFooter} onClick={() => toggleBoard("toDo")} value='toDo'>TO DO</div>
                </>
            );
        }
        
        return null;
    };
    

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
                    <div className={StylesCard.butFooterDate}>Feb 10</div>
                    <div className={StylesCard.cardFooter} style={{ position: 'relative', right: '-21px', display: 'flex', gap: '1px' }}>
                        {handleChange(changeBoard)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
