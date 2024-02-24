import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StylePublic from './Public.module.css';
import PublicTaskList from '../../Components/Public/PublicTaskList/PublicTaskList';
import { Url } from '../../Utils/Url';
import logoimg from '../../Assets/logo.svg';
import highPriorityImg from '../../Assets/high.svg';
import moderatePriorityImg from '../../Assets/moderate.svg';
import lowPriorityImg from '../../Assets/low.svg';
import NotFound from '../../Components/Dashboard/NotFound/NotFound';

const Public = ({ taskId }) => {
    const baseUrl = Url();

    const [publicTaskData, setPublicTaskData] = useState(0);
    let imgSrc = null;

    const showPublicTaskData = async (taskId) => {
        try {
            const response = await axios.get(`${baseUrl}/api/publictasks/${taskId}`);
            let tasks = response.data.tasks;
            tasks.map((data) => {
                setPublicTaskData(data);
            })
        } catch (error) {
            console.error('Error fetching public task data:', error);
        }
    };

    useEffect(() => {
        showPublicTaskData(taskId);
    }, [], [taskId]);



    const setImage = (priority) => {
        switch (priority) {
            case 'HIGH PRIORITY':
                imgSrc = highPriorityImg;
                break;
            case 'MODERATE PRIORITY':
                imgSrc = moderatePriorityImg;
                break;
            default:
                imgSrc = lowPriorityImg;
        }
    };

    if (publicTaskData) {
        setImage(publicTaskData.priority);
    }

    const [taskName, setTaskName] = useState('');
    const [check, setCheck] = useState(null);


    var totalChecks = 0;

    const funTotalChecks = () => {
        publicTaskData.checklist &&
            publicTaskData.checklist.map((taskList, key) => (
                totalChecks++
            ));
        return totalChecks;
    };

    var checksMarked = 0;

    const funTotalChecksMarked = () => {
        publicTaskData.checklist &&
            publicTaskData.checklist.map((taskList, key) => {
                if (taskList.completed) {
                    checksMarked++;
                }
            });
        return checksMarked;
    };

    useEffect(() => {
        funTotalChecksMarked();
    }, [], [taskId]);



    const [dueDate, setDueDate] = useState('');
    const [newDueDate, setNewDueDate] = useState('');
    const [dueDatePassed, setDueDatePassed] = useState(null);

    useEffect(() => {
        const today = new Date();
        const formatted = getFormattedDate(today);
        setDueDate(formatted);

        const serverDate = null;
        publicTaskData.checklist && publicTaskData.checklist.map((check) => (
            serverDate==null?null:check.dueDate
            ))

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
    }, []);

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


    return (
        <>
            {console.log(publicTaskData)}
            {(publicTaskData) ? (
                <div className={StylePublic.public}>
                    <div className={StylePublic.logo}>
                        <img src={logoimg} alt='logo' style={{ width: '51px' }} />&nbsp;&nbsp;&nbsp;Pro Manage
                    </div>
                    <br />
                    <div className={StylePublic.cards}>
                        <div className={StylePublic.priorityText}>
                            <img src={imgSrc} alt='priority' />&nbsp;&nbsp;{publicTaskData.priority}
                        </div>
                        <br />
                        <div className={StylePublic.cardTitle}>
                            {publicTaskData.title}
                        </div>
                        <br /><br />
                        <div className={StylePublic.checklist}>
                            Checklist ({
                                funTotalChecksMarked()
                            }/{
                                funTotalChecks()
                            })
                        </div>
                        <br />
                        <div className={StylePublic.taskList}>
                            {
                                publicTaskData.checklist &&
                                publicTaskData.checklist.map((check) => (
                                    <PublicTaskList  checked={check.completed} taskName={check.taskName} />
                                ))}
                            {console.log(publicTaskData.checklist)}
                        </div>
                        <br />
                        {publicTaskData.checklist.map((check) => (publicTaskData.dueDate !== null && <><span className={StylePublic.dueDateTitle}>Due Date</span> &nbsp;&nbsp;&nbsp;<span className={StylePublic.dueDate}>{newDueDate}</span></>))}
                    </div>
                </div>

            ) : (
                <NotFound />
            )
            }
        </>
    );
}

export default Public;
