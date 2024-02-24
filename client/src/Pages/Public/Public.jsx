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


   





    let theserverDate = null;
useEffect(() => {
    publicTaskData.checklist && publicTaskData.checklist.map((check) => {
        theserverDate = check.dueDate;
});
},[],[theserverDate])

function formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = monthNames[monthIndex];
  
    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    }
  
    return `${month} ${day}${daySuffix}`;
  }
  
  const formattedDate = formatDate(theserverDate);
  
  
    

    return (
        <>
        {console.log("theserverDate",theserverDate)}
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
                                    <PublicTaskList checked={check.completed} taskName={check.taskName} />
                                ))}
                            {console.log(publicTaskData.checklist)}
                        </div>
                        <br />
                        {(publicTaskData.dueDate !== null &&
                            <div className={StylePublic.dueDateDiv}>
                                <span className={StylePublic.dueDateTitle}>Due Date</span> &nbsp;&nbsp;&nbsp;
                                <span className={StylePublic.dueDate}>{formattedDate}</span>
                            </div>
                        )}
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
