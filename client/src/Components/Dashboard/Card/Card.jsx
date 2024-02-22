import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios library
import StylesCard from './Card.module.css';
import TaskList from '../TaskList/TaskList';
import { Url } from '../../../Utils/Url';
import { useDispatch } from 'react-redux';
import { toggleBoardSwitch } from '../../../Redux/slice'

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





    // ?start due date

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

        // Compare serverDueDate with today's date
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

    // end duedate

    var totalChecks = 0;

    const funTotalChecks = (checklist) => {

        checklist.map((taskList, key) => (
            totalChecks++
        ))
        return totalChecks;
    }

    var checksMarked = 0;

    const funTotalChecksMarked = (checklist) => {

        checklist.map((taskList, key) => {
            if (taskList.completed) {
                checksMarked++;
            }
        })
        return checksMarked;
    }






    return (
        <>
            {img(priority)}
            {console.log("collasped========",collasped)}
            <div className={StylesCard.card}>
                <div className={StylesCard.priorityText}>
                    <img src={imgSrc} alt='high' />&nbsp;&nbsp;{priority}
                    <img src='Assets/3dot.svg' alt='3dot' style={{ position: 'absolute', right: '11px' }} />
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

                {((checklist && isVisible )||( collasped===true))&& (
                    <div>
                        <br />
                        {checklist.map((taskList, index) => (
                            <TaskList key={index} taskName={taskList.taskName} completed={taskList.completed} />
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
        </>
    );
};

export default Card;
