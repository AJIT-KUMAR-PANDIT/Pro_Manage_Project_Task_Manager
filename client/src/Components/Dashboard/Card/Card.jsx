import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios library
import StylesCard from './Card.module.css';
import TaskList from '../TaskList/TaskList';
import { Url } from '../../../Utils/Url';
import { useDispatch } from 'react-redux';
import { toggleBoardSwitch,toggleToastyAction, toggleLoader } from '../../../Redux/slice';
import Modal from 'react-responsive-modal';

const Card = ({ priority, title, checklist, myTaskId, serverFetchedDate, collasped }) => {

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
        dispatch(toggleLoader());
        try {
            const taskId = myTaskId;
            const response = await axios.post(`${baseUrl}/api/updateboard`, { taskId, newBoard });

            setChangeBoard(response.data.task.board);
            dispatch(toggleLoader());
            console.log(response.data.task.board);
        } catch (error) {
            console.error('Error updating board:', error);
            dispatch(toggleLoader());
        }
    };

    useEffect(() => {
        toggleBoard();
        dispatch(toggleBoardSwitch());
    }, [changeBoard]);

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

    const [dueDate, setDueDate] = useState('');
    const [newDueDate, setNewDueDate] = useState('');
    const [dueDatePassed, setDueDatePassed] = useState(null);

    useEffect(() => {
        const today = new Date();
        const formatted = getFormattedDate(today);
        setDueDate(formatted);

        const serverDate = serverFetchedDate;
        if (!serverDate) {
            return;
        }

        const dateParts = serverDate.split('T')[0].split('-');
        const serverDueDate = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`);

        setNewDueDate(getFormattedDate(serverDueDate));

        if (serverDueDate < today) {
            setDueDatePassed(true);
        } else {
            setDueDatePassed(false);
        }
    }, [serverFetchedDate]);

    function getFormattedDate(date) {
        const day = date.getDate();
        const month = getFormattedMonth(date.getMonth());
        const suffix = getDaySuffix(day);

        return `${month} ${day}${suffix}`;
    }

    function getFormattedMonth(month) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[month];
    }

    function getDaySuffix(day) {
        if (day === 1 || day === 21 || day === 31) {
            return "st";
        } else if (day === 2 || day === 22) {
            return "nd";
        } else if (day === 3 || day === 23) {
            return "rd";
        } else {
            return "th";
        }
    }

    var totalChecks = 0;

    const funTotalChecks = (checklist) => {
        checklist.map((taskList, key) => (
            totalChecks++
        ));
        return totalChecks;
    };

    var checksMarked = 0;

    const funTotalChecksMarked = (checklist) => {
        checklist.map((taskList, key) => {
            if (taskList.completed) {
                checksMarked++;
            }
        });
        return checksMarked;
    };

    useEffect(() => {
        funTotalChecksMarked(checklist);
    }, [], [myTaskId, checklist]);

    const [showOverlay, setShowOverlay] = useState(false);

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };


    const deleteTask = async (taskId) => {
        dispatch(toggleLoader());
        try {
            const response = await axios.delete(`${baseUrl}/api/deletetask/${taskId}`);
            
            window.location.reload();
            dispatch(toggleLoader());
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Error deleting task');
            dispatch(toggleLoader());
        }
    };

    const [shareableLink, setShareableLink] = useState('');
    const [copied, setCopied] = useState(false);

    const generateShareableLink = async (taskId) => {
        dispatch(toggleLoader());
        try {
            const response = await axios.get(`${baseUrl}/api/sharelink/${taskId}`);
            setShareableLink(response.data.shareableLink);
            
            navigator.clipboard.writeText(response.data.shareableLink);
            dispatch(toggleLoader());
            setCopied(true);

            dispatch(toggleToastyAction());


            setTimeout(() => {
                setCopied(false);
                dispatch(toggleToastyAction());
            }, 1000); 
        } catch (error) {
            console.error('Error generating shareable link:', error);
            dispatch(toggleLoader());
        }
    };


    
    return (
        <>
            {img(priority)}
            {console.log("collasped========", collasped)}
            <div className={StylesCard.card}>
                <div className={StylesCard.priorityText} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div><img src={imgSrc} alt='high' />&nbsp;&nbsp;{priority}</div>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <span>
                            <img src='Assets/3dot.svg' alt='3dot' style={{ position: 'absolute', right: '11px', paddingTop: '11px', paddingBottom: '15px', paddingLeft: '15px', paddingRight: '7px' }} onClick={toggleOverlay} />
                        </span>
                        {showOverlay && (
                            <div className={StylesCard.dropDown} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                                <div className={StylesCard.dropDownBut}>Edit</div>
                                <div className={StylesCard.dropDownBut} onClick={() => generateShareableLink(myTaskId)}>Share</div>
                                <div className={StylesCard.dropDownButDel} onClick={() => deleteTask(myTaskId)}>Delete</div>
                            </div>
                        )}
                    </div>
                </div>
                <br />
                <div className={StylesCard.cardTitle}>{title}</div>
                <div className={StylesCard.checklist}>
                    Checklist ({
                        funTotalChecksMarked(checklist)
                    }/{
                        funTotalChecks(checklist)
                    })
                    <button onClick={toggleVisibility} className={`${isVisible ? StylesCard.hideBut : StylesCard.showBut}`} style={{ width: '21px', height: '21px', position: 'relative', left: '170px' }}>
                    </button>
                </div>

                {((checklist && isVisible) || (collasped === true)) && (
                    <div>
                        <br />
                        {checklist.map((taskList, index) => (
                            <TaskList key={index} taskName={taskList.taskName} completed={taskList.completed} taskListId={myTaskId} checkListId={taskList._id} />
                        ))}
                    </div>
                )}

                <br />
                <div className={StylesCard.cardFooter} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '1px' }}>
                    {
                        dueDatePassed ?
                            <div className={dueDatePassed && changeBoard !== "done" ? StylesCard.butFooterDatePassed : changeBoard === "done" ? StylesCard.butFooterDateGreen : StylesCard.butFooterDate}>{newDueDate}</div>
                            : null
                    }

                    <div className={StylesCard.cardFooter} style={{ position: 'relative', right: '-21px', display: 'flex', gap: '1px' }}>
                        {handleChange(changeBoard)}
                    </div>
                </div>
            </div>
            {showOverlay && (
                <div className={StylesCard.overlay} onClick={toggleOverlay}></div>
            )}

           
        </>
    );
};

export default Card;

